<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ventas;
use App\Models\Prevision;

class VentasController extends Controller
{
    public function getVentaSecretaria()
    {   
        $previsiones  = Prevision::All();
        $ventas = Ventas::where('estado', 1)->with('ordenexamen.paciente', 'prevision','ordenexamen.examenorden.examen')->get();
        return ['valor' => 1, 'ventas' => $ventas, 'previsiones' => $previsiones];
    }

    public function searchVentaFecha($mes)
    {   
        $ventas = Ventas::where('estado', 1)->where('created_at', 'LIKE', '%'.$mes.'%')->with('ordenexamen.paciente', 'prevision','ordenexamen.examenorden.examen')->get();
        
        if(count($ventas) > 0)
        {
            return ['valor' => 1, 'ventas' => $ventas];
        }else{
            return ['valor' => 0];
        }
        
    }
}
