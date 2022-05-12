<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Examen extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = 'id_examen';

    protected $fillable = [
        'codigo',
        'nombre',
        'precio',
        'kids',
        'tipo_examens_id'
    ];

    public function tipoexamen(){

        return $this->belongsTo(TipoExamen::class,'tipo_examens_id');
    }

}
