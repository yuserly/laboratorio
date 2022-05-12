<script>

import { required, email, sameAs} from "vuelidate/lib/validators";

export default {

    data() {
        return {

            form: {
                email: ''
            },
            form2: {
                email: '',
                codigo: '',
                password: ''
            },
            submitted: false,
            submitted2: false,
            mostrarAlert: false,
            mostrarReset: false,
            ErrorEmail: false,
            CodInvalid: false,
            textoAlert: 'Disculpe, Email no encontrado.',
            errorClass: 'alert-danger',
            validClass: 'alert-success',
            buttonCargando: false,
            buttonContinuar: true

        }
    },
    validations: {
        form: {
            email: {
                email,
                required,
            }
        },
        form2: {
            email: {
                email,
                required,
            },
            codigo: {
                required
            },
            password: { required },
            confirmPassword: { required, sameAsPassword: sameAs('password') }
        },
    },
    methods: {

        onlyNumber ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                $event.preventDefault();
            }
        },

        enviar() {

            this.submitted2 = true;

            this.$v.form2.$touch();

            this.buttonContinuar = false;

            this.buttonCargando = true;
            
            if (!this.$v.form2.$invalid) {
                this.axios
                    .post(`/api/cambiar-password`, this.form2)
                    .then(res => {
                        console.log(res);
                        if(res.data==1){
                            
                            this.buttonContinuar = true;
                            this.buttonCargando = false;

                            this.textoAlert = "Contraseña cambiada exitosamente."
                            this.mostrarAlert= true;
                            setTimeout(() => {
                                
                                this.$router.push('/login');

                            }, 100);
                            this.CodInvalid = false;
                             
                        }else if(res.data==0){
                            this.buttonContinuar = true;
                            this.buttonCargando = false;
                            this.textoAlert = "Disculpe, ocurrio un error."
                            this.mostrarAlert= true;
                            
                        }else{
                            this.buttonContinuar = true;
                            this.buttonCargando = false;
                            this.textoAlert = "Disculpe, el código ingresado es inválido."
                            this.mostrarAlert= true;
                            this.CodInvalid = true;
                        }

                    })
                    .catch(error => {
                        console.log("error", error);
                    });
            }
                
            
        },

        validar() {

            this.submitted = true;

            this.$v.form.$touch();

            if (!this.$v.form.$invalid) {
                this.axios
                    .post(`/api/validar-email`, this.form)
                    .then(res => {
                        console.log(res);

                        if(res.data==1){
                            this.mostrarAlert= true;
                            this.textoAlert = "Hemos enviado un código de validación a su correo."
                            setTimeout(() => {
                                this.mostrarReset= true; 
                            }, 100);
                            
                            this.form2.email = this.form.email;
                                
                        }else{
                            this.mostrarAlert= true;
                            this.ErrorEmail= true;
                        }
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

input{
    font-family: fuente2!important;
    font-size: 17px!important;
}
label, p, h1, h2, h3, h4, h5, h6, a, button{
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
.logoWeb{
  position:absolute;
  top:-80px;
  right:0;
}
.invalid-feedback{
    color:red!important;
}
.mostrar{
    display:block!important;
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

                    <div class="alert" v-bind:class="[ErrorEmail ? errorClass : validClass, mostrarAlert ? 'd-block' : 'd-none']" role="alert">
                        <p>{{textoAlert}}</p>
                    </div>

                    <form class="needs-validation" @submit.prevent="validar" v-if="mostrarReset!=1">
                        
                        

                        <div class="form-group row p-1">
                            
                            <label for="email" class="col-md-4 col-form-label text-md-right">Ingresa tu email</label>

                                <div class="col-md-6">

                                    <input
                                        type="text"
                                        class="form-control"
                                        id="email"
                                        placeholder="tuemail@lodevuelvo.cl"
                                        v-model="form.email"
                                        :class="{
                                        'is-invalid': submitted && $v.form.email.$invalid,
                                        }"
                                    />

                                    <div
                                        v-if="submitted && $v.form.email.$invalid"
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
                        <div class="form-group row mb-0 mt-3">

                            <div class="col-md-6 offset-md-4">

                                <button type="submit" class="btn btn-primary w-sm waves-effect waves-light bg-primario" style="float:right!important;" v-if="buttonContinuar==1">
                                    Continuar
                                </button>

                                <button type="submit" class="btn btn-primary w-sm waves-effect waves-light bg-primario" style="float:right!important;" v-if="buttonCargando==1" disabled>
                                    <div class="spinner-border text-light" role="status" style="width: 15px;height: 15px;">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    Validando Código 
                                </button>

                            </div>

                        </div>

                </form>

                <form class="needs-validation" @submit.prevent="enviar" v-else>
                    
                        
                        <div class="form-group row p-1">
                            
                            <label for="email" class="col-md-4 col-form-label text-md-right">Ingresa tu email</label>

                                <div class="col-md-6">

                                    <input
                                        type="text"
                                        class="form-control"
                                        id="email"
                                        disabled
                                        placeholder="tuemail@lodevuelvo.cl"
                                        v-model="form2.email"
                                        :class="{
                                        'is-invalid': submitted2 && $v.form2.email.$invalid,
                                        }"
                                    />

                                    <div
                                        v-if="submitted2 && $v.form2.email.$invalid"
                                        class="invalid-feedback"
                                    >

                                        <span v-if="!$v.form2.email.required"
                                        >Email requerido.</span
                                        >

                                        <span v-if="!$v.form2.email.email"
                                        >Ingrese un email valido.</span
                                        >

                                    </div>
                                
                                </div>

                        </div>
                        
                        
                        <div class="form-group row p-1">
                            
                                <label for="email" class="col-md-4 col-form-label text-md-right">Ingresa tu Código de verificación</label>

                                    <div class="col-md-6">

                                        <input
                                            type="text"
                                            class="form-control"
                                            id="cod"
                                            maxlength="6"
                                            minlength="6"
                                            
                                            v-model="form2.codigo"
                                            :class="{
                                            'is-invalid': submitted2 && $v.form2.codigo.$invalid,
                                            }"
                                        />

                                        <div
                                            v-if="submitted2 && $v.form2.codigo.$invalid"
                                            class="invalid-feedback"
                                        >

                                            <span v-if="!$v.form2.codigo.required"
                                            >Código requerido.</span>

                                        </div>

                                        <div
                                            v-bind:class="[CodInvalid ? 'd-block' : 'd-none']"
                                            class="invalid-feedback"
                                        >

                                            <span>Código inválido (máximo 6 caracteres).</span>

                                        </div>
                                    
                                    </div>

                            </div>

                            <div class="form-group row p-1">

                                <label for="password" class="col-md-4 col-form-label text-md-right">Ingresa tu nueva contraseña</label>

                                <div class="col-md-6">

                                    <input id="password" 
                                            type="password" 
                                            class="form-control" 
                                            name="password" 
                                            autocomplete="nueva contraseña" 
                                            ref="password" 
                                            v-model="form2.password"
                                            :class="{
                                            'is-invalid': submitted2 && $v.form2.password.$invalid,
                                            }"
                                    >

                                    <div v-if="submitted2 && $v.form2.password.$invalid" class="invalid-feedback">

                                        <span v-if="!$v.form2.password.required">Contraseña requerida.</span>

                                    </div>

                                </div>

                            </div>

                            <div class="form-group row p-1" >

                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirmar tu nueva contraseña</label>

                                <div class="col-md-6">
                                
                                    <input id="password-confirm" 
                                            type="password" 
                                            class="form-control" 
                                            name="password-confirm" 
                                            autocomplete="nueva contraseña" 
                                            v-model="form2.confirmPassword"
                                            :class="{
                                            'is-invalid': submitted2 && $v.form2.confirmPassword.$invalid,
                                            }"
                                    >

                                    <div v-if="submitted2 && $v.form2.confirmPassword.$invalid" class="invalid-feedback">

                                        <span v-if="!$v.form2.confirmPassword.sameAsPassword">La contraseña no coincide.</span>

                                    </div>


                                </div>

                            </div>

                            <div class="form-group row mb-0 mt-3">

                            <div class="col-md-6 offset-md-4">

                                <button type="submit" class="btn btn-primary w-sm waves-effect waves-light bg-primario" style="float:right!important;" v-if="buttonContinuar==1">
                                    Continuar
                                </button>

                                <button type="submit" class="btn btn-primary w-sm waves-effect waves-light bg-primario" style="float:right!important;" v-if="buttonCargando==1" disabled>
                                    <div class="spinner-border text-light" role="status" style="width: 15px;height: 15px;">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    Validando Código 
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

              </div>

            </div>

            <div class="mt-5 text-center">
                <p>&copy; {{ new Date().getFullYear() }} LODEVUELVO.CL</p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
  
</template>

