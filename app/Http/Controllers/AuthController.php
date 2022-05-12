<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Builder\Use_;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\CodPassword;

class AuthController extends Controller
{
    //
    public function login(Request $request){
        // return $request;

        if(Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])){
            $user = Auth::user();
            $permisos = $user->getAllPermissions();
            $response = [
                'token' => $user->createToken('tahuCoding')->plainTextToken,
                'email' => $user->email,
                'name' => $user->name,
                'permisos' => $permisos
            ];
            return $response;
        }else{
            return "0";
        }

    }

    public function logout(Request $request){

        $user = Auth::user();
        $user->tokens()->delete();
        return 1;


    }

    public function validaremail(Request $request){
        $data = request();
        $user = User::where('email',$data['email'])->first();
        if($user){
            $cod = strtoupper(Str::random(6));
            $token = User::where('email',$data['email'])
                ->update([
                    'remember_token' => $cod
                ]);
            if($token){
                $mail = Mail::to($data->email)->send(new codPassword($cod));
                return 1 ;
            }
        }else{
            return 0;
        }

    }



    public function resetpass($code){
        return $code;
    }

    public function cambiarpassword(Request $request){
        $data = request();

        $existe = User::where([
                                ['email',$data->email],
                                ['remember_token',$data->codigo]
                                ])->first();

        if($existe){
            $user = User::where([
                        ['email',$data->email],
                        ['remember_token',$data->codigo]
                        ])
                    ->update(['password' => Hash::make($data->password)]);
            if($user){
                return 1;
            }else{
                return 0;
            }
        }else{
            return 2;
        }


    }
}
