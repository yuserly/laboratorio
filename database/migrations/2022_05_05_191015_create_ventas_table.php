<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVentasTable extends Migration
{

    public function up()
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->id('id_venta');
            $table->unsignedBigInteger('orden_examenes_id')->nullable();
            $table->foreign('orden_examenes_id')->references('id_orden_examenes')->on('orden_examenes');
            $table->unsignedBigInteger('prevision_id')->nullable()->default(null);
            $table->foreign('prevision_id')->references('id_prevision')->on('previsions');
            $table->integer('neto')->nullable();
            $table->integer('iva')->nullable();
            $table->integer('total')->nullable();
            $table->integer('pago_efectivo')->nullable()->default(0);
            $table->integer('pago_debito')->nullable()->default(0);
            $table->integer('pago_credito')->nullable()->default(0);
            $table->integer('totalorden')->nullable();
            $table->integer('estado')->nullable()->default(0); // pagado 1, pendiente 0, rechazado  3
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ventas');
    }
}
