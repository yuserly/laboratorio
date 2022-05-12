<?php

namespace App\Http\Controllers;

use App\Mail\EnvioReceta;
use App\Models\Pacientes;
use App\Models\Recetas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class RecetasController extends Controller
{
    public function store(Request $request){

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
            'paciente_id' => $paciente->id_paciente

        ]);

        return $receta;


    }

    public function show($rut){

        $paciente = Pacientes::where('rut', $rut)->with('receta','receta.profesional', 'receta.paciente')->first();

        return $paciente;
    }

    public function imprimirreceta($codigo){

        $receta = Recetas::where('codigo', $codigo)->with('paciente')->first();

        $pdf = \PDF::loadView('pdfreceta', compact('receta'));

        return $pdf->stream('archivo.pdf');

    }

    public function enviarreceta($codigo){

        $receta = Recetas::where('codigo', $codigo)->with('paciente')->first();

        $pdf = \PDF::loadView('pdfreceta', compact('receta'));


        Mail::to($receta->paciente['email'])->send(new EnvioReceta($receta->paciente['nombres'], $receta->paciente['apellidos'], $pdf));


    }


}
