import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";

import $ from "jquery";

export default {
    components: { Layout, PageHeader },

    page: {
        title: "Recetas",
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
            btnAccionBuscar: true,
            form: {
                rut: ""
            },
            submitted: false,
            existereceta: false,
            // tabla

            tableData: [],

            title: "Consultas",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Consultas",
                    active: true
                }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "nombres",
            sortDesc: false,
            fields: [
                {
                    key: "paciente.rut",
                    label: "RUT  ",
                    sortable: true
                },
                {
                    key: "paciente.nombres",
                    label: "Nombres",
                    sortable: true
                },
                {
                    key: "paciente.apellidos",
                    label: "Apellidos",
                    sortable: true
                },
                {
                    key: "profesional",
                    label: "Profesional",
                    sortable: true,
                    formatter: profesional => {
                        return `${profesional.nombres} ${profesional.apellidos}`;
                    }
                },

                {
                    key: "fecha",
                    label: "Fecha",
                    sortable: true
                },

                "action"
            ]
        };
    },

    validations: {
        form: {
            rut: {
                required
            }
        }
    },

    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length;
        }
    },

    mounted() {
        this.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;
        this.preloader = false;
    },

    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
           
        },

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
        },

        formSubmit() {
            this.submitted = true;
            this.$v.form.$touch();

            if (!this.$v.form.$invalid) {
                this.btnAccionBuscar = false;
                this.axios
                    .get(`/api/derivaciones/${this.form.rut}`)
                    .then(res => {
                        this.btnAccionBuscar = true;
                        if(res.data == 0)
                        {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Derivaciones',
                                text: "No se han encontrado derivaciones para este paciente",
                                timer: 2500,
                                showConfirmButton: false
                            });
                            this.tableData = "";
                            this.existereceta = false;
                        }else{ 
                            Swal.fire({
                                icon: 'success',
                                title: 'Derivaciones',
                                text: "Derivaciones encontradas",
                                timer: 1000,
                                showConfirmButton: false
                            });
                            this.tableData = res.data.derivacion;
                            this.existereceta = true;
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
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

        envioderivacion(data) {
            this.preloader = true;
            this.axios
                .get(`/api/envioderivacion/${data.codigo}`)
                .then(res => {
                    this.preloader = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Derivacion',
                        text: res.data.mensaje,
                        timer: 2500,
                        showConfirmButton: false
                    });
                })
                .catch(error => {
                    this.validarSessionActive(error);
                });
        }
    }
};
