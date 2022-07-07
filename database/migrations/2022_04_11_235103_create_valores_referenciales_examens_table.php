<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateValoresReferencialesExamensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('valores_referenciales_examens', function (Blueprint $table) {
            $table->id('id_valores_referenciales_examens');
            $table->string('tipo'); //edad u otra cosa
            $table->float('valor_minimo', 8, 2);
            $table->float('valor_maximo', 8, 2);
            $table->unsignedBigInteger('analisis_examens_id')->nullable();
            $table->foreign('analisis_examens_id')->references('id_analisis_examens')->on('analisis_examens');
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
        Schema::dropIfExists('valores_referenciales_examens');
    }
}
