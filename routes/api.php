<?php

use App\Http\Controllers\AdministradorColegiosController;
use App\Http\Controllers\ColegiosController;
use App\Http\Controllers\PlanesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApoderadosController;
use App\Http\Controllers\AlumnosController;
use App\Http\Controllers\AnalisisExamenController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\OrdenExamenesController;
use App\Http\Controllers\PacientesController;
use App\Http\Controllers\PagosController;
use App\Http\Controllers\PrendasNotificadasController;
use App\Http\Controllers\QrController;
use App\Http\Controllers\RecetasController;
use App\Http\Controllers\ScannerQrController;
use App\Http\Controllers\TipoExamenController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\VentasController;
use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\DerivacionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// QR

Route::middleware('auth:sanctum')->group(function(){

    // Usuarios

    Route::get('obtenerusuario/{rol}',[UsuariosController::class,'show']);
    Route::get('obtenerusuarioprofesionales',[UsuariosController::class,'showprofesional']);
    Route::get('obtenerusuariosecretaria',[UsuariosController::class,'showsecretaria']);
    Route::get('obtenerroles',[UsuariosController::class,'roles']);
    Route::get('validaremail/{email}',[UsuariosController::class,'validaremail']);
    Route::get('validarrut/{rut}',[UsuariosController::class,'validarrut']);
    Route::post('crearusuario',[UsuariosController::class,'store']);
    Route::delete('eliminarusuario/{user}', [UsuariosController::class, 'destroy']);

    // Recetas

    Route::post('crearrecetas',[RecetasController::class,'store']);
    Route::get('validarrutpaciente/{rut}',[PacientesController::class,'validarrut']);
    Route::get('recetas/{rut}',[RecetasController::class,'show']);
    Route::get('enviarimpresion/{codigo}', [RecetasController::class, 'enviarImpresionSecretaria']);
    // Route::get('envioreceta/{rut}',[RecetasController::class,'enviarreceta']); SUSPENDIDO TEMPORALMENTE

    // Consultas

    Route::post('crearconsultas',[ConsultaController::class,'store']);
    Route::get('consultas/{rut}',[ConsultaController::class,'show']);

    // Derivaciones

    Route::post('crearderivacion',[DerivacionController::class,'store']);
    Route::get('derivaciones/{rut}',[DerivacionController::class,'show']);
    Route::get('envioderivacion/{rut}',[DerivacionController::class,'enviarderivacion']);

    // Tipo Examen

    Route::post('creartipoexamen',[TipoExamenController::class,'store']);
    Route::get('validarnombretipo/{nombre}',[TipoExamenController::class,'validarnombre']);
    Route::get('obtenertipoexamen',[TipoExamenController::class,'show']);
    Route::delete('eliminartipoexamen/{tipoexamen}', [TipoExamenController::class, 'destroy']);

    // Examen

    Route::post('crearexamen',[ExamenController::class,'store']);
    Route::get('validarnombreexamen/{nombre}',[ExamenController::class,'validarnombre']);
    Route::get('obtenerexamen',[ExamenController::class,'show']);
    Route::delete('eliminarexamen/{examen}', [ExamenController::class, 'destroy']);

    // Analisis de Examenes


    Route::post('crearanalisis',[AnalisisExamenController::class,'store']);
    Route::get('validarnombreanalisis/{nombre}',[AnalisisExamenController::class,'validarnombre']);
    Route::get('obteneranalisis',[AnalisisExamenController::class,'show']);
    Route::delete('eliminaranalisis/{analisisexamen}', [AnalisisExamenController::class, 'destroy']);

    // Orden de Examenes

    Route::post('crearordenexamen',[OrdenExamenesController::class,'store']);
    Route::get('showxeditar',[OrdenExamenesController::class,'showxeditar']);
    Route::get('obtenordenpendiente',[OrdenExamenesController::class,'showpendiente']);
    Route::get('obtenordenpendientepago',[OrdenExamenesController::class,'showpendientepago']);

    //Traer ordenes del paciente

    Route::get('traerordenpaciente/{rut}',[OrdenExamenesController::class,'traerordenpaciente']);

    Route::get('obtenordenrealizada',[OrdenExamenesController::class,'showrealizada']);

    // pagar orden

    Route::post('marcarpagada',[OrdenExamenesController::class,'marcarpagada']);
    Route::post('marcarpagadaactualizar', [OrdenExamenesController::class, 'marcapagadaActualizar']);

    // guardar resultados examenes

    Route::post('guardarresultado',[OrdenExamenesController::class,'guardarresultado']);

    // marcar analizada

    Route::post('marcaranalizada',[OrdenExamenesController::class,'marcaranalizada']);

    // marcar orden como toma realizada

    Route::get('marcartomarealizada/{idorden}',[OrdenExamenesController::class,'marcartomarealizada']);
    Route::get('getMustrasRealizadas', [OrdenExamenesController::class, 'getMustrasRealizadas']);
    Route::get('historialMuestraRut/{rut}', [OrdenExamenesController::class, 'historialMuestraRut']);

    //Traer analisis sin aceptar

    Route::get('obteneranalisissinaceptar', [OrdenExamenesController::class, 'obteneranalisissinaceptar']);
    Route::get('aceptarAnalisis/{id}', [OrdenExamenesController::class, 'aceptarAnalisis']);
    Route::get('volverAnalizar/{id}', [OrdenExamenesController::class, 'volverAnalizar']);
    Route::get('historialAnalisisEmitidas/{rut}', [OrdenExamenesController::class, 'historialAnalisisEmitidas']);
    //Historial de analisis
    Route::get('getAnalisisRealizados', [OrdenExamenesController::class, 'getAnalisisRealizados']);


    // examenes listo para imprimir o enviar

    Route::get('historialordenrut/{rut}',[OrdenExamenesController::class,'historialordenrut']);

    Route::get('envioexamen/{codigo}',[OrdenExamenesController::class,'enviarexamen']);

    //Ventas
    Route::get('getVentasSecretaria', [VentasController::class, 'getVentaSecretaria']);

    //Venta Administrador
    Route::get('searchVentaFecha/{mes}', [VentasController::class, 'searchVentaFecha']);


    // logout

    Route::post('logout',[AuthController::class,'logout']);



    //apoderados
    Route::get('obtenerclientes',[ApoderadosController::class,'showall']);
    Route::post('updatecliente',[ApoderadosController::class,'updatecliente']);

    //alumnos
    Route::get('obteneralumnos',[AlumnosController::class,'showall']);
    Route::post('updatealumno',[AlumnosController::class,'updatealumno']);

    // regiones
    Route::get('regiones',[PagosController::class,'showregiones']);
    Route::get('comuna/{id}',[PagosController::class,'showcomuna']);

});



//Login

Route::post('login',[AuthController::class,'login']);
Route::post('validar-email',[AuthController::class,'validaremail']);
Route::post('cambiar-password',[AuthController::class,'cambiarpassword']);










