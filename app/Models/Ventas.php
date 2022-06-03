<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ventas extends Model
{
    use HasFactory;

    protected $primaryKey = "id_venta";

    protected $fillable = [
        'orden_examenes_id',
        'neto',
        'iva',
        'total',
        'prevision_id',
        'pago_debito',
        'pago_efectivo',
        'pago_credito',
        'totalorden',
        'ventas',
        'estado',
    ];

    public function prevision(){

        return $this->belongsTo(Prevision::class,'prevision_id','id_prevision');
    }

    public function ordenexamen(){

        return $this->belongsTo(OrdenExamenes::class,'orden_examenes_id','id_orden_examenes');
    }

}
