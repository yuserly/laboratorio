<script>
import simplebar from "simplebar-vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
    components: {
        simplebar
    },
    data() {
        return {
            modalContrasena: false,
            formPassword: {
                contrasena: "",
                repetir: ""
            },
            repetirValidar: false,
            btnContrasena: false,
            submitted: false,
            languages: [
                {
                    flag: require("../assets/images/flags/us.jpg"),
                    language: "en",
                    title: "English"
                },
                {
                    flag: require("../assets/images/flags/french.jpg"),
                    language: "fr",
                    title: "French"
                },
                {
                    flag: require("../assets/images/flags/spain.jpg"),
                    language: "es",
                    title: "spanish"
                },
                {
                    flag: require("../assets/images/flags/china.png"),
                    language: "zh",
                    title: "Chinese"
                },
                {
                    flag: require("../assets/images/flags/arabic.png"),
                    language: "ar",
                    title: "Arabic"
                }
            ],
            text: null,
            flag: null,
            value: null,
            nombre: ""
        };
    },
    validations: {
        formPassword: {
            contrasena: {
                required
            },
            repetir: {
                required
            }
        }
    },
    mounted() {
        if (localStorage.getItem("token")) {
            this.axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`;
        }

        if (localStorage.getItem("name")) {
            this.nombre = localStorage.getItem("name");
        }
    },

    methods: {
        /**
         * Toggle menu
         */
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        initFullScreen() {
            document.body.classList.toggle("fullscreen-enable");
            if (
                !document.fullscreenElement &&
                /* alternative standard method */
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement
            ) {
                // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(
                        Element.ALLOW_KEYBOARD_INPUT
                    );
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        },
        /**
         * Toggle rightsidebar
         */
        toggleRightSidebar() {
            this.$parent.toggleRightSidebar();
        },
        /**
         * Set languages
         */
        logout() {
            this.axios
                .post(`/api/logout`, [])
                .then(res => {
                    console.log(res);
                    if (res.data == 1) {
                        localStorage.clear();
                        this.$router.push("/login");
                    }
                })

                .catch(error => {
                    console.log("error", error);
                });
        },
        contrasena(){
            this.modalContrasena = true;
        },

        verificarContrasena() {
            if (
                this.formPassword.repetir.length == 0 &&
                this.formPassword.contrasena.length == 0
            ) {
                this.btnContrasena = false;
            } else if (
                this.formPassword.repetir == this.formPassword.contrasena
            ) {
                this.repetirValidar = false;
                this.btnContrasena = true;
            } else {
                this.repetirValidar = true;
                this.btnContrasena = false;
            }
        },

        formSubmitPassword() {
            this.axios
                .post(`/api/changepassword`, this.formPassword)
                .then(res => {

                    console.log(res.data)

                    if(res.data == 1){
                        Swal.fire({
                        icon: "success",
                        title: "Contraseña",
                        text: 'Contraseña actualiada exitosamente',
                        timer: 1500,
                        showConfirmButton: false
                        });
                    }else{
                        Swal.fire({
                        icon: "error",
                        title: "Contraseña",
                        text: 'Contraseña actualiada exitosamente',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    }

                    this.modalContrasena = false;
                    this.formPassword = {
                        contrasena: "",
                        repetir: ""
                    };
                    this.repetirValidar = false;
                    this.btnContrasena = false;
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }
};
</script>

<template>
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <!-- LOGO -->
                <div class="navbar-brand-box">
                    <router-link to="/" class="logo logo-dark">
                        <span class="logo-sm">
                            <img
                                src="/images/landing/logo.png"
                                alt="Logo"
                                height="22"
                            />
                        </span>
                        <span class="logo-lg">
                            <img
                                src="/images/landing/logoWeb2.jpeg"
                                alt="Logo"
                                height="20"
                            />
                        </span>
                    </router-link>

                    <router-link to="/" class="logo logo-light">
                        <span class="logo-sm">
                            <img
                                src="/images/landing/logo.png"
                                alt="Logo"
                                height="22"
                            />
                        </span>
                        <span class="logo-lg">
                            <img
                                src="/images/landing/logoWeb2.jpeg"
                                alt="Logo"
                                height="20"
                            />
                        </span>
                    </router-link>
                </div>

                <button
                    @click="toggleMenu"
                    type="button"
                    class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
                    id="vertical-menu-btn"
                >
                    <i class="fa fa-fw fa-bars"></i>
                </button>
            </div>

            <div class="d-flex">
                <b-dropdown
                    class="d-inline-block"
                    toggle-class="header-item"
                    right
                    variant="white"
                    menu-class="dropdown-menu-end"
                >
                    <template v-slot:button-content>
                        <span
                            class="d-xl-inline-block ms-1 fw-medium font-size-15"
                            >{{ nombre | uppercase }}</span
                        >
                        <i
                            class="uil-angle-down  d-xl-inline-block font-size-15"
                        ></i>
                    </template>

                    <!-- item-->
                    <a
                        class="dropdown-item"
                        style="cursor:pointer"
                        v-b-modal.cambiarcontrasena
                        v-on:click="contrasena()"
                        data-toggle="modal"
                        data-target=".bs-example-cambiarcontrasena"
                    >
                        <i
                            class="uil uil-user-circle font-size-18 align-middle text-muted me-1"
                        ></i>
                        <span class="align-middle">Cambiar Contraseña</span>
                    </a>

                    <button class="dropdown-item" @click="logout()">
                        <i
                            class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"
                        ></i>
                        <span class="align-middle">Salir</span>
                    </button>
                </b-dropdown>
            </div>
        </div>

        <!-- modal CAMBIAR CONTRASEÑA-->
        <b-modal
            id="cambiarcontrasena"
            size="lg"
            title="Cambiar Contraseña"
            title-class="font-18"
            hide-footer
            v-if="modalContrasena"
        >
            <form class="needs-validation" @submit.prevent="formSubmitPassword">
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="mb-3">
                            <label for="nombres">Nueva Contraseña</label>
                            <input
                                id="nombres"
                                v-model="formPassword.contrasena"
                                type="password"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        submitted &&
                                        $v.formPassword.contrasena.$error
                                }"
                            />

                            <div
                                v-if="
                                    submitted &&
                                        $v.formPassword.contrasena.$error
                                "
                                class="invalid-feedback"
                            >
                                <span
                                    v-if="!$v.formPassword.contrasena.required"
                                    >Debes ingresar contraseña.</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="mb-3">
                            <label for="apellidos">Repetir Contraseña</label>
                            <input
                                id="apellidos"
                                v-model="formPassword.repetir"
                                type="password"
                                class="form-control"
                                v-on:keyup="verificarContrasena()"
                                :class="{
                                    'is-invalid':
                                        submitted &&
                                        $v.formPassword.repetir.$error
                                }"
                            />
                            <div
                                v-if="
                                    submitted && $v.formPassword.repetir.$error
                                "
                                class="invalid-feedback"
                            >
                                <span v-if="!$v.formPassword.repetir.required"
                                    >Debes repetir contraseña.</span
                                >
                            </div>
                            <span class="text-danger" v-if="repetirValidar"
                                >Contraseña no coinciden.</span
                            >
                        </div>
                    </div>
                </div>

                <button
                    class="btn btn-success float-end"
                    type="submit"
                    v-if="btnContrasena"
                >
                    <i class="far fa-save"></i> Actualizar Contraseña
                </button>
            </form>
        </b-modal>
        <!-- modal -->
    </header>
</template>
