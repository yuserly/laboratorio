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
        title: "Consultas ",
        meta: [
            { 
                name: "description",
                content: "Pagina de Consultas "
            }
        ]
    },

    data() {
        return {
            urlbackend: this.$urlBackend,
            form: {
                nombres: "",
                apellidos: "",
                rut:"",
                edad:"",
                fecha_nacimiento:"",
                email: "",
                telefono:"",
                fecha:"",
                motivo:"",
                enviarMail: "",
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
            motivo: {
                required
            },
            anamnesis:{
                required
            }
        }
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
            valor = valor.replace("-", ""); // Quita Guión
            var cuerpo = valor.slice(0, -1); // Aislar Cuerpo y Dígito Verificador
            var dv = valor.slice(-1).toUpperCase();
            this.form.rut = cuerpo + "-" + dv; // Formatear RUN

            if (cuerpo.length < 7) {
                // Si no cumple con el mínimo de digitos ej. (n.nnn.nnn)
                $(".inputRUT").attr("style", "border-color: red !important");
                $(".btnSubmit").prop("disabled", true);
                return false;
            }

            var suma = 0; // Calcular Dígito Verificador
            var multiplo = 2;

            for (
                var i = 1;
                i <= cuerpo.length;
                i++ // Para cada dígito del Cuerpo
            ) {
                var index = multiplo * valor.charAt(cuerpo.length - i); // Obtener su Producto con el Múltiplo Correspondiente
                suma = suma + index; // Sumar al Contador General
                if (multiplo < 7) {
                    multiplo = multiplo + 1;
                } else {
                    multiplo = 2;
                } // Consolidar Múltiplo dentro del rango [2,7]
            }

            var dvEsperado = 11 - (suma % 11); // Calcular Dígito Verificador en base al Módulo 11
            dv = dv == "K" ? 10 : dv; // Casos Especiales (0 y K)
            dv = dv == 0 ? 11 : dv;

            if (dvEsperado != dv) {
                $(".inputRUT").attr("style", "border-color: red !important");
                $(".btnSubmit").prop("disabled", true);
                return false;
            } // Validar que el Cuerpo coincide con su Dígito Verificador

            $(".inputRUT").attr("style", "border-color: #40A944 !important"); // Si todo sale bien, eliminar errores (decretar que es válido)
            $(".btnSubmit").prop("disabled", false);

            this.validarrut();
        },

        validarrut() {
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

                this.axios
                    .post(`/api/crearconsultas`, this.form)
                    .then(res => {
                        
                        if (res.data) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Consulta',
                                text: "Ha sido ingresada exitosamente",
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
                            this.form.motivo= "";
                            this.form.anamnesis = '';

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
