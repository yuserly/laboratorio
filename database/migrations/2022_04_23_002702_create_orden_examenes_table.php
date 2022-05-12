<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenExamenesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orden_examenes', function (Blueprint $table) {
            $table->id('id_orden_examenes');
            $table->string('codigo');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('paciente_id')->nullable();
            $table->foreign('paciente_id')->references('id_paciente')->on('pacientes');
            $table->unsignedBigInteger('estado_id')->nullable()->default(1);
            $table->foreign('estado_id')->references('id_estado')->on('estados');
            $table->integer('exec')->nullable()->default(0); // para saber si se realiza los examenes en el laboratorio, 0 no, 1 si.
            $table->integer('pago')->nullable()->default(0); // estado 0 pendiente, estado 1 pagado, estado 2 rechazado
            $table->unsignedBigInteger('analizadax')->nullable();
            $table->foreign('analizadax')->references('id')->on('users');
            $table->date('fecha');
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
        Schema::dropIfExists('orden_examenes');
    }
}
