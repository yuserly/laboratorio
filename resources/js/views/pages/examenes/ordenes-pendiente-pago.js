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
                id_orden_examenes:""
            },
            options:[],
            submitted: false,
            disable: false,
            btnCreate:true,
            modal:false,
            examenes:[],
            titlemodal:"",

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
        this.traerOrden();

        this.totalRows = this.items.length;


    },


    methods: {


        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
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



        traerOrden() {
            this.axios
                .get(`/api/obtenordenpendientepago`)
                .then(response => {
                    console.log(response);
                    this.tableData = response.data;
                });
        },

        pagar(data){
            console.log(data);

                var title = "Pagar Orden";
                var text = `¿Esta seguro de marcar como pagada la orden ${data.codigo} ?`;

              Swal.fire({
                title: title,
                text: text,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Si",
              }).then((result) => {
                if (result.value) {
                  this.axios
                    .get(
                      `/api/marcarpagada/${data.id_orden_examenes}`
                    )
                    .then((res) => {
                      console.log(res);
                      if (res.data) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Pagar Orden',
                          text: "Orden ha sido marcada como pagada",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      } else {

                          Swal.fire({
                            icon: 'error',
                            title: 'Pagar Orden',
                            text: "Error al marcar la orden como pagada",
                            timer: 1500,
                            showConfirmButton: false
                          });
                      }

                      this.traerOrden();
                    });
                }
              });
        },


        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        }

    },

}
