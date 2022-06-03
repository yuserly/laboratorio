<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecetasTable extends Migration
{

    public function up()
    {
        Schema::create('recetas', function (Blueprint $table) {
            $table->id('id_receta');
            $table->string('codigo');
            $table->string('diagnostico');
            $table->longText('receta');
            $table->date('fecha');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('paciente_id')->nullable();
            $table->foreign('paciente_id')->references('id_paciente')->on('pacientes');
            $table->boolean('permite_impresion')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('recetas');
    }
}
