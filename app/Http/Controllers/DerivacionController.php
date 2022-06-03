<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDerivacionRequest;
use App\Http\Requests\UpdateDerivacionRequest;
use App\Models\Derivacion;
use Illuminate\Http\Request;

use App\Mail\EnvioDerivacion;
use App\Models\Pacientes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class DerivacionController extends Controller
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

        // creamos la derivacion

        $derivacion = Derivacion::create([
            'codigo' => uniqid(),
            'motivo' => $request->motivo,
            'descripcion' => $request->descripcion,
            'fecha' => date('Y-m-d'),
            'user_id' => $user->id,
            'paciente_id' => $paciente->id_paciente

        ]);

        if($request->enviarMail != null)
        {
            $this->enviarderivacion($derivacion->codigo);
        }

        return $derivacion;

    }

    public function show($rut){

        $user = Auth::user();

        $paciente = Pacientes::where('rut', $rut)->first();
        
        if($user->hasRole('Profesional Box')){ //Estado 7 es para todo lo emitido por el profesional de box;
            if(empty($paciente))
            { 
                return 0;
            }else{
                $derivacion = Derivacion::where(['paciente_id' => $paciente->id_paciente], ['user_id' => $user->id])->get();
                if(count($derivacion) > 0)
                {   
                    $paciente = Pacientes::where('rut', $rut)->with('derivacion','derivacion.profesional', 'derivacion.paciente')->first();
                    return $paciente;
                }else{
                    return 0;
                }   
            }
        }else if($user->hasRole('Administrador')){ //Estado 1 es para todo lo emitido por el profesional de box;
            if(empty($paciente))
            { 
                return 0;
            }else{
                $derivacion = Derivacion::where('paciente_id', $paciente->id_paciente)->get();
                if(count($derivacion) > 0)
                {   
                    $paciente = Pacientes::where('rut', $rut)->with('derivacion','derivacion.profesional', 'derivacion.paciente')->first();
                    return $paciente;
                }else{
                    return 0;
                }   
            }
        }else if($user->hasRole('Secretaria')){ //Estado 1 es para todo lo emitido por el profesional de box;
            if(empty($paciente))
            { 
                return 0;
            }else{
                $derivacion = Derivacion::where('paciente_id', $paciente->id_paciente)->get();
                if(count($derivacion) > 0)
                {   
                    $paciente = Pacientes::where('rut', $rut)->with('derivacion','derivacion.profesional', 'derivacion.paciente')->first();
                    return $paciente;
                }else{
                    return 0;
                }   
            }
        }

        
    }

    public function imprimirderivacion($codigo){

        $derivacion = Derivacion::where('codigo', $codigo)->with('paciente')->first();

        $pdf = \PDF::loadView('pdfderivacion', compact('derivacion'))->setPaper('a5', 'portrait');;

        return $pdf->stream('derivacion.pdf');

    }

    public function enviarderivacion($codigo){

        $derivacion = Derivacion::where('codigo', $codigo)->with('paciente')->first();

        $pdf = \PDF::loadView('pdfderivacion', compact('derivacion'))->setPaper('a5', 'portrait');;

        Mail::to($derivacion->paciente['email'])->send(new EnvioDerivacion($derivacion->paciente['nombres'], $derivacion->paciente['apellidos'], $pdf));

        return ['mensaje' => 'Derivacion enviada exitosamente al usuario.'];

    }
}