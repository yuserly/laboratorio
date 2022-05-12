import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import appConfig from "../../../app.config.json";
import { required, numeric } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import moment from "moment";

import $ from "jquery";

export default {
    components: { Layout, PageHeader },

    page: {
        title: "Ventas",
        meta: [
            {
                name: "description",
                content: appConfig.description
            }
        ]
    },

    data() {
        return {
            urlbackend: this.$urlBackend,
            modal: false,
            modalpdf:false,
            pdfdisponible: "",
            vistatablapendiente: true,
            vistatablapagada: false,
            vistatablaenviada: true,
            vistatablarechazada: true,
            modaldetalle: false,
            titledetalle: '',
            alumnos: '',
            apoderado: '',
            plancontratado: '',

            // tabla

            tableData: [],

            title: "Planes",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Planes",
                    active: true
                }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "nombre",
            sortDesc: false,
            fields: [
                "codigo",
                {
                    key: "apoderado.nombre",
                    sortable: true,
                    label: " Comprador"
                },
                {
                    key: "apoderado.direccion",
                    label: "Dirección",
                    sortable: true
                },
                {
                    key: "apoderado.region",
                    label: "Region",
                    sortable: true
                },
                {
                    key: "apoderado.comuna",
                    label: "Comuna",
                    sortable: true
                },
                {
                    key: "total",
                    sortable: true,
                    label: "Total",
                    tdClass: 'font-weight',
                    formatter: (total, key, item) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0
                        });
                        return formatter.format(total);
                    }
                },
                {
                    key: "created_at",
                    label:'Fecha',
                    sortable: true,
                    formatter: created_at => {
                        var fecha = moment(created_at).format(
                            "DD/MM/YYYY - h:mm A"
                        );
                        return fecha;
                    }
                },
                {
                    key: "cantidad",
                    label: "Cantidad QR",
                    sortable: true,
                    formatter: (cantidad, key, item) => {
                        return cantidad * 24;
                    }
                },
                "estado",
                "action"
            ]
        };
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
        // this.traerVentasPagadas();
        this.traerVentas();

    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        traerVentas() {
            this.axios.get(`/api/obtenerventastodas/`).then(response => {
                this.tableData = response.data;
            });
        },
        traerVentasPagadas() {
            this.vistatablapagada = false;
            this.vistatablapendiente = true;
            this.vistatablarechazada = true;
            this.vistatablaenviada = true;

            this.axios.get(`/api/obtenerventas/9/`).then(response => {
                this.tableData = response.data;
            });
        },
        traerVentasPendientes() {
            this.vistatablapagada = true;
            this.vistatablapendiente = false;
            this.vistatablarechazada = true;
            this.vistatablaenviada = true;
            this.axios.get(`/api/obtenerventas/8/`).then(response => {

                this.tableData = response.data;
            });
        },
        traerVentasRechazadas() {
            this.vistatablapagada = true;
            this.vistatablapendiente = true;
            this.vistatablarechazada = false;
            this.vistatablaenviada = true;
            this.axios.get(`/api/obtenerventas/10/`).then(response => {

                this.tableData = response.data;
            });
        },
        traerVentasEnviadas() {
            this.vistatablapagada = true;
            this.vistatablapendiente = true;
            this.vistatablarechazada = true;
            this.vistatablaenviada = false;
            this.axios.get(`/api/obtenerventas/14/`).then(response => {

                this.tableData = response.data;
            });
        },
        generarqr(data) {
            var form = {
                idventa: data.id_venta
            };
            this.pdfdisponible = "";

            this.modal = true;

            this.axios
                .post(`/api/generarqrnew`, form)
                .then(res => {

                    if (res.data == 1) {
                        this.pdfdisponible = `${this.urlbackend}/storage/pdf/pdf${data.codigo}.pdf`;
                        this.traerVentas();
                    } else if (res.data == 2) {
                        this.modal = false;

                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title:
                                "La venta seleccionada no se encuentra pagada",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else if (res.data == 0) {
                        this.modal = false;

                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "No se ha podido generar el/los QR",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                })
                .catch(error => {
                    console.log("error", error);
                    this.modal = false;
                });
        },
        descargarpdf() {
            this.pdfdisponible = "";
            //this.traerVentasPagadas();
            this.traerVentas();
            this.modal = false;
        },

        marcarenviada(data) {
            this.axios
                .get(`/api/marcarqrenviado/${data.id_venta}`)
                .then(response => {

                    if ((response.data = 1)) {
                        //this.traerVentasPagadas();
                        this.traerVentas();

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Marcado como enviado al cliente correctamente",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Error al marcarlo como enviado al cliente",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                });
        },

        marcarcomopagado(data) {
            this.axios
                .get(`/api/marcarcomopagado/${data.id_venta}`)
                .then(response => {

                    if ((response.data = 1)) {
                        //this.traerVentasPagadas();
                        this.traerVentas();

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Marcado como pagado correctamente",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Error al marcarlo como pagado",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                });
        },


        marcarqrimprenta(data) {
            this.axios
                .get(`/api/marcarqrimprenta/${data.id_venta}`)
                .then(response => {

                    if ((response.data = 1)) {
                        //this.traerVentasPagadas();
                        this.traerVentas();

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Marcado como enviado a imprenta correctamente",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Error al marcarlo como enviado a imprenta",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                });
        },

        regenerarpdf(data){

            var form = {
                idventa: data.id_venta
            };
            this.pdfdisponible = "";

            this.modalpdf = true;

            this.axios
                .post(`/api/generarqrnew`, form)
                .then(res => {

                    if (res.data == 1) {
                        this.modalpdf = false;
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title:
                                "PDF Generado correctamente",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        this.traerVentas();

                    } else if (res.data == 2) {
                        this.modalpdf = false;

                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title:
                                "La venta seleccionada no se encuentra pagada",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else if (res.data == 0) {
                        this.modal = false;

                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "No se ha podido regenerar el PDF",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                })
                .catch(error => {
                    console.log("error", error);
                    this.modal = false;
                });
        },

        detalleventa(data){


            this.modaldetalle = true;
            this.titledetalle = `Detalle venta ${data.codigo}`
            this.alumnos = data.detalleventa
            this.apoderado = data.apoderado.nombre;
            this.plancontratado = data.plan.nombre;
        }
    }
};
