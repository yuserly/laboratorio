<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnalisisExamensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('analisis_examens', function (Blueprint $table) {
            $table->id('id_analisis_examens');
            $table->string('nombre');
            $table->unsignedBigInteger('examen_id')->nullable();
            $table->foreign('examen_id')->references('id_examen')->on('examens');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('analisis_examens');
    }
}
