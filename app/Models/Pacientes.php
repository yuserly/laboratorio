<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pacientes extends Model
{
    use HasFactory;

    protected $fillable = [
        'rut',
        'nombres',
        'apellidos',
        'edad',
        'fecha_nacimiento',
        'telefono',
        'email'
    ];

    public function receta(){

        return $this->hasMany(Recetas::class,'paciente_id','id_paciente')->orderBy('created_at','DESC');
    }
}
