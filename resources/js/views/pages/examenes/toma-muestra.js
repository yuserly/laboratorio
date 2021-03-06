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
            preloader : true,
            modal:false,
            examenes:[],
            titlemodal:"",
            orden:"",

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
                    key: "paciente",
                    label: "Paciente",
                    sortable: true,
                    formatter: paciente => {
                        return `${paciente.nombres} ${paciente.apellidos}`;
                    }
                },
                {
                    key: "paciente.edad",
                    label: "Edad",
                    sortable: true,
                },
                {
                    key: "paciente.email",
                    label: "Correo",
                    sortable: true,
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

        rows() {
            return this.tableData.length;
        }
    },

    mounted() {
        this.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        window.addEventListener('scroll', this.handleScroll);
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

        validarSessionActive(error)
        {
            if (error.response.status === 401) {
                localStorage.removeItem('name');
                localStorage.removeItem('token');
                localStorage.removeItem('permisos');
                this.$router.push({ name: 'login' })
            }
        },

        traerOrden() {
            this.axios
                .get(`/api/obtenordenpendiente`)
                .then(response => {
                    console.log(response);
                    this.tableData = response.data;
                }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
        },
        verorden(data) {

            let examenes = [];
            this.orden  = data;

            data.examenorden.forEach(element => {
                examenes.push(element.examen);
            });

            this.examenes = examenes;
            this.titlemodal = "Examenes de la Orden "+ data.codigo;
            this.modal = true;
        },

        marcar(){

            var estado = 2;
            var title = "Marcar Toma de muestra Realizada";
            var text = `??Esta seguro de Marcar la orden ${this.orden.codigo} como realizada?`;

              Swal.fire({
                title: title,
                text: text,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Si, Realiazada.",
              }).then((result) => {
                if (result.value) {
                  this.axios
                    .get(
                      `/api/marcartomarealizada/${this.orden.id_orden_examenes}`
                    )
                    .then((res) => {
                      console.log(res);
                      if (res.data) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Toma de muestra',
                          text: "Marcada correctamente",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      } else {
                        if (estado == 1) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Toma de muestra',
                            text: "Marcada correctamente",
                            timer: 1500,
                            showConfirmButton: false
                          });
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Toma de muestra',
                            text: "Error al marcar la toma de muestra",
                            timer: 1500,
                            showConfirmButton: false
                          });
                        }
                        type = "error";
                      }

                      this.traerOrden();
                      this.modal = false;
                    });
                }
              }, error => {
                this.validarSessionActive(error);
                return error;
            });
        },

    }

}
