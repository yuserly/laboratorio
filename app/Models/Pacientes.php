<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pacientes extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_paciente';

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

    public function recetaSecretaria(){

        return $this->hasMany(Recetas::class,'paciente_id','id_paciente')->where('permite_impresion', '=', 1)->orderBy('created_at','DESC');
    }

    public function consulta(){

        return $this->hasMany(Consulta::class,'paciente_id','id_paciente')->orderBy('created_at','DESC');
    }

    public function derivacion(){

        return $this->hasMany(Derivacion::class,'paciente_id','id_paciente')->orderBy('created_at','DESC');
    }
}
