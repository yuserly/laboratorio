<?php

namespace App\Http\Controllers;

use App\Mail\EnvioExamen;
use App\Mail\EnvioOrdenExamen;
use App\Models\AnalisisExamen;
use App\Models\ExamenesPorOrden;
use App\Models\OrdenExamenes;
use App\Models\Pacientes;
use App\Models\ResultadosExamenes;
use App\Models\Ventas;
use App\Models\Prevision;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OrdenExamenesController extends Controller
{

    public function showpendiente()
    {

        return OrdenExamenes::where([['exec','=',1],['pago','=',1],['estado_id','=',1]])->with('examenorden.examen','paciente')->get();
    }

    public function showpendientepago()
    {

        $previsiones = Prevision::all();
        $examenes = OrdenExamenes::where([['exec','=',1],['pago','=',0],['estado_id','=',1]])->with('examenorden.examen','paciente')->get();

        return ['previsiones' => $previsiones, 'examenes' => $examenes];
    }

    public function showxeditar() //Modulo Profesional BOX y Secretaria
    {
        $user = Auth::user();

        if($user->hasRole('Profesional Box')){ //Estado 7 es para todo lo emitido por el profesional de box;
            return OrdenExamenes::where([['estado_id','=', null]])->latest()->take(30)->with('examenorden.examen','paciente')->get();
        }else if($user->hasRole('Secretaria')){ //Estado 1 es para todo lo emitido por el profesional de box;
            return OrdenExamenes::where([['estado_id','=',1]])->latest()->take(30)->with('examenorden.examen','paciente')->get();
        }else if($user->hasRole('Profesional Laboratorio')){

        }
    }

    public function showrealizada()
    {
        $user = Auth::user();
        return OrdenExamenes::where([['exec','=',1],['pago','=',1],['estado_id','=',2],['user_laboratorio_id', '=', $user->id]])->with('examenorden.examen','paciente','examenorden.resultados.analisis')->get();
    }

    public function traerordenpaciente($rut){ //Usado en el formulario para crear ordenes, cuando una secretaria ingresa un RUT, este inmediatamente busca las ordenes emitidas por el profesional.

        $user = Auth::user();

        if($user->hasRole('Profesional Box')){

            return [];

        }else if($user->hasRole('Secretaria')){

            $paciente = Pacientes::where('rut',$rut)->first();

            //Null indica que la creo el profesional, y vigencia indica si ya ha pasado un tiempo prudente de validez de esta orden, si ya paso el tiempo de 3 meses, debe ir nuevamente donde el profesional.
            return OrdenExamenes::where([['paciente_id', $paciente->id_paciente], ['estado_id','=', null],['pago','=',0],['exec','=',0],['vigencia', '=', 1]])->with('examenorden.examen')->get();

        }
    }

    public function store(Request $request){

        // capturamos el usuario logueado
        $user = Auth::user();

        if($user->hasRole('Profesional Box')){
            $exec = 0;
        }else if($user->hasRole('Secretaria')){

            $exec = 1;
        }

        // creamos o actualizamos la información del paciente

        $paciente = Pacientes::updateOrCreate(['rut' => $request->rut],[
            'rut' => $request->rut,
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'edad' => $request->edad,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'telefono' => $request->telefono,
            'email' => $request->email
            ]);

        $paciente = Pacientes::where('rut', $request->rut)->first();

        // creamos la orden

        $orden = OrdenExamenes::updateOrCreate(['id_orden_examenes' => $request->id_orden_examenes],[
                                                'codigo'        => uniqid(),
                                                'user_id'       => $user->id,
                                                'paciente_id'   => $paciente->id_paciente,
                                                'fecha'         => $request->fecha,
                                                'exec'          => $exec,
                                                'estado_id'     => ($exec == 0 ) ? null : 1,
                                                ]);

        // si es una edición borramos el contenidos de resultado analisis y examenes por orden antes de insertar
            // consultamos si el examen orden para borrar el analisis

        $examenordenold = ExamenesPorOrden::where('orden_examenes_id', $orden->id_orden_examenes)->get();

        if(isset($examenordenold)){

            foreach ($examenordenold as $key => $value) {
                ResultadosExamenes::where('examenes_por_ordens_id', $value["id_examenes_por_ordens"])->delete();
            }

            $examenordenold = ExamenesPorOrden::where('orden_examenes_id', $orden->id_orden_examenes)->delete();

        }

        $neto = 0;


        for ($i=0; $i < count($request->examen) ; $i++) {

            // insertamos los examenes que tiene la orden.

            $neto = $neto + $request->examen[$i]["precio_par"];

            $examenxorden = ExamenesPorOrden::create([
                                                    'orden_examenes_id' => $orden->id_orden_examenes,
                                                    'examen_id' => $request->examen[$i]["id_examen"]
                                                    ]);


            $analisisexamen = AnalisisExamen::where('examen_id', $request->examen[$i]["id_examen"] )->get();


            foreach ($analisisexamen as $key => $value) {

                ResultadosExamenes::create([
                    'examenes_por_ordens_id' => $examenxorden->id_examenes_por_ordens,
                    'analisis_examens_id' => $value["id_analisis_examens"],
                    'valor' => 0
                ]);

            }

        }

        if($exec == 1){


            Ventas::create([
                'orden_examenes_id' => $orden->id_orden_examenes,
                'totalorden' => $neto,
                'prevision' => null,
            ]);
        }else{

            // enviamos el email con la orden de examen

            if($request->enviar){

                $examen =  OrdenExamenes::where('codigo', $orden->codigo)->with('examenorden.examen.tipoexamen','paciente','emisor')->first();

                $pdf = \PDF::loadView('pdfordenexamen', compact('examen'));

                $pdf->setEncryption(substr(substr($examen->paciente['rut'], 0, -2),-4), "novakimenpdf");

                Mail::to($examen->paciente['email'])->send(new EnvioOrdenExamen($examen->paciente['nombres'], $examen->paciente['apellidos'], $pdf));

            }

        }
        return $orden;
    }

    public function verpdf(){

        $examen =  OrdenExamenes::where('codigo', '6299a681ad969')->with('examenorden.examen.tipoexamen','paciente','emisor')->first();

        $pdf = \PDF::loadView('pdfordenexamen', compact('examen'));

        $pdf->setEncryption(substr(substr($examen->paciente['rut'], 0, -2),-4), "novakimenpdf");

        Mail::to($examen->paciente['email'])->send(new EnvioOrdenExamen($examen->paciente['nombres'], $examen->paciente['apellidos'], $pdf));

        return $pdf->stream('archivo.pdf');

    }

    public function guardarresultado(Request $request){

        $datos = $request->datos;

        for ($i=0; $i < count($datos) ; $i++) {

            foreach ($datos[$i]["analisis"] as $key => $value) {

                ResultadosExamenes::where('analisis_examens_id',$value["analisis_examens_id"])
                ->where('id_resultados_examenes',$value["id_resultados_examenes"])->update([
                    'valor' => $value["valor"]
                ]);
            }
        }
    }

    public function marcaranalizada(Request $request)
    {
        $datos = $request->datos;
        $idorden = $datos[0]["id_orden_examenes"];
        // capturamos el usuario logueado
        $user = Auth::user();

        $examen =  OrdenExamenes::where('id_orden_examenes', $idorden)->with('examenorden.examen','paciente','profesional','examenorden.resultados.analisis.valoresreferenciales')->first();

        $pdf = \PDF::loadView('pdfexamen', compact('examen'));
        $pdf->setEncryption(substr(substr($examen->paciente['rut'], 0, -2),-4), "novakimenpdf");

        Mail::to($examen->paciente['email'])->send(new EnvioExamen($examen->paciente['nombres'], $examen->paciente['apellidos'], $pdf));

        return OrdenExamenes::where('id_orden_examenes', $idorden)->update([
            'analizadax' => $user->id,
            'estado_id' => 3
        ]);
    }

    public function marcartomarealizada($idorden)
    {

        $user = Auth::user();

        return OrdenExamenes::where('id_orden_examenes', $idorden)->update([
            'estado_id' => 2, 'user_ejecutor_id' => $user->id
        ]);
    }

    public function marcarpagada(Request $request)
    {

        Ventas::where('orden_examenes_id', $request->id_orden_examenes)->update([
            'estado' => 1,
            'pago_debito' => $request->debito,
            'pago_efectivo' => $request->efectivo,
            'pago_credito' => $request->credito,
            'neto'  =>  $request->totalpago,
            'iva'   => $request->totalpagoiva-$request->totalpago,
            'total' => $request->totalpagoiva,

            'prevision_id' => $request->prevision['id_prevision']
        ]);

        OrdenExamenes::where('id_orden_examenes', $request->id_orden_examenes)->update([
            'pago' => 1
        ]);

        return "Venta exitosa.";

    }

    public function marcapagadaActualizar(Request $request)
    {
        Ventas::where('id_venta', $request->id_venta)->update([
            'pago_debito' => $request->debito,
            'pago_efectivo' => $request->efectivo,
            'pago_credito' => $request->credito,
            'neto'  =>  $request->totalpago,
            'iva'   => $request->totalpagoiva-$request->totalpago,
            'total' => $request->totalpagoiva,

            'prevision_id' => $request->prevision['id_prevision']
        ]);

        return $request;
    }

    public function historialordenrut($rut)
    {
        $user = Auth::user();

        $paciente = Pacientes::where('rut',$rut)->first();

        if($paciente)
        {
            if($user->hasRole('Profesional Box')){ //Estado 7 es para todo lo emitido por el profesional de box;
                return OrdenExamenes::where([['paciente_id', $paciente->id_paciente], ['exec', 0]])->with('examenorden.examen', 'emisor','paciente')->get();
            }else if($user->hasRole('Secretaria')){ //Estado 1 es para todo lo emitido por el profesional de box;
                return OrdenExamenes::where([['paciente_id', $paciente->id_paciente],['estado_id','=',1], ['exec', 1]])->with('examenorden.examen','paciente', 'emisor')->get();
            }else if($user->hasRole('Profesional Laboratorio')){
                return OrdenExamenes::where([['paciente_id', $paciente->id_paciente],['estado_id','=',3], ['exec', 1]])->with('examenorden.examen','paciente')->get();
            }
            else if($user->hasRole('Administrador')){
                return OrdenExamenes::where([['paciente_id', $paciente->id_paciente]])->with('examenorden.examen','paciente')->get();
            }
        }else{
            return ['valo' => 0];
        }



    }

    public function imprimirexamen($codigo)
    {
        $examen =  OrdenExamenes::where('codigo', $codigo)->with('examenorden.examen','paciente','profesional','examenorden.resultados.analisis.valoresreferenciales')->first();
        $pdf = \PDF::loadView('pdfexamen', compact('examen'));

        return $pdf->stream('archivo.pdf');
    }

    public function enviarexamen($codigo)
    {
        $examen =  OrdenExamenes::where('codigo', $codigo)->with('examenorden.examen','paciente','profesional','examenorden.resultados.analisis.valoresreferenciales')->first();
        $pdf = \PDF::loadView('pdfexamen', compact('examen'));
        Mail::to($examen->paciente['email'])->send(new EnvioExamen($examen->paciente['nombres'], $examen->paciente['apellidos'], $pdf));
    }

    public function getMustrasRealizadas(Request $request)
    {
        $user = Auth::user();
        $examenes = OrdenExamenes::where(['user_ejecutor_id' => $user->id, 'estado_id' => 2])->with('paciente', 'ejecutor', 'examenorden.examen')->get();
        return $examenes;
    }

    public function historialMuestraRut($rut)
    {
        $user = Auth::user();

        $paciente = Pacientes::where('rut',$rut)->first();

        if($paciente)
        {
           $examenes = OrdenExamenes::where([['paciente_id', $paciente->id_paciente], ['exec', 1], ['user_ejecutor_id', $user->id]])->with('examenorden.examen', 'emisor','paciente', 'ejecutor')->get();

           if($examenes)
           {
               return ['valor' => 1, 'examenes' => $examenes];
           }else{
                return ['valor' => 0];
           }
        }else{
            return ['valor' => 0];
        }
    }

    public function obteneranalisissinaceptar()
    {
        return OrdenExamenes::where('estado_id', 2)->where('user_laboratorio_id', null)->with('paciente', 'ejecutor', 'examenorden.examen')->get();
    }

    public function aceptarAnalisis($id)
    {
        $user = Auth::user();
        OrdenExamenes::updateOrCreate(['id_orden_examenes' => $id],['user_laboratorio_id' => $user->id]);
        return;
    }

    public function getAnalisisRealizados()
    {
        $user = Auth::user();
        return OrdenExamenes::where('estado_id', 3)->where('user_laboratorio_id', $user->id)->with('paciente', 'ejecutor', 'examenorden.examen')->take(30)->get();
    }

    public function volverAnalizar($id)
    {
        OrdenExamenes::updateOrCreate(['id_orden_examenes' => $id],['estado_id' => 2]);
        return;
    }

    public function historialAnalisisEmitidas($rut)
    {
        $user = Auth::user();

        $paciente = Pacientes::where('rut',$rut)->first();

        if($paciente)
        {
           $examenes = OrdenExamenes::where([['paciente_id', $paciente->id_paciente], ['exec', 1], ['user_laboratorio_id', $user->id]])->with('paciente', 'ejecutor', 'examenorden.examen')->get();

           if($examenes)
           {
               return ['valor' => 1, 'examenes' => $examenes];
           }else{
                return ['valor' => 0];
           }
        }else{
            return ['valor' => 0];
        }
    }
}
