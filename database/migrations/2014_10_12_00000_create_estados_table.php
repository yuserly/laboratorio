<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstadosTable extends Migration
{

    public function up()
    {
        Schema::create('estados', function (Blueprint $table) {
            $table->id('id_estado');
            $table->string('nombre');
            $table->timestamps();
        });

        DB::table('estados')->insert(['nombre' => "Orden de Examen Pendiente"]);   // al crear la orden
        DB::table('estados')->insert(['nombre' => "Orden de Examen Realizada"]);  // se tomo la muestra de sangre
        DB::table('estados')->insert(['nombre' => "Orden de Examen Analizada"]);
        DB::table('estados')->insert(['nombre' => "Muestra Pendiente"]);
        DB::table('estados')->insert(['nombre' => "Muestra Realizada"]);
        DB::table('estados')->insert(['nombre' => "Muestra Analizada"]);


    }

    public function down()
    {
        Schema::dropIfExists('estados');
    }
}
