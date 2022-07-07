<?php

namespace App\Http\Controllers;

use App\Models\AnalisisExamen;
use App\Models\Examen;
use App\Models\ValoresReferencialesExamen;
use Illuminate\Http\Request;

class AnalisisExamenController extends Controller
{
    public function store(Request $request){

        $analisis = AnalisisExamen::updateOrCreate(['id_analisis_examens' => $request->id_analisis_examens],[
                                            'nombre' => $request->nombre,
                                            'examen_id' => $request->examen_id
                                          ]);

        ValoresReferencialesExamen::where('analisis_examens_id', $analisis->id_analisis_examens)->delete();

        if($request->valores){

            for ($i=0; $i < count($request->valores) ; $i++) {

                ValoresReferencialesExamen::create([
                    'tipo' => $request->valores[$i]["tipo"],
                    'valor_minimo' => $request->valores[$i]["valor_minimo"],
                    'valor_maximo' => $request->valores[$i]["valor_maximo"],
                    'analisis_examens_id' => $analisis->id_analisis_examens,
                    'examen_id' => $request->examen_id
                ]);
            }

        }

        Examen::updateOrCreate(['id_examen' => $request->examen_id],['existe_analisis' => 1]);

        return $analisis;
    }

    public function validarnombre($nombre){

        $tipo = AnalisisExamen::where('nombre', $nombre)->first();

        if($tipo){
            return 1;
        }else{
            return 0;
        }

    }

    public function show(){

        return AnalisisExamen::with('examen','valoresreferenciales')->get();
    }

    public function destroy(AnalisisExamen $analisisexamen)
    {   
        $cantidad = AnalisisExamen::where('examen_id', $analisisexamen->examen_id)->where('deleted_at', null)->get();
        if(count($cantidad) == 1)
        {
            Examen::updateOrCreate(['id_examen' => $analisisexamen->examen_id],['existe_analisis' => 0]);
        }
        
        return $analisisexamen->delete();
    }
}
