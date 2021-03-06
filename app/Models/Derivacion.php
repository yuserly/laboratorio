<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Derivacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'motivo',
        'descripcion',
        'fecha',
        'user_id',
        'paciente_id'
    ];


    public function profesional(){

        return $this->belongsTo(User::class,'user_id');
    }

    public function paciente(){

        return $this->belongsTo(Pacientes::class,'paciente_id','id_paciente');
    }
}
