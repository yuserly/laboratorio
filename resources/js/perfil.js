import Vue from "vue";
export function perfil() {
    if (localStorage.getItem("plolpo")) {
        var perfil = localStorage.getItem("plolpo");

        if (perfil && perfil == "superadministrador") {
            Vue.prototype.$superadmin = true;
        } else {
            Vue.prototype.$superadmin = false;
        }
    }
}
