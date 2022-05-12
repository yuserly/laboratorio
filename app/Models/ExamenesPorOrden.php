<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamenesPorOrden extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_examenes_por_ordens';

    protected $fillable = [
        'orden_examenes_id',
        'examen_id'
    ];

    public function examen(){

        return $this->belongsTo(Examen::class,'examen_id');
    }

    public function resultados(){

        return $this->hasMany(ResultadosExamenes::class,'examenes_por_ordens_id','id_examenes_por_ordens');
    }
}
