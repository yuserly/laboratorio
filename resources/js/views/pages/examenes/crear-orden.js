import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";

import $ from "jquery";

export default {
    components: { Layout, PageHeader, Multiselect},

    page: {
        title: "Orden Examenes",
        meta: [
            {
                name: "description",
                content: "Pagina de Orden Examenes "
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
                examen:"",
                id_orden_examenes:"",
                enviar:true
            },
            options:[],
            submitted: false,
            disable: false,
            btnCreate:true,
            modal:false,
            examenes:[],
            titlemodal:"",

            ordenpaciente:false,
            ordenesexamenpaciente:'',
            paciente:'',
            // scroll
            scTimer: 0,
            scY: 0,

            // tabla

            tableData: [],

            title: "Recetas",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Recetas",
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

                    key: "codigo",
                    sortable: true

                },
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
                    key: "fecha",
                    label: "Fecha",
                    sortable: true
                },

                "action"
            ]
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
            examen: {
                required
            },
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
        window.addEventListener('scroll', this.handleScroll);

        this.traerExamen();
        this.traerOrden();

        this.totalRows = this.items.length;
    },

    methods: {

        handleScroll: function () {
            if (this.scTimer) return;
            this.scTimer = setTimeout(() => {
              this.scY = window.scrollY;
              clearTimeout(this.scTimer);
              this.scTimer = 0;
            }, 100);
          },
          toTop: function () {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          },
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

            this.validarrut();
        },

        traerExamen() {
            this.axios
                .get(`/api/obtenerexamen`)
                .then(response => {
                    console.log(response);
                    this.options= response.data;
                }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
        },

        traerOrden() {
            this.axios
                .get(`/api/showxeditar`)
                .then(response => {
                    console.log(response);
                    this.tableData = response.data;
                }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
        },

        traerordenpaciente(){
            this.axios
                .get(`/api/traerordenpaciente/${this.form.rut}`)
                .then(response => {
                    if (response.data.length > 0) {
                        console.log(response.data)

                        this.ordenesexamenpaciente = response.data;
                        this.paciente = `${this.form.nombres} ${this.form.apellidos}`;
                        this.ordenpaciente = true;

                    }else{
                        this.ordenpaciente = false;

                    }
                }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
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

                        this.traerordenpaciente();
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

                this.disable = true;

                this.axios
                    .post(`/api/crearordenexamen`, this.form)
                    .then(res => {

                        console.log(res)
                        if (res.data) {

                            if (this.form.id_orden_examenes == "") {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Orden de Examenes',
                                    text: "Ha sido emitida exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            } else {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Orden de Examen Actualizada',
                                    text: "Ha sido actualizada exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            }
                        }

                        this.btnCreate = true;
                        this.submitted = false;
                        this.disable = false
                        this.form = {
                            nombres: "",
                            apellidos: "",
                            rut:"",
                            edad:"",
                            fecha_nacimiento:"",
                            email: "",
                            telefono:"",
                            fecha:"",
                            examen:"",
                            id_orden_examenes:"",
                            enviar:true
                        },
                        this.traerOrden();
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

        addexamenes(data){

            if(this.form.examen){

                if(this.form.examen.length > 0){

                    var existe = false;
                    this.form.examen.forEach(element => {
                        if(element.id_examen == data.id_examen){
                            existe = true;
                        }
                    });

                    if(!existe){
                        this.form.examen.push(data);
                    }

                }else{

                    var examen = this.form.examen;

                    var examenes = [];

                    examenes.push(examen);

                    examenes.push(data);

                    this.form.examen = examenes;

                }

            }else{


                this.form.examen = data;
            }

        },

        editar(data) {

            this.btnCreate = false;
            this.form.id_orden_examenes = data.id_orden_examenes;
            this.form.rut = data.paciente.rut;
            this.form.nombres = data.paciente.nombres;
            this.form.apellidos = data.paciente.apellidos;
            this.form.fecha_nacimiento = data.paciente.fecha_nacimiento;
            this.form.edad = data.paciente.edad;
            this.form.email = data.paciente.email;
            this.form.telefono = data.paciente.telefono;
            this.form.fecha = data.fecha;
            this.form.enviar = true;
            let examenes = [];

            data.examenorden.forEach(element => {
                examenes.push(element.examen);
            });

            this.form.examen = examenes;
            this.toTop();
        },

        verorden(data) {

            let examenes = [];

            data.examenorden.forEach(element => {
                examenes.push(element.examen);
            });

            this.examenes = examenes;
            this.titlemodal = "Examenes de la Orden "+ data.codigo;
            this.modal = true;
        },

    },

}
