<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PermissionsSeeder::class);
        $this->call(TipoExamenSeeder::class);


        $user1 = User::create([
                            'name'  => 'Administrador',
                            'password' => Hash::make('12345678'),
                            'nombres' => 'Roberto',
                            'apellidos' => 'Ruiz',
                            'email' => 'novakimen@gmail.com'
                            ]);
        $user1->assignRole(1);

        $user1 = User::create([
            'name'  => 'Profesional Box',
            'password' => Hash::make('12345678'),
            'nombres' => 'Profesional',
            'apellidos' => 'Box',
            'email' => 'box@correo.com'
            ]);
        $user1->assignRole(2);

        $user1 = User::create([
            'name'  => 'Profesional Laboratorio',
            'password' => Hash::make('12345678'),
            'nombres' => 'Profesional',
            'apellidos' => 'Laboratorio',
            'email' => 'laboratorio@correo.com'
            ]);
        $user1->assignRole(3);

        $user1 = User::create([
            'name'  => 'Profesional Ejecutor',
            'password' => Hash::make('12345678'),
            'nombres' => 'Profesional',
            'apellidos' => 'Ejecutor',
            'email' => 'ejecutor@correo.com'
            ]);
        $user1->assignRole(4);

        $user1 = User::create([
            'name'  => 'Secretaria',
            'password' => Hash::make('12345678'),
            'nombres' => 'Secretaria',
            'apellidos' => 'Novakimen',
            'email' => 'secretaria@correo.com'
            ]);
        $user1->assignRole(5);

    }
}
