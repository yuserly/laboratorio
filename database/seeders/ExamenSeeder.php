<?php

namespace Database\Seeders;

use App\Models\Examen;
use Illuminate\Database\Seeder;

class ExamenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // tipo 1

        Examen::create(['codigo'=> '0301034', 'nombre'=> 'Grupo y RH', 'unidad' => '', 'precio'=> 14000,'tipo_examens_id'=> 1]); 
        Examen::create(['codigo'=> '0301041', 'nombre'=> 'Hemoglobina Glicosilada Afc', 'precio'=> 15000,'tipo_examens_id'=> 1]); 
        Examen::create(['codigo'=> '0301045', 'nombre'=> 'Hemograma', 'precio'=> 15000,'tipo_examens_id'=> 1]); 
        Examen::create(['codigo'=> '0301067', 'nombre'=> 'Recuento de Plaquetas', 'precio'=> 15000,'tipo_examens_id'=> 1]); 
        Examen::create(['codigo'=> '0301059', 'nombre'=> 'Tiempo de Protrombina', 'precio'=> 15000,'tipo_examens_id'=> 1]); 
        Examen::create(['codigo'=> '0301085', 'nombre'=> 'T.T.P.K', 'precio'=> 15000,'tipo_examens_id'=> 1]); 
        Examen::create(['codigo'=> '0301072', 'nombre'=> 'Tiempo de Sangria', 'precio'=> 15000,'tipo_examens_id'=> 1]); 
        Examen::create(['codigo'=> '0301011', 'nombre'=> 'Tiempo de Coagulacion', 'precio'=> 15000,'tipo_examens_id'=> 1]); 
        Examen::create(['codigo'=> '0301041', 'nombre'=> 'VHS', 'precio'=> 15000,'tipo_examens_id'=> 1]); 

        // tipo 2 

        Examen::create(['codigo'=> '0302075', 'nombre'=> 'Perfil Bioquimico Completo', 'precio'=> 15000,'tipo_examens_id'=> 2]);
        Examen::create(['codigo'=> '0302005', 'nombre'=> 'Acido Urico', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302008', 'nombre'=> 'Amilasemia', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302015', 'nombre'=> 'Calcemia', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302024', 'nombre'=> 'Clearence de Creatinina', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302026', 'nombre'=> 'CK', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302025', 'nombre'=> 'CK - MB', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302023', 'nombre'=> 'Creatininemia', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302048', 'nombre'=> 'Curva de Tolerancia a la Glucosa', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0301028', 'nombre'=> 'Ferremia', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0301026', 'nombre'=> 'Ferritina', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302042', 'nombre'=> 'Fostemia', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302047', 'nombre'=> 'Glicemia', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302030', 'nombre'=> 'L.D.H', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302053', 'nombre'=> 'Lipasemia', 'precio'=> 15000,'tipo_examens_id'=> 2]);
        Examen::create(['codigo'=> '0302032x3', 'nombre'=> 'Sodio (Electrolito Plasmatico) (Na/K/CI)', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0301082', 'nombre'=> 'Transfemia', 'precio'=> 15000,'tipo_examens_id'=> 2]); 
        Examen::create(['codigo'=> '0302057', 'nombre'=> 'Uremia / BUM', 'precio'=> 15000,'tipo_examens_id'=> 2]); 

        // tipo 3 

        Examen::create(['codigo'=> '0302034', 'nombre'=> 'Colest. Total HDL, Triglicerios', 'precio'=> 15000,'tipo_examens_id'=> 3]); 

        // tipo 4 
        Examen::create(['codigo'=> '0302013', 'nombre'=> 'Bilirrubina Total y Conjugada', 'precio'=> 15000,'tipo_examens_id'=> 4]); 
        Examen::create(['codigo'=> '0302040', 'nombre'=> 'Fosfatasas Alcalinas', 'precio'=> 15000,'tipo_examens_id'=> 4]); 
        Examen::create(['codigo'=> '0302045', 'nombre'=> 'Gama GT (GGT)', 'precio'=> 15000,'tipo_examens_id'=> 4]); 
        Examen::create(['codigo'=> '0302063x2', 'nombre'=> 'G.O.T (A.S.A.T) GPT (A.L.A.T)', 'precio'=> 15000,'tipo_examens_id'=> 4]); 
        Examen::create(['codigo'=> '0302076', 'nombre'=> 'Hoja Hepatica Completa', 'precio'=> 15000,'tipo_examens_id'=> 4]); 
        Examen::create(['codigo'=> '0302100x2', 'nombre'=> 'Proteinas Rel A/G', 'precio'=> 15000,'tipo_examens_id'=> 4]); 
        Examen::create(['codigo'=> '0301059', 'nombre'=> 'T. Protrombina', 'precio'=> 15000,'tipo_examens_id'=> 4]); 
        Examen::create(['codigo'=> '1701001', 'nombre'=> 'E.C.G', 'precio'=> 15000,'tipo_examens_id'=> 4]); 











    }
}
