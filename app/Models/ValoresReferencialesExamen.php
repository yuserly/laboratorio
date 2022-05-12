<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValoresReferencialesExamen extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo',
        'valor_minimo',
        'valor_maximo',
        'analisis_examens_id',
        'examen_id'
    ];
}
