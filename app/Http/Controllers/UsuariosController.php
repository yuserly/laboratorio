<?php

namespace App\Http\Controllers;

use App\Mail\SendMailUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

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

    public function store(Request $request){


        if($request->id){

            $userl = User::where('id',$request->id)->first();

            $password = $userl->password;

        }else{

            $code = Str::random(8);
            $password = Hash::make($code);

        }

        if($request->rut){
            $rut = $request->rut;
        }else{
            $rut = "";
        }

        if($request->profesion){
            $profesion = $request->profesion;
        }else{
            $profesion = "";
        }

        if($request->file("firma")){
            $path = public_path().'/storage/firma/';


                $file = $request->file('firma');
                $fileName = trim(uniqid().$file->getClientOriginalName());
                $file->move($path, $fileName);

            $img = "firma/".$fileName;
        }else{

            $img = $request->antfirma;
        }

            $user = User::updateOrCreate(['id' => $request->id],[
                                        'name' => $request->nombres ." ".$request->apellidos ,
                                        'password' => $password,
                                        'nombres' => $request->nombres,
                                        'apellidos' => $request->apellidos,
                                        'email' => $request->email,
                                        'rut' => $rut,
                                        'profesion'=> $profesion,
                                        'firma' => $img,
                                        ]);


            $user->syncRoles($request->rol);

            $estado = 1;

            // Mail::to($request->email)->send(new SendMailUser($request->nombres, $request->apellidos, $request->email, $code, $estado));

            return $user;

    }

    public function destroy(User $user)
    {
        return $user->delete();
    }
}
