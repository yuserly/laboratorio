<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenesPorOrdensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examenes_por_ordens', function (Blueprint $table) {
            $table->id('id_examenes_por_ordens');
            $table->unsignedBigInteger('orden_examenes_id')->nullable();
            $table->foreign('orden_examenes_id')->references('id_orden_examenes')->on('orden_examenes');
            $table->unsignedBigInteger('examen_id')->nullable();
            $table->foreign('examen_id')->references('id_examen')->on('examens');
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
        Schema::dropIfExists('examenes_por_ordens');
    }
}
