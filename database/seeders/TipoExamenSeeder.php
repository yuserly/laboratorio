<?php

namespace Database\Seeders;

use App\Models\TipoExamen;
use Illuminate\Database\Seeder;

class TipoExamenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       TipoExamen::create(['nombre'=> 'Hematologicos']); // 1
       TipoExamen::create(['nombre'=> 'Bioquimicos']); // 2
       TipoExamen::create(['nombre'=> 'Perfil Lipidico o Lipidograma']); // 3
       TipoExamen::create(['nombre'=> 'Hepaticos']); // 4
       TipoExamen::create(['nombre'=> 'Serologicos/Inmunologicos/Virales']); // 5
       TipoExamen::create(['nombre'=> 'Urinarios']); // 6
       TipoExamen::create(['nombre'=> 'Cultivo']); // 7
       TipoExamen::create(['nombre'=> 'Deposiciones']); // 8
       TipoExamen::create(['nombre'=> 'Hormonas']); // 9

    }
}
