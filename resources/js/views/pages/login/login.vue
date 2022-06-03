<script>
import Vue from "vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import $ from "jquery";
export default {
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
            submitted: false,
            accessValid: false
        };
    },
    validations: {
        form: {
            email: {
                email,
                required
            },
            password: {
                required
            }
        }
    },
    methods: {
        mostrarpass() {
            if ($(".icono-pass").hasClass("fa-eye-slash")) {
                $(".icono-pass").removeClass("fa-eye-slash");
                $(".icono-pass").addClass("fa-eye");
                $("#password").attr("type", "text");
            } else {
                $(".icono-pass").removeClass("fa-eye");
                $(".icono-pass").addClass("fa-eye-slash");
                $("#password").attr("type", "password");
            }
        },

        login() {
            $(".icono-pass").removeClass("fa-eye");
            $(".icono-pass").addClass("fa-eye-slash");
            $("#password").attr("type", "password");

            this.submitted = true;

            this.$v.$touch();

            if (!this.$v.$invalid) {
                this.axios
                    .post(`/api/login`, this.form)
                    .then(res => {

                        if (res.data == 0 || res.data == "0") {
                            this.accessValid=true;
                            /*
                            Swal.fire({
                                title: "Disculpe",
                                text: "Son datos ingresados son inválidos.",
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#18A096",
                                confirmButtonText: "Aceptar"
                            }).then(result => {});
                            */
                        } else {
                            this.accessValid=false;
                            localStorage.setItem("token", res.data.token);
                            localStorage.setItem("name", res.data.name);
                            localStorage.setItem("permisos", JSON.stringify(res.data.permisos));

                            this.$router.push("/home");
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
                    });
            }
        }
    }
};
</script>

<style>
/* body{
    
    background: url('https://a21.com.mx/sites/default/files/medicina%20de%20aviacio%CC%81n.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

} */

@font-face {
    font-family: fuente1;

    src: url("/fonts/Gotham-Bold.otf");
}

@font-face {
    font-family: fuente2;

    src: url("/fonts/AmazonEmber_Rg.ttf");
}
input{
    font-family: fuente2!important;
    font-size: 17px!important;
}
label, p, h1, h2, h3, h4, h5, h6, a, button{
    font-family:fuente1 !important;
}
.color-primario{
    color:#18A096 !important;
}
.bg-primario{
    background-color:#18A096 !important;
    border-color: #18A096 !important;
    outline:none !important;
}
.bg-primario:hover{
    background-color:#18A096 !important;
    border-color: #18A096 !important;
    outline:none !important;
}
.bg-primario:focus{
  outline: none !important;
  box-shadow: none !important;
}
.logoWeb {
    position: absolute;
    top: -80px;
    right: 0;
}
.invalid-feedback{
    color:red!important;
}
</style>

<template>
    <div>
        <br /><br /><br />

        <div class="account-pages my-4 pt-sm-4">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card">
                            <div class="card-body p-4">
                                <router-link
                                    to="/"
                                    class=" mb-3 d-block auth-logo"
                                >
                                    <img
                                        class="img-fluid logoWeb"
                                        src="/images/isotipo.png"
                                        alt=""
                                        width="120"
                                    />
                                </router-link>

                                <div class="text-center mt-2">
                                    <h1 class="color-primario">Bienvenido !</h1>
                                </div>

                                <div class="p-2 mt-4">
                                    <form
                                        class="needs-validation"
                                        @submit.prevent="login"
                                    >
                                        <div class="mb-3">
                                            <label for="email">Correo</label>

                                            <input
                                                type="text"
                                                class="form-control"
                                                id="email"
                                                placeholder="nombre@correo.com"
                                                v-model="form.email"
                                                :class="{
                                                    'is-invalid':
                                                        submitted &&
                                                        $v.form.email.$error
                                                }"
                                            />

                                            <div
                                                v-if="
                                                    submitted &&
                                                        $v.form.email.$error
                                                "
                                                class="invalid-feedback"
                                            >
                                                <span
                                                    v-if="
                                                        !$v.form.email.required
                                                    "
                                                    >Email requerido.</span
                                                >

                                                <span
                                                    v-if="!$v.form.email.email"
                                                    >Ingrese un email
                                                    válido.</span
                                                >
                                            </div>

                                            <div
                                                v-bind:class="[accessValid ? 'd-block' : 'd-none']"
                                                class="invalid-feedback"
                                            >

                                                <span>El Usuario o la Contraseña es inválida.</span>

                                            </div>

                                        </div>

                                        <div class="mb-3">
                                            <label for="password"
                                                >Contraseña</label
                                            >

                                            <div class="input-group">
                                                <input
                                                    type="password"
                                                    class="form-control"
                                                    id="password"
                                                    v-model="form.password"
                                                    placeholder="**********"
                                                    :class="{
                                                        'is-invalid':
                                                            submitted &&
                                                            $v.form.password
                                                                .$error
                                                    }"
                                                />

                                                <div
                                                    class="input-group-prepend d-flex"
                                                >
                                                    <div
                                                        class="input-group-text"
                                                    >
                                                        <i
                                                            class="icono-pass far fa-eye-slash"
                                                            @click="mostrarpass"
                                                        ></i>
                                                    </div>
                                                </div>

                                                <div
                                                    v-if="
                                                        submitted &&
                                                            $v.form.password
                                                                .$error
                                                    "
                                                    class="invalid-feedback"
                                                >
                                                    <span
                                                        v-if="
                                                            !$v.form.password
                                                                .required
                                                        "
                                                        >Contraseña
                                                        requerida.</span
                                                    >
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-3 text-end">
                                            <button
                                                class="btn btn-primary w-sm waves-effect waves-light bg-primario"
                                                type="submit"
                                            >
                                                <i
                                                    class="mdi mdi-login-variant"
                                                ></i>

                                                Ingresar
                                            </button>
                                        </div>

                                        <!-- <div class="float-left">
                                            <router-link
                                                to="/validar-email"
                                                class="text-muted"
                                            >
                                                Olvidó su
                                                contraseña</router-link
                                            >
                                        </div> -->

                                        <hr />
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="mt-5 text-center">
                            <p>
                                © {{ new Date().getFullYear() }} <small>Desarrollado por <a href="https://cento.cl" target="blank"> <b> CENTO - Servicios Informáticos. </b></a></small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
