import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import { required, email } from "vuelidate/lib/validators";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";

import $ from "jquery";

export default {
    components: { Layout, PageHeader, Multiselect, ckeditor: CKEditor.component, },

    page: {
        title: "Recetas ",
        meta: [
            { 
                name: "description",
                content: "Pagina de Recetas "
            }
        ]
    },

    data() {
        return {
            urlbackend: this.$urlBackend,
            preloader : true,
            btnAccionSubmit: true,
            form: {
                nombres: "",
                apellidos: "",
                rut:"",
                edad:"",
                fecha_nacimiento:"",
                email: "",
                telefono:"",
                fecha:"",
                diagnostico:"",
                preinscripcion:"",
                enviarSecretaria: "",
            },
            submitted: false,

            editor: ClassicEditor,

        }
    },

    validations: {

        form: {
            nombres: {
                required
            },
            apellidos: {
                required
            },
            rut:{
                required
            },
            edad:{
                required
            },
            fecha_nacimiento:{
                required
            },
            email: {
                required,
                email
            },
            telefono: {
                required
            },
            fecha: {
                required
            },
            diagnostico: {
                required
            },
            preinscripcion:{
                required
            }
        }
    },

    mounted() {
        this.preloader = false;
    },


    methods: {

        validarSessionActive(error)
        {
            if (error.response.status === 401) {
                localStorage.removeItem('name');
                localStorage.removeItem('token');
                localStorage.removeItem('permisos');
                this.$router.push({ name: 'login' })
            }
        },

        checkRut() {
            var valor = this.form.rut.replace(".", ""); // Quita Punto
            valor = valor.replace("-", ""); // Quita Gui??n
            var cuerpo = valor.slice(0, -1); // Aislar Cuerpo y D??gito Verificador
            var dv = valor.slice(-1).toUpperCase();
            this.form.rut = cuerpo + "-" + dv; // Formatear RUN

            if (cuerpo.length < 7) {
                // Si no cumple con el m??nimo de digitos ej. (n.nnn.nnn)
                $(".inputRUT").attr("style", "border-color: red !important");
                $(".btnSubmit").prop("disabled", true);
                return false;
            }

            var suma = 0; // Calcular D??gito Verificador
            var multiplo = 2;

            for (
                var i = 1;
                i <= cuerpo.length;
                i++ // Para cada d??gito del Cuerpo
            ) {
                var index = multiplo * valor.charAt(cuerpo.length - i); // Obtener su Producto con el M??ltiplo Correspondiente
                suma = suma + index; // Sumar al Contador General
                if (multiplo < 7) {
                    multiplo = multiplo + 1;
                } else {
                    multiplo = 2;
                } // Consolidar M??ltiplo dentro del rango [2,7]
            }

            var dvEsperado = 11 - (suma % 11); // Calcular D??gito Verificador en base al M??dulo 11
            dv = dv == "K" ? 10 : dv; // Casos Especiales (0 y K)
            dv = dv == 0 ? 11 : dv;

            if (dvEsperado != dv) {
                $(".inputRUT").attr("style", "border-color: red !important");
                $(".btnSubmit").prop("disabled", true);
                return false;
            } // Validar que el Cuerpo coincide con su D??gito Verificador

            $(".inputRUT").attr("style", "border-color: #40A944 !important"); // Si todo sale bien, eliminar errores (decretar que es v??lido)
            $(".btnSubmit").prop("disabled", false);

            this.validarrut();
        },

        validarrut() {
            this.preloader = true;
            this.axios
                .get(`/api/validarrutpaciente/${this.form.rut}`)
                .then(response => {
                    if (response.data) {
                        this.form.nombres = response.data.nombres;
                        this.form.apellidos = response.data.apellidos;
                        this.form.edad = response.data.edad;
                        this.form.fecha_nacimiento = response.data.fecha_nacimiento;
                        this.form.email = response.data.email;
                        this.form.telefono = response.data.telefono;
                        this.preloader = false;
                    }
                }, error => {
                     this.validarSessionActive(error);
                    return error;
                });
        },

        formSubmit() {
            this.submitted = true;
            this.$v.form.$touch();

            if (!this.$v.form.$invalid) {

                this.preloader = true;
                this.axios
                    .post(`/api/crearrecetas`, this.form)
                    .then(res => {
                        this.preloader = false;
                        if (res.data) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Nueva Receta',
                                text: "Ha sido emitida exitosamente",
                                timer: 1500,
                                showConfirmButton: false
                            });

                            this.submitted = false;
                            this.form.nombres = "";
                            this.form.apellidos = "";
                            this.form.edad = "";
                            this.form.fecha_nacimiento = "";
                            this.form.email = "";
                            this.form.telefono = "";
                            this.form.diagnostico= "";
                            this.form.preinscripcion = '';
                            this.form.enviarSecretaria = "";

                        }
                    })
                    .catch(error => {
                        this.validarSessionActive(error);

                        $.each(error.response.data.errors, function(
                            key,
                            value
                        ) {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 4000,
                                timerProgressBar: true,
                                didOpen: toast => {
                                    toast.addEventListener(
                                        "mouseenter",
                                        Swal.stopTimer
                                    );
                                    toast.addEventListener(
                                        "mouseleave",
                                        Swal.resumeTimer
                                    );
                                }
                            });

                            Toast.fire({
                                icon: "warning",
                                title: value[0]
                            });
                        });
                    });
            }
        },

    },

}
