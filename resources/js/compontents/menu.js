import Vue from "vue";

export const menuItems = [
    {
        id: 1,
        label: "Administración",
        isTitle: true
    },
    {
        id: 3,
        label: "Gestión Usuarios",
        icon: "uil-users-alt",
        link: "/usuarios",
        permiso: "Gestion Usuarios"
    },
    {
        id: 4,
        label: "Gestión Examenes",
        icon: "uil-cell",
        permiso: "Gestion Examenes",
        subItems: [
            {
                id: 4.5,
                label: "Inscribir Examenes",
                link: "/crear-examenes",
                parentId: 4,
                permiso: "Crear Examenes"
            },
            {
                id: 4.2,
                label: "Nueva Orden",
                link: "/crear-orden",
                parentId: 4,
                permiso: "Crear Orden Examenes"
            },
            {
                id: 4.1,
                label: "Historial Ordenes",
                link: "/historial-ordenes",
                parentId: 4,
                permiso: "Gestion Examenes Historial"
            },
            {
                id: 4.8,
                label: "Aceptar Analisis",
                link: "/aceptar-analisis",
                parentId: 4,
                permiso: "Gestion Analizar Examenes"
            },
            {
                id: 4.3,
                label: "Realizar Examenes",
                link: "/realizar-examenes",
                parentId: 4,
                permiso: "Gestion Realizar Examenes"
            },
            {
                id: 4.7,
                label: "Historial Muestras",
                link: "/historial-muestras",
                parentId: 4,
                permiso: "Gestion Realizar Examenes"
            },
            {
                id: 4.4,
                label: "Analizar Muestra",
                link: "/analizar-muestra",
                parentId: 4,
                permiso: "Gestion Analizar Examenes"
            },
            {
                id: 4.7,
                label: "Historial Analisis",
                link: "/historial-analisis",
                parentId: 4,
                permiso: "Gestion Analizar Examenes"
            },
            {
                id: 4.6,
                label: "Pendiente de Pago",
                link: "/orden-pendiente-pago",
                parentId: 4,
                permiso: "Pago Orden Examenes"
            },

        ]
    },
    {
        id: 5,
        label: "Gestión Recetas",
        icon: "uil-file-plus",
        permiso: "Gestionar Receta",
        subItems: [
            {
                id: 5.1,
                label: "Nueva Receta",
                link: "/crear-recetas",
                parentId: 5,
                permiso: "Crear Receta"
            },

            {
                id: 5.2,
                label: "Historial",
                link: "/recetas",
                parentId: 5,
                permiso: "Gestionar Receta"
            },

        ]
    },
    {
        id: 6,
        label: "Gestión Consultas",
        icon: "uil-comment-message",
        permiso: "Gestionar Consulta",
        subItems: [
            {
                id: 6.1,
                label: "Nueva Consulta",
                link: "/crear-consultas",
                parentId: 6,
                permiso: "Crear Consulta"
            },

            {
                id: 6.2,
                label: "Historial",
                link: "/consultas",
                parentId: 6,
                permiso: "Gestionar Consulta"
            },

        ]
    },

    {
        id: 7,
        label: "Gestión Derivacion",
        icon: "uil-share",
        permiso: "Gestionar Derivacion",
        subItems: [
            {
                id: 7.1,
                label: "Nueva Derivación",
                link: "/crear-derivacion",
                parentId: 7,
                permiso: "Crear Derivacion"
            },

            {
                id: 7.2,
                label: "Historial",
                link: "/derivacion",
                parentId: 7,
                permiso: "Gestionar Derivacion"
            },

        ]
    },

    {
        id: 8,
        label: "Gestión Ventas",
        icon: "uil-bill",
        permiso: "Gestionar Ventas",
        subItems: [
            {
                id: 8.1,
                label: "Registro Venta",
                link: "/registro-venta",
                parentId: 8,
                permiso: "Registro Venta Secretaria"
            },
            {
                id: 8.2,
                label: "Registro Venta",
                link: "/registro-venta-administracior",
                parentId: 8,
                permiso: "Registro Venta Administrador"
            },

        ]
    },

];
