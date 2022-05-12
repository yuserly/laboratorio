<script>
import simplebar from "simplebar-vue";
import { required, email } from "vuelidate/lib/validators";
export default {
    components: {
        simplebar
    },
    data() {
        return {
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
                    <a class="dropdown-item" href="#">
                        <i
                            class="uil uil-user-circle font-size-18 align-middle text-muted me-1"
                        ></i>
                        <span class="align-middle">Perfil</span>
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
    </header>
</template>
