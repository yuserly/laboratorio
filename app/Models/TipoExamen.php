<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoExamen extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = 'id_tipo_examens';

    protected $fillable = [
        'nombre'
    ];


    public function examen(){

        return $this->hasMany(Examen::class,'tipo_examens_id','id_tipo_examens');
    }
}
