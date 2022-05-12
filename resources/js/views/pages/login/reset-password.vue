<script>

import { required, email, sameAs} from "vuelidate/lib/validators";

export default {

    data() {
        return {

            form: {
                email: '',
                password: ''
            },
            submitted: false,
            mostrarAlert: false

        }
    },
    validations: {
        form: {
            email: {
                email,
                required,
            },
            password: { required },
            confirmPassword: { required, sameAsPassword: sameAs('password') }
        },
    },
    methods: {

        changePass() {

            this.submitted = true;

            this.$v.$touch();

            if (!this.$v.$invalid) {

                this.axios
                    .post(`/api/cambiar-password`, this.form)
                    .then(res => {
                        console.log(res);
                        if(res.data==1){
                            this.form.email = '';
                            this.mostrarAlert= true;
                        }else{
                            this.mostrarAlert= false;
                        }
                        


                        /*
                        if (res.data == 0 || res.data == "0") {
                            Swal.fire({
                                title: "Disculpe",
                                text: "Son datos ingresados son inválidos.",
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#04d494",
                                confirmButtonText: "Aceptar"
                            }).then(result => {});
                        } else {
                            localStorage.setItem("token", res.data.token);
                            localStorage.setItem("name", res.data.name);
                            localStorage.setItem("plolpo", res.data.perfil);

                            if (res.data.perfil === "superadministrador") {
                                Vue.prototype.$superadmin = true;
                                this.$router.push("home");
                            } else {
                                Vue.prototype.$superadmin = false;
                                this.$router.push("scanear");
                            }
                        }

                        */
                    })
                    .catch(error => {
                        console.log("error", error);
                    });

            }
                
            
        }
        

    }

}


</script>


<style>
@font-face {
    font-family: fuente1;

    src: url("/fonts/Gotham-Bold.otf");
}

@font-face {
    font-family: fuente2;

    src: url("/fonts/AmazonEmber_Rg.ttf");
}

*{
    font-family:fuente1 !important;
}
.color-primario{
    color:#04d494 !important;
}
.bg-primario{
    background-color:#04d494 !important;
    border-color: #04d494 !important;
    outline:none !important; 
}
.bg-primario:hover{
    background-color:#04d494 !important;
    border-color: #04d494 !important;
    outline:none !important; 
}
.bg-primario:focus{
  outline: none !important;
  box-shadow: none !important;
}
input{
    font-family: fuente2!important;
    font-size: 17px!important;
}
label, p, h1, h2, h3, h4, h5, h6, a, button{
    font-family:fuente1 !important;
}
.logoWeb{
  position:absolute;
  top:-80px;
  right:0;
}
</style>



<template>

  <div>

    <br><br><br>
  
    <div class="account-pages my-4 pt-sm-4">

      <div class="container">

        <div class="row align-items-center justify-content-center">

          <div class="col-md-10 col-lg-9 col-xl-9">

            <div class="card">

              <div class="card-body p-4">

                <router-link to="/" class="mb-3 d-block auth-logo">

                  <img
                    class="logoWeb"
                    src="https://desarrollo.lodevuelvo.cl/images/logo.png"
                    alt=""
                    width="120"
                    
                  />

                </router-link>

                <div class="text-center">

                  <h4 class="color-primario">Restablecimiento de contraseña</h4>

                </div>

                <div class="p-2 mt-4">

                    <form class="needs-validation" @submit.prevent="changePass">
                        
                        <div class="alert alert-success" v-bind:class="[mostrarAlert ? 'd-block' : 'd-none']" role="alert">
                            Contraseña actualizada correctamente
                        </div>

                        <div class="form-group row p-1">
                            
                            <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                                <div class="col-md-6">

                                    <input
                                        type="text"
                                        class="form-control"
                                        id="email"
                                        placeholder="usuario@correo.com"
                                        v-model="form.email"
                                        :class="{
                                        'is-invalid': submitted && $v.form.email.$error,
                                        }"
                                    />

                                    <div
                                        v-if="submitted && $v.form.email.$error"
                                        class="invalid-feedback"
                                    >

                                        <span v-if="!$v.form.email.required"
                                        >Email requerido.</span
                                        >

                                        <span v-if="!$v.form.email.email"
                                        >Ingrese un email valido.</span
                                        >

                                    </div>
                                
                                </div>

                            </div>

                            <div class="form-group row p-1">
                            
                            <label for="email" class="col-md-4 col-form-label text-md-right">Código de verificación</label>

                                <div class="col-md-6">

                                    <input
                                        type="text"
                                        class="form-control"
                                        id="cod"
                                        
                                        v-model="form.cod"
                                        :class="{
                                        'is-invalid': submitted && $v.form.cod.$error,
                                        }"
                                    />

                                    <div
                                        v-if="submitted && $v.form.cod.$error"
                                        class="invalid-feedback"
                                    >

                                        <span v-if="!$v.form.cod.required"
                                        >Código requerido.</span
                                        >

                            

                                    </div>
                                
                                </div>

                            </div>

                            <div class="form-group row p-1">

                                <label for="password" class="col-md-4 col-form-label text-md-right">Nueva contraseña</label>

                                <div class="col-md-6">

                                    <input id="password" 
                                            type="password" 
                                            class="form-control" 
                                            name="password" 
                                            autocomplete="nueva contraseña" 
                                            ref="password" 
                                            v-model="form.password"
                                            :class="{
                                            'is-invalid': submitted && $v.form.password.$error,
                                            }"
                                    >

                                    <div v-if="submitted && $v.form.password.$error" class="invalid-feedback">

                                        <span v-if="!$v.form.password.required">Contraseña requerida.</span>

                                    </div>

                                </div>

                            </div>

                            <div class="form-group row p-1">

                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirmar nueva contraseña</label>

                                <div class="col-md-6">
                                
                                    <input id="password-confirm" 
                                            type="password" 
                                            class="form-control" 
                                            name="password-confirm" 
                                            autocomplete="nueva contraseña" 
                                            v-model="form.confirmPassword"
                                            :class="{
                                            'is-invalid': submitted && $v.form.confirmPassword.$error,
                                            }"
                                    >

                                    <div v-if="submitted && $v.form.confirmPassword.$error" class="invalid-feedback">

                                        <span v-if="!$v.form.confirmPassword.sameAsPassword">La contraseña no coincide.</span>

                                    </div>


                                </div>

                            </div>

                            <div class="form-group row mb-0 mt-3">

                                <div class="col-md-6 offset-md-4">

                                    <button type="submit" class="btn btn-primary w-sm waves-effect waves-light bg-primario" style="float:right!important;">
                                        
                                        Cambiar

                                    </button>

                                </div>

                            </div>

                            </form>

                </div>

              </div>

            </div>

            <div class="mt-5 text-center">
                <p>© {{ new Date().getFullYear() }} &copy; 2021 LODEVUELVO.CL</p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
  
</template>

