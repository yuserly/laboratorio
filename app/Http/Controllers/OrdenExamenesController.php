<?php

namespace App\Http\Controllers;

use App\Mail\EnvioExamen;
use App\Models\AnalisisExamen;
use App\Models\ExamenesPorOrden;
use App\Models\OrdenExamenes;
use App\Models\Pacientes;
use App\Models\ResultadosExamenes;
use App\Models\Ventas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OrdenExamenesController extends Controller
{

    public function showpendiente(){

        return OrdenExamenes::where([['exec','=',1],['pago','=',1],['estado_id','=',1]])->with('examenorden.examen','paciente')->get();
    }

    public function showpendientepago(){

        return OrdenExamenes::where([['exec','=',1],['pago','=',0],['estado_id','=',1]])->with('examenorden.examen','paciente')->get();
    }

    public function showxeditar(){

        return OrdenExamenes::where([['estado_id','=',1]])->with('examenorden.examen','paciente')->get();
    }

    public function showrealizada(){

        return OrdenExamenes::where([['exec','=',1],['pago','=',1],['estado_id','=',2]])->with('examenorden.examen','paciente','examenorden.resultados.analisis')->get();
    }


    public function traerordenpaciente($rut){

        $user = Auth::user();

        if($user->hasRole('Profesional Box')){

            return [];

        }else if($user->hasRole('Secretaria')){

            $paciente = Pacientes::where('rut',$rut)->first();

            return OrdenExamenes::where([['paciente_id', $paciente->id_paciente], ['estado_id','=',1],['pago','=',0],['exec','=',0]])->with('examenorden.examen')->get();

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
                                                'codigo' => uniqid(),
                                                'user_id' => $user->id,
                                                'paciente_id' => $paciente->id_paciente,
                                                'fecha' => $request->fecha,
                                                'exec' => $exec

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

            $neto = $neto + $request->examen[$i]["precio"];

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

        // creamos la venta

        if($exec == 1){

            $iva = $neto  * 0.19;

            $total = $neto  + $iva;

            Ventas::create([
                'orden_examenes_id' => $orden->id_orden_examenes,
                'neto' => $neto,
                'iva' => $iva,
                'total' => $total
            ]);

        }

        return $orden;

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

    public function marcaranalizada(Request $request){

        $datos = $request->datos;
        $idorden = $datos[0]["id_orden_examenes"];
        // capturamos el usuario logueado
        $user = Auth::user();

        $examen =  OrdenExamenes::where('id_orden_examenes', $idorden)->with('examenorden.examen','paciente','profesional','examenorden.resultados.analisis.valoresreferenciales')->first();


        $pdf = \PDF::loadView('pdfexamen', compact('examen'));

        Mail::to($examen->paciente['email'])->send(new EnvioExamen($examen->paciente['nombres'], $examen->paciente['apellidos'], $pdf));

        return OrdenExamenes::where('id_orden_examenes', $idorden)->update([
            'analizadax' => $user->id,
            'estado_id' => 3
        ]);


    }

    public function marcartomarealizada($idorden){

        return OrdenExamenes::where('id_orden_examenes', $idorden)->update([
            'estado_id' => 2
        ]);
    }

    public function marcarpagada($idorden){

        Ventas::where('orden_examenes_id')->update([
            'estado' => 1
        ]);

        return OrdenExamenes::where('id_orden_examenes', $idorden)->update([
            'pago' => 1
        ]);
    }

    public function mostrarexameneslistos($rut){

        $paciente = Pacientes::where('rut',$rut)->first();

        return OrdenExamenes::where([['paciente_id', $paciente->id_paciente], ['estado_id', 3]])->with('examenorden.examen','paciente')->get();
    }

    public function imprimirexamen($codigo){


      $examen =  OrdenExamenes::where('codigo', $codigo)->with('examenorden.examen','paciente','profesional','examenorden.resultados.analisis.valoresreferenciales')->first();

    //   return $examen;

      $pdf = \PDF::loadView('pdfexamen', compact('examen'));

        return $pdf->stream('archivo.pdf');


    }

    public function enviarexamen($codigo){

        $examen =  OrdenExamenes::where('codigo', $codigo)->with('examenorden.examen','paciente','profesional','examenorden.resultados.analisis.valoresreferenciales')->first();

        $pdf = \PDF::loadView('pdfexamen', compact('examen'));

        Mail::to($examen->paciente['email'])->send(new EnvioExamen($examen->paciente['nombres'], $examen->paciente['apellidos'], $pdf));
    }

}
