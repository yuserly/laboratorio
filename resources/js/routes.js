import Vue from "vue";
import VueRouter from "vue-router";
import Permissions from "./Permissions.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "mantenimiento",
        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/login/login.vue"
            ),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/home",
        name: "home",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/dashboard/index.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/usuarios",
        name: "usuarios",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/usuarios/usuarios.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/crear-examenes",
        name: "crear-examenes",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/crear-examenes.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/historial-ordenes",
        name: "historial-ordenes",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/historial-ordenes.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/crear-orden",
        name: "crear-orden",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/crear-orden.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/realizar-examenes",
        name: "realizar-examenes",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/toma-muestra.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/historial-muestras",
        name: "historial-muestras",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/historial-muestras.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/analizar-muestra",
        name: "analizar-muestra",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/analizar-muestra.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/aceptar-analisis",
        name: "aceptar-analisis",
        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/aceptar-analisis.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/registro-venta-administracior",
        name: "registro-venta-administracior",
        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/ventas/registro-administracion.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/historial-analisis",
        name: "historial-analisis",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/historial-analisis.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/orden-pendiente-pago",
        name: "orden-pendiente-pago",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/ordenes-pendiente-pago.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/crear-recetas",
        name: "crear-recetas",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/recetas/crear_recetas.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/recetas",
        name: "recetas",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/recetas/listar_recetas.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/crear-consultas",
        name: "crear-consultas",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/consultas/crear_consultas.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/consultas",
        name: "consultas",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/consultas/listar_consultas.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/crear-derivacion",
        name: "crear-derivacion",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/derivacion/crear_derivacion.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/derivacion",
        name: "derivacion",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/derivacion/listar_derivacion.vue"
            ),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/login",
        name: "login",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/login/login.vue"
            ),
        meta: {
            requiresAuth: false
        }
    },

    {
        path: "/registro-venta",
        name: "registro-venta",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/ventas/registro-venta.vue"
            ),
        meta: {
            requiresAuth: false
        }
    },

    {
        path: "/solicitud_rechazada",
        name: "solicitud_rechazada",

        component: () =>
            /* webpackChunkName: "home" */ import(
                "./views/pages/examenes/solicitud_rechazada.vue"
            ),
        meta: {
            requiresAuth: false
        }
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    }
});

router.beforeEach((to, from, next) => {
    //A Logged-in user can't go to login page again
    if (to.name === "login" && localStorage.getItem("token")) {
        //   let rol = atob(localStorage.getItem('cm9s'));

        router.push({
            name: "home"
        });

        //the route requires authentication
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem("token")) {
            //user not logged in, send them to login page
            router.push({
                name: "login",
                query: {
                    to: to.name
                }
            });
        } else {
            if (!hasAccess(to.name)) {
                //   let rol = atob(localStorage.getItem('cm9s'));

                router.push({
                    name: "home"
                });

                // if (localStorage.getItem("plolpo")) {
                //     perfil = localStorage.getItem("plolpo");
                // }

                // if(perfil && perfil == "superadministrador"){

                //     router.push({
                //         name: "home"
                //     });
                // }else{

                //     router.push({
                //         name: "scanear"
                //     });
                // }
            }
        }
    }

    return next();
});

function hasAccess(name) {
    switch (name) {
        case "mantenimiento":
            return true;
        case "home":
            return true;

        case "usuarios":
            return Permissions.methods.$can("Gestion Usuarios");

        case "crear-examenes":
            return Permissions.methods.$can("Crear Examenes");

        case "historial-ordenes":
                return Permissions.methods.$can("Gestion Examenes");
    
        case "crear-orden":
            return Permissions.methods.$can("Crear Orden Examenes");

        case "realizar-examenes":
            return Permissions.methods.$can("Gestion Realizar Examenes");

        case "analizar-muestra":
            return Permissions.methods.$can("Gestion Analizar Examenes");

        case "historial-analisis":
            return Permissions.methods.$can("Gestion Analizar Examenes");
        
        case "aceptar-analisis":
            return Permissions.methods.$can("Gestion Analizar Examenes");

        case "historial-muestras":
            return Permissions.methods.$can("Gestion Realizar Examenes");

        case "orden-pendiente-pago":
                    return Permissions.methods.$can("Pago Orden Examenes");
        case "crear-recetas":
            return Permissions.methods.$can("Crear Receta");

        case "recetas":
            return Permissions.methods.$can("Gestionar Receta");

        case "crear-consultas":
                return Permissions.methods.$can("Crear Consulta");
    
        case "consultas":
                return Permissions.methods.$can("Gestionar Consulta");

        case "crear-derivacion":
                return Permissions.methods.$can("Crear Derivacion");
    
        case "derivacion":
                return Permissions.methods.$can("Gestionar Derivacion");
                
        case "registro-venta":
                return Permissions.methods.$can("Gestionar Ventas");

        case "registro-venta-administracior":
                return Permissions.methods.$can("Registro Venta Administrador");

        case "login":
            return true;

        case "reset-pass":
            return true;

        case "ventas":
            return true;

        case "crear ventas":
            return true;

        default:
            return false;
    }
}

export default router;
