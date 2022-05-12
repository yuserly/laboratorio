<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResultadosExamenesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resultados_examenes', function (Blueprint $table) {
            $table->id('id_resultados_examenes');
            $table->unsignedBigInteger('examenes_por_ordens_id')->nullable();
            $table->foreign('examenes_por_ordens_id')->references('id_examenes_por_ordens')->on('examenes_por_ordens');
            $table->unsignedBigInteger('analisis_examens_id')->nullable();
            $table->foreign('analisis_examens_id')->references('id_analisis_examens')->on('analisis_examens');
            $table->string('valor')->nullable();
            $table->unsignedBigInteger('estado_id')->nullable()->default(4);
            $table->foreign('estado_id')->references('id_estado')->on('estados');
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
        Schema::dropIfExists('resultados_examenes');
    }
}
