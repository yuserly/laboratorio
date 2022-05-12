<?php

namespace App\Http\Controllers;

use App\Models\TipoExamen;
use Illuminate\Http\Request;

class TipoExamenController extends Controller
{
    public function store(Request $request){

        $tipo = TipoExamen::updateOrCreate(['id_tipo_examens' => $request->id_tipo_examens],[
                                            'nombre' => $request->nombre,
                                          ]);

        return $tipo;
    }

    public function validarnombre($nombre){

        $tipo = TipoExamen::where('nombre', $nombre)->first();

        if($tipo){
            return 1;
        }else{
            return 0;
        }

    }

    public function show(){

        return TipoExamen::all();
    }

    public function destroy(TipoExamen $tipoexamen)
    {
        return $tipoexamen->delete();
    }
}
