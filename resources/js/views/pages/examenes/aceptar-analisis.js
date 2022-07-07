import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
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
            preloader : true,
            modal:false,
            titlemodal:"",
            orden:"",
            form:[],

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
        this.preloader = false;

    },

    methods: {

        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        traerOrden() {
            this.axios
                .get(`/api/obteneranalisissinaceptar`)
                .then(res => {
                    res.data.map((p) => {
                        p['rut']             = p.paciente.rut;
                        p['pacienteName']    = p.paciente.nombres+' '+p.paciente.apellidos;
                        p['ejecutorName']    = p.ejecutor.name;
                        return p;
                    });
                    this.tableData = res.data;
            });
        },

        aceptarOrden(data) {
            Swal.fire({
                title: "Aceptar Analisis",
                text: "¿Desea aceptar el analisis de este examen?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Si, Aceptar.",
              }).then((result) => {
                if (result.value) {
                  this.axios
                    .get(
                      `/api/aceptarAnalisis/${data.id_orden_examenes}`
                    )
                    .then((res) => {
                      this.traerOrden();
                      Swal.fire({
                        icon: 'success',
                        title: 'Examen Aceptado',
                        text: "Examen ha sido aceptado para analisis.",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    });
                }
              }, error => {
                this.validarSessionActive(error);
                return error;
            });
        },

        guardarvalores(){

            this.axios
                    .post(`/api/guardarresultado`, this.form)
                    .then(res => {

                        console.log(res)

                    })
                    .catch(error => {
                        console.log("error", error);
                    });
        },

        marcar(){

            console.log(this.form);

            var title = "Marcar Orden como analizada";
            var text = `¿Esta seguro de Marcar la orden como analizada?`;

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

                    this.guardarvalores();

                    this.axios
                    .post(`/api/marcaranalizada`, this.form)
                    .then(res => {

                        console.log(res.data);

                        if (res.data) {
                            Swal.fire({
                              icon: 'success',
                              title: 'Analizada',
                              text: "Marcada correctamente",
                              timer: 1500,
                              showConfirmButton: false
                            });
                          } else {

                              Swal.fire({
                                icon: 'error',
                                title: 'Analizada',
                                text: "Error al marcar la Orden como Analizada",
                                timer: 1500,
                                showConfirmButton: false
                              });

                          }

                          this.traerOrden();
                          this.modal = false;

                    })
                    .catch(error => {
                        console.log("error", error);
                    });

                }
              });
        },

        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        }
    }

}
