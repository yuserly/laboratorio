<?php

namespace App\Http\Controllers;

use App\Mail\EnvioReceta;
use App\Models\Pacientes;
use App\Models\Recetas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Barryvdh\DomPDF\Facade\Pdf;

class RecetasController extends Controller
{
    public function store(Request $request)
    {   
        // capturamos el usuario logueado
        $user = Auth::user();

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

        // creamos la receta

        $receta = Recetas::create([
            'codigo' => uniqid(),
            'diagnostico' => $request->diagnostico,
            'receta' => $request->preinscripcion,
            'fecha' => date('Y-m-d'),
            'user_id' => $user->id,
            'paciente_id' => $paciente->id_paciente,
            'permite_impresion' => ($request->enviarSecretaria != null) ? 1 : 0,

        ]);

        return $receta;

    }

    public function show($rut){

        $user = Auth::user();

        if($user->hasRole('Profesional Box')){

            $paciente = Pacientes::where('rut', $rut)->first();
            if(empty($paciente))
            {
                return 0;
            }else{
                $recetas = Recetas::where(['paciente_id' => $paciente->id_paciente], ['user_id' => $user->id])->get();
                if(count($recetas) > 0)
                {   
                    $paciente = Pacientes::where('rut', $rut)->with('receta','receta.profesional', 'receta.paciente')->first();
                    if(count($paciente->receta) > 0)
                    {
                        return ['valor' => 1, 'paciente' => $paciente];
                    }else{
                        return ['valor' => 0];
                    }
                }else{
                    return ['valor' => 0];
                }   
            }

        }else if($user->hasRole('Secretaria')){

            $paciente = Pacientes::where('rut', $rut)->first();
            if(empty($paciente))
            {
                return 0;
            }else{
                $recetas = Recetas::where('paciente_id', $paciente->id_paciente)->get();
                if(count($recetas) > 0)
                {   
                    $paciente = Pacientes::where('rut', $rut)->with('recetaSecretaria','recetaSecretaria.profesional', 'recetaSecretaria.paciente')->first();
                    if(count($paciente->recetaSecretaria) > 0)
                    {
                        return ['valor' => 2, 'paciente' => $paciente];
                    }else{
                        return ['valor' => 0];
                    }
                    
                }else{
                    return ['valor' => 0];
                }   
            }
        }else if($user->hasRole('Administrador')){

            $paciente = Pacientes::where('rut', $rut)->first();
            if(empty($paciente))
            {
                return 0;
            }else{
                $recetas = Recetas::where('paciente_id', $paciente->id_paciente)->get();
                if(count($recetas) > 0)
                {   
                    $paciente = Pacientes::where('rut', $rut)->with('receta','receta.profesional', 'receta.paciente')->first();
                    if(count($paciente->receta) > 0)
                    {
                        return ['valor' => 1, 'paciente' => $paciente];
                    }else{
                        return ['valor' => 0];
                    }
                }else{
                    return ['valor' => 0];
                }   
            }
        }          
    }

    public function imprimirreceta($codigo)
    {

        $receta = Recetas::where('codigo', $codigo)->with('paciente')->first();

        $pdf = \PDF::loadView('pdfreceta', compact('receta'))->setPaper('a5', 'portrait');
            
        return $pdf->stream('archivo.pdf');


    }

    public function imprimirrecetaSecretaria($codigo)
    {

        $receta = Recetas::where('codigo', $codigo)->with('paciente')->first();

        if($receta->permite_impresion == 0)
        {
            return redirect('/solicitud_rechazada');
        }else{
            Recetas::where('codigo', $codigo)->update(['permite_impresion' => 0]);

                    $pdf = \PDF::loadView('pdfreceta', compact('receta'))->setPaper('a5', 'portrait');
                    $pdf->render();
                    
                    
            return  $pdf->stream('archivo.pdf');
        }
    }

    public function enviarImpresionSecretaria($codigo)
    {
        Recetas::where('codigo', $codigo)->update(['permite_impresion' => 1]);

        return "Receta enviada a secretaria.";
    }

}
