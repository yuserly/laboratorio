<?php

use App\Http\Controllers\OrdenExamenesController;
use App\Http\Controllers\RecetasController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// lo usamos para imprimir la receta

Route::get('receta/{codigo}',[RecetasController::class,'imprimirreceta']);

// Lo usamos para imprimir el examen

Route::get('examen/{codigo}',[OrdenExamenesController::class,'imprimirexamen']);



Route::get('/plantilla/receta', function(){
    return view('pdfreceta');
});


Route::get('/{any}', function () {
    return view('index');
})->where('any','.*');
