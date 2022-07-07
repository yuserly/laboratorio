<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnalisisExamen extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = 'id_analisis_examens';

    protected $fillable = [
        'nombre',
        'unidad',
        'examen_id'
    ];

    public function examen(){

        return $this->belongsTo(Examen::class,'examen_id');
    }

    public function valoresreferenciales()
    {
        return $this->hasMany(ValoresReferencialesExamen::class, 'analisis_examens_id','id_analisis_examens');
    }
}
