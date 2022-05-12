<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdenExamenes extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_orden_examenes';

    protected $fillable = [
        'codigo',
        'user_id',
        'paciente_id',
        'fecha',
        'exec'
    ];

    public function paciente(){

        return $this->belongsTo(Pacientes::class,'paciente_id','id_paciente');
    }

    public function examenorden(){

        return $this->hasMany(ExamenesPorOrden::class,'orden_examenes_id','id_orden_examenes');
    }

    public function profesional(){

        return $this->belongsTo(User::class,'analizadax','id');
    }
}