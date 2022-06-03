<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrevisionsTable extends Migration
{

    public function up()
    {
        Schema::create('previsions', function (Blueprint $table) {
            $table->id('id_prevision');
            $table->string('nombre');
            $table->timestamps();
        });

        DB::table('previsions')->insert(['nombre' => 'Fonasa']);
        DB::table('previsions')->insert(['nombre' => 'Particular']);
        DB::table('previsions')->insert(['nombre' => 'Banmedica']);
        DB::table('previsions')->insert(['nombre' => 'Isalud']);
        DB::table('previsions')->insert(['nombre' => 'Colmena']);
        DB::table('previsions')->insert(['nombre' => 'Consalud']);
        DB::table('previsions')->insert(['nombre' => 'Cruz Blanca']);
        DB::table('previsions')->insert(['nombre' => 'Cruz del Norte']);
        DB::table('previsions')->insert(['nombre' => 'Masvida']);
        DB::table('previsions')->insert(['nombre' => 'Fundación Banco Estado']);
        DB::table('previsions')->insert(['nombre' => 'Vida Tres']);
    }


    public function down()
    {
        Schema::dropIfExists('previsions');
    }
}
