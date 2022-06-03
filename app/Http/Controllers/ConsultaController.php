<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConsultaRequest;
use App\Http\Requests\UpdateConsultaRequest;
use App\Models\Consulta;
use Illuminate\Http\Request;

use App\Mail\EnvioConsulta;
use App\Models\Pacientes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ConsultaController extends Controller
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

        $consulta = Consulta::create([
            'codigo' => uniqid(),
            'motivo' => $request->motivo,
            'descripcion' => $request->anamnesis,
            'fecha' => date('Y-m-d'),
            'user_id' => $user->id,
            'paciente_id' => $paciente->id_paciente

        ]);

        return $consulta;

    }

    public function show($rut){

        //
        $paciente = Pacientes::where('rut', $rut)->first();
        if(empty($paciente))
        {
            return 0;
        }else{
            $consulta = Consulta::where('paciente_id', $paciente->id_paciente)->get();
            if(count($consulta) > 0)
            {   
                $paciente = Pacientes::where('rut', $rut)->with('consulta','consulta.profesional', 'consulta.paciente')->first();
                return $paciente;
            }else{
                return 0;
            }   
        }
    }

    public function imprimirConsulta($codigo){

        $consulta = Consulta::where('codigo', $codigo)->with('paciente')->first();

        $pdf = \PDF::loadView('pdfconsulta', compact('consulta'))->setPaper('a5', 'portrait');;

        return $pdf->stream('consulta.pdf');

    }

}
