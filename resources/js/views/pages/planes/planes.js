import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import appConfig from "../../../app.config.json";
import { required, numeric } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import $ from "jquery";

export default {
    components: { Layout, PageHeader },

    page: {
        title: "Planes",
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
            form: {
                nombre: "",
                id_plan: "",
                cantidad: "",
                precio: ""
            },
            formenvio: {
                precio: 0,
                id_envio: ""
            },
            modalenvio: false,
            submittedenvio: false,
            submitted: false,
            typeform: "create",
            titlemodal: "Crear Planes",
            modal: false,
            planexist: false,
            btnCreate: true,
            vistatablaplaninactivo: true,
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
                {
                    key: "nombre",
                    sortable: true
                },
                {
                    key: "precio",
                    sortable: true,
                    label: "Precio",
                    formatter: (precio, key, item) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0
                        });
                        return formatter.format(precio);
                    }
                },
                {
                    key: "cantidad",
                    label: "Cantidad QR",
                    sortable: true
                },
                "action"
            ]
        };
    },
    validations: {
        form: {
            nombre: {
                required
            },
            cantidad: {
                required,
                numeric
            },
            precio: {
                required,
                numeric
            }
        },
        formenvio: {
            precio: {
                required,
                numeric
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
        this.traerPlanes();
        this.traerEnvio();
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        traerPlanes() {
            (this.vistatablaplaninactivo = true),
                this.axios.get(`/api/obtenerplanes/`).then(response => {
                    this.tableData = response.data;
                });
        },

        traerPlanesInactivos() {
            this.vistatablaplaninactivo = false;
            this.axios.get(`/api/obtenerplanesinactivos/`).then(response => {
                this.tableData = response.data;
            });
        },

        eliminar(data) {
            if (data.deleted_at == null) {
                var estado = 2;
                var title = "Desactivar plan";
                var text = `¿Esta seguro de desativar la plan ${data.nombre}?`;
            } else {
                estado = 1;
                title = "Activar Plan";
                text = `¿Esta seguro de activar la plan ${data.nombre}?`;
            }

            Swal.fire({
                title: title,
                text: text,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Si"
            }).then(result => {
                if (result.value) {
                    this.axios
                        .delete(`/api/eliminarplan/${data.id_plan}`)
                        .then(res => {
                            console.log(res);
                            if (res.data) {
                                var message = "Plan ha sido desactivada";
                                var type = "success";
                            } else {
                                if (estado == 1) {
                                    message = "Error al activar plan";
                                } else {
                                    message = "Error al desactivar plan";
                                }
                                type = "error";
                            }

                            this.successmsg(title, message, type);

                            this.traerPlanes();
                        });
                }
            });
        },

        activar(data) {
            if (data.deleted_at == null) {
                var estado = 2;
                var title = "Desactivar plan";
                var text = `¿Esta seguro de desativar la plan ${data.nombre}?`;
            } else {
                estado = 1;
                title = "Activar Plan";
                text = `¿Esta seguro de activar la plan ${data.nombre}?`;
            }

            Swal.fire({
                title: title,
                text: text,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Si"
            }).then(result => {
                if (result.value) {
                    this.axios
                        .get(`/api/activarplan/${data.id_plan}`)
                        .then(res => {
                            console.log(res);
                            if (res.data) {
                                var message = "Plan ha sido desactivado";
                                var type = "success";
                            } else {
                                if (estado == 1) {
                                    message = "Error al activar plan";
                                } else {
                                    message = "Error al desactivar plan";
                                }
                                type = "error";
                            }

                            this.successmsg(title, message, type);

                            this.traerPlanes();
                        });
                }
            });
        },

        editar(data) {
            this.form.nombre = data.nombre;
            this.form.id_plan = data.id_plan;
            this.form.cantidad = data.cantidad;
            this.form.precio = data.precio;
            this.modal = true;
            this.btnCreate = false;
        },

        formSubmit() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.form.$touch();
            if (!this.$v.form.$invalid && !this.planexist) {
                this.axios
                    .post(`/api/crearplan`, this.form)
                    .then(res => {
                        console.log(res);
                        let title = "";
                        let message = "";
                        let type = "";
                        if (res.data) {
                            if (this.form.id_plan == "") {
                                title = "Crear plan";
                                message = "plan creado con exito";
                                type = "success";
                            } else {
                                title = "Editar plan";
                                message = "plan editado con exito";
                                type = "success";
                            }
                            this.modal = false;
                            this.planexist = false;
                            this.btnCreate = false;

                            this.$v.form.$reset();
                            this.traerPlanes();
                            this.successmsg(title, message, type);
                        }
                    })
                    .catch(error => {
                        console.log("error", error);

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

        modalNuevo() {
            this.modal = true;
            this.titlemodal = "Crear plan";
            (this.typeform = "create"),
                (this.form = {
                    nombre: "",
                    id_plan: "",
                    cantidad: "",
                    precio: ""
                });
            this.btnCreate = true;
        },

        validarNombre($event) {
            if ($event.target.value.length > 4) {
                this.axios
                    .get(`/api/validarplan/${$event.target.value}`)
                    .then(response => {
                        if (response.data == 1) {
                            this.planexist = true;
                        } else {
                            this.planexist = false;
                        }
                    });
            }
        },

        traerEnvio() {
            (this.vistatablaplaninactivo = true),
                this.axios.get(`/api/obtenerenvio/`).then(response => {
                    // this.tableData = response.data;
                    this.formenvio.id_envio = response.data.id_envio;
                    this.formenvio.precio = response.data.precio;
                });
        },

        formSubmitPrecio() {
            this.submittedenvio = true;
            this.$v.formenvio.$touch();
            if (!this.$v.formenvio.$invalid) {
                this.axios
                    .post(`/api/crearenvio`, this.formenvio)
                    .then(res => {
                        let title = "";
                        let message = "";
                        let type = "";
                        if (res.status == 200 || res.status == 201) {
                            title = "Envio";
                            message = "Envio modificado correctamente";
                            type = "success";

                            this.modalenvio = false;
                            this.submittedenvio = false;
                            this.traerEnvio();
                            this.successmsg(title, message, type);
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
                    });
            }
        },

        successmsg(title, message, type) {
            Swal.fire({
                position: "center",
                title: message,
                icon: type,
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
};
