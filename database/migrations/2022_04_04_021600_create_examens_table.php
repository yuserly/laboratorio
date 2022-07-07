<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examens', function (Blueprint $table) {
            $table->id('id_examen');
            $table->string('codigo');
            $table->string('nombre');
            $table->integer('precio_lab')->default(0);
            $table->integer('precio_pac')->default(0);
            $table->integer('precio_par')->default(0);
            $table->integer('kids')->nullable()->default(0);
            $table->unsignedBigInteger('tipo_examens_id')->nullable(); 
            $table->foreign('tipo_examens_id')->references('id_tipo_examens')->on('tipo_examens'); 
            $table->boolean('existe_analisis')->default(0); //Si es 1 se mostrara en la secretaria y en el box para poder usarlo en una orden, de lo contrario no aparecera, debe tener analisis de examenes.
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
        Schema::dropIfExists('examens');
    }
}
