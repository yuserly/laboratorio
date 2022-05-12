<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{

    public function run()
    {

        Permission::create(['name' => 'Gestion Usuarios']); //1
        Permission::create(['name' => 'Crear Usuarios']); //2
        Permission::create(['name' => 'Editar Usuarios']); //3
        Permission::create(['name' => 'Estado Usuarios']); //4

        Permission::create(['name' => 'Gestionar Receta']); //5
        Permission::create(['name' => 'Crear Receta']); //6
        Permission::create(['name' => 'Editar Receta']); //7
        Permission::create(['name' => 'Estado Receta']); //8

        Permission::create(['name' => 'Gestion Tipo Examenes']); //9
        Permission::create(['name' => 'Crear Tipo Examenes']); //10
        Permission::create(['name' => 'Editar Tipo Examenes']); //11
        Permission::create(['name' => 'Estado Tipo Examenes']); //12

        Permission::create(['name' => 'Gestion Examenes']); //13
        Permission::create(['name' => 'Crear Examenes']); //14
        Permission::create(['name' => 'Editar Examenes']); //15
        Permission::create(['name' => 'Estado Examenes']); //16

        Permission::create(['name' => 'Gestion Orden Examenes']); //17
        Permission::create(['name' => 'Crear Orden Examenes']); //18
        Permission::create(['name' => 'Editar Orden Examenes']); //19
        Permission::create(['name' => 'Estado Orden Examenes']); //20
        Permission::create(['name' => 'Visualiza Orden Examenes']); //21


        Permission::create(['name' => 'Gestion Realizar Examenes']); //22

        Permission::create(['name' => 'Gestion Resultado de Examenes']); //23
        Permission::create(['name' => 'Imprimir Orden Examenes']); //24
        Permission::create(['name' => 'Imprimir Recetas']); //25


        Permission::create(['name' => 'Gestion Ventas']); //26
        Permission::create(['name' => 'Crear Ventas']); //27
        Permission::create(['name' => 'Pago Orden Examenes']); //28



        // CREADOR DE ROLES

        $role = Role::create(['name' => 'Administrador']);
        $role->syncPermissions([1,2,3,4,9,10,11,12,13,14,15,16]);

        $role = Role::create(['name' => 'Profesional Box']);
        $role->syncPermissions([5,6,7,8,13,17,18,19,20,21]);

        $role = Role::create(['name' => 'Profesional Laboratorio']);
        $role->syncPermissions([13,20,21,22]);

        $role = Role::create(['name' => 'Profesional Ejecutor']);
        $role->syncPermissions([13,20,21,23]);

        $role = Role::create(['name' => 'Secretaria']);
        $role->syncPermissions([13,17,18,19,20,21,24,25,28]);

    }
}
