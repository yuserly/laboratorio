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
                            'name'  => 'Yuserly Bracho',
                            'password' => Hash::make('12345678'),
                            'nombres' => 'Yuserly',
                            'apellidos' => 'Bracho',
                            'email' => 'yuserlybracho@gmail.com'
                            ]);
        $user1->assignRole(1);

    }
}
