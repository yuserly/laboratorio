<?php

namespace App\Http\Controllers;

use App\Models\Pacientes;
use Illuminate\Http\Request;

class PacientesController extends Controller
{
    public function validarrut($rut){

        $user = Pacientes::where('rut', $rut)->first();

        return $user;

    }
}
