<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVentasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->id('id_venta');
            $table->unsignedBigInteger('orden_examenes_id')->nullable();
            $table->foreign('orden_examenes_id')->references('id_orden_examenes')->on('orden_examenes');
            $table->integer('neto');
            $table->integer('iva');
            $table->integer('total');
            $table->integer('estado')->nullable()->default(0); // pagado 1, pendiente 0, rechazado  3
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ventas');
    }
}
