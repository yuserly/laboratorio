<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultadosExamenes extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_resultados_examenes';

    protected $fillable = [
        'examenes_por_ordens_id',
        'analisis_examens_id',
        'valor'
    ];
    public function analisis(){

        return $this->belongsTo(AnalisisExamen::class,'analisis_examens_id');
    }
}
