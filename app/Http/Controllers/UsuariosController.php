<?php

namespace App\Http\Controllers;

use App\Mail\SendMailUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Auth;


class UsuariosController extends Controller
{
    public function show($rol){

        return User::role($rol)->with('roles')->get();

    }

    public function showprofesional(){

        return User::role(['Profesional Box','Profesional Laboratorio','Profesional Ejecutor'])->with('roles')->get();

    }

    public function showsecretaria(){

        return User::role(['Secretaria'])->with('roles')->get();

    }

    public function roles(){

        return Role::all();

    }

    public function validaremail($email){

        $user = User::where('email', $email)->first();

        if($user){
            return 1;
        }else{
            return 0;
        }

    }

    public function validarrut($rut){

        $user = User::where('rut', $rut)->first();

        if($user){
            return 1;
        }else{
            return 0;
        }

    }

    public function store(Request $request)
    {   
        
        if($request->imagenCheck == 1)
        {
            if($request->imagen)
            {
                $img        = Storage::disk('public')->putFile('/Firma', new file($request->imagen));
                $user = User::where('id', $request->id)->first();
                if($user){
                    if($user->url_firma != null)
                    {
                        Storage::disk('public')->delete($user->url_firma);
                    }
                }
            }
        }else{

            $img = null;
        }

        if($request->rut)
        {
            if($request->id == null)
            {
                $rutDuplicado = count(User::where('rut', $request->rut)->get());
                if($rutDuplicado > 0){
                    return 0; //Si es 0 quiere decir que hay un RUT ya ingresado por otro usuario.
                }
            }

            $rutDuplicado = User::where('rut', $request->rut)->get();
            foreach ($rutDuplicado as $key => $value) {
                if($value->id != $request->id)
                {
                    return 1;
                }
            }

            $rut = $request->rut;

        }else{
            $rut = null;
        }

        if($request->id){
            $userl = User::where('id',$request->id)->first();
            $password = $userl->password;
        }else{
            $code = Str::random(8);
            $password = Hash::make($code);
        }

        if($request->profesion){
            $profesion = $request->profesion;
        }else{
            $profesion = "";
        }


            if($request->imagen)
            {
                $user = User::updateOrCreate(['id' => $request->id],[
                    'name' => $request->nombres ." ".$request->apellidos ,
                    'password' => $password,
                    'nombres' => $request->nombres,
                    'apellidos' => $request->apellidos,
                    'email' => $request->email,
                    'rut' => $rut,
                    'profesion'=> $profesion,
                    'url_firma' => ($img != null) ? $img : null,
                    ]);
            }else{
                $user = User::updateOrCreate(['id' => $request->id],[
                    'name' => $request->nombres ." ".$request->apellidos ,
                    'password' => $password,
                    'nombres' => $request->nombres,
                    'apellidos' => $request->apellidos,
                    'email' => $request->email,
                    'rut' => $rut,
                    'profesion'=> $profesion,
                    ]);
            }
            


            $user->syncRoles($request->rol);

            $estado = 1;

            if($request->id == null)
            {
                Mail::to($request->email)->send(new SendMailUser($request->nombres, $request->apellidos, $request->email, $code, $estado));
            }

            return $user;

    }

    public function destroy(User $user)
    {
        return $user->delete();
    }

    public function changepassword(Request $request){

        $user = Auth::user();

        $act = User::where('id', $user->id)
        ->update(['password' => Hash::make($request->contrasena)]);
        if($act){
            return 1;
        }else{
            return 0;
        }
    }
}
