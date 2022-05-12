import Vue from "vue";

export const menuItems = [
    {
        id: 1,
        label: "Administración",
        isTitle: true
    },
    {
        id: 3,
        label: "Gestión de Usuarios",
        icon: "uil-pricetag-alt",
        link: "/usuarios",
        permiso: "Gestion Usuarios"
    },
    {
        id: 4,
        label: "Gestión de Examenes",
        icon: "uil-building",
        permiso: "Gestion Examenes",
        subItems: [
            {
                id: 4.1,
                label: "Examenes",
                link: "/examenes",
                parentId: 4,
                permiso: "Gestion Examenes"
            },
            {
                id: 4.2,
                label: "Orden de Examenes",
                link: "/crear-orden",
                parentId: 4,
                permiso: "Crear Orden Examenes"
            },{
                id: 4.3,
                label: "Realizar Examenes",
                link: "/realizar-examenes",
                parentId: 4,
                permiso: "Gestion Realizar Examenes"
            }
            ,{
                id: 4.4,
                label: "Analizar Muestra",
                link: "/analizar-muestra",
                parentId: 4,
                permiso: "Gestion Realizar Examenes"
            },{
                id: 4.5,
                label: "Crear Examenes",
                link: "/crear-examenes",
                parentId: 4,
                permiso: "Crear Examenes"
            },{
                id: 4.6,
                label: "Orden Examen Pend. Pago",
                link: "/orden-pendiente-pago",
                parentId: 4,
                permiso: "Pago Orden Examenes"
            }
        ]
    },
    {
        id: 5,
        label: "Gestión de Recetas",
        icon: "uil-building",
        permiso: "Gestionar Receta",
        subItems: [
            {
                id: 5.1,
                label: "Crear Receta",
                link: "/crear-recetas",
                parentId: 5,
                permiso: "Crear Receta"
            },

            {
                id: 5.2,
                label: "Recetas",
                link: "/recetas",
                parentId: 5,
                permiso: "Gestionar Receta"
            },

        ]
    },

];
