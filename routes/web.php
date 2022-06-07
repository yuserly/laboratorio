<?php

use App\Http\Controllers\OrdenExamenesController;
use App\Http\Controllers\RecetasController;
use App\Http\Controllers\DerivacionController;
use App\Http\Controllers\ConsultaController;
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
Route::get('recetaSecretaria/{codigo}',[RecetasController::class,'imprimirrecetaSecretaria']);

// Lo usamos para imprimir el examen

Route::get('examen/{codigo}',[OrdenExamenesController::class,'imprimirexamen']);

// lo usamos para imprimir la receta

Route::get('derivacion/{codigo}',[DerivacionController::class,'imprimirderivacion']);

Route::get('imprimirConsulta/{codigo}', [ConsultaController::class, 'imprimirConsulta']);

Route::get('verpdf', [OrdenExamenesController::class, 'verpdf']);



Route::get('/plantilla/receta', function(){
    return view('pdfreceta');
});


Route::get('/{any}', function () {
    return view('index');
})->where('any','.*');
