<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;

class ExamenController extends Controller
{
    public function store(Request $request)
    {
        $dat = Examen::where('codigo', $request->codigo)->get();
        if($dat)
        {
            if(count($dat) > 0){
                return ['estado' => 1];
            }
        }

        if($request->kids){
            $kids = 1;
        }else{
            $kids = 0;
        }

        $examen = Examen::updateOrCreate(['id_examen' => $request->id_examen],[
                                            'codigo' => $request->codigo,
                                            'nombre' => $request->nombre,
                                            'precio_lab' => $request->precio_lab,
                                            'precio_pac' => $request->precio_pac,
                                            'precio_par' => $request->precio_par,
                                            'kids' => $kids,
                                            'tipo_examens_id' => $request->tipoexamen['id_tipo_examens']
                                          ]);

        return $examen;
    }

    public function validarnombre($nombre){

        $tipo = Examen::where('nombre', $nombre)->first();

        if($tipo){
            return 1;
        }else{
            return 0;
        }

    }
    
    public function show(){

        // return Examen::where('existe_analisis', 1)->with('tipoexamen')->get();

        return Examen::with('tipoexamen')->get();

    }

    public function destroy(Examen $examen)
    {
        return $examen->delete();
    }
}
