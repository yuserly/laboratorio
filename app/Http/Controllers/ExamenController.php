<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;

class ExamenController extends Controller
{
    public function store(Request $request){

        if($request->kids){
            $kids = 1;
        }else{
            $kids = 0;
        }

        $examen = Examen::updateOrCreate(['id_examen' => $request->id_examen],[
                                            'codigo' => $request->codigo,
                                            'nombre' => $request->nombre,
                                            'precio' => $request->precio,
                                            'kids' => $kids,
                                            'tipo_examens_id' => $request->tipoexamen
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

        return Examen::with('tipoexamen')->get();
    }

    public function destroy(Examen $examen)
    {
        return $examen->delete();
    }
}
