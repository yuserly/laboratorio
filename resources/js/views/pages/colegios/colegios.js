import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import appConfig from "../../../app.config.json";
import { required, numeric } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import $ from "jquery";

export default {
    components: { Layout, PageHeader },

    page: {
        title: "Colegios",
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
                id_colegio: "",
                direccion: ""
            },
            submitted: false,
            typeform: "create",
            titlemodal: "Crear Colegio",
            modal: false,
            colegioexist: false,
            btnCreate: true,
            vistatablacolegioinactivo: true,
            // tabla

            tableData: [],

            title: "Colegios",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Colegios",
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
                    key: "direccion",
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
            direccion: {
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
        this.traerColegios();
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        traerColegios() {
            (this.vistatablacolegioinactivo = true),
                this.axios.get(`/api/obtenercolegios/`).then(response => {
                    this.tableData = response.data;
                });
        },

        traerColegiosInactivos() {
            this.vistatablacolegioinactivo = false;
            this.axios.get(`/api/obtenercolegiosinactivos/`).then(response => {
                this.tableData = response.data;
            });
        },

        eliminar(data) {
            if (data.deleted_at == null) {
                var estado = 2;
                var title = "Desactivar colegio";
                var text = `¿Esta seguro de desativar la colegio ${data.nombre}?`;
            } else {
                estado = 1;
                title = "Activar colegio";
                text = `¿Esta seguro de activar la colegio ${data.nombre}?`;
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
                        .delete(`/api/eliminarcolegio/${data.id_colegio}`)
                        .then(res => {
                            if (res.data) {
                                var message = "Colegio ha sido desactivado";
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

                            this.traerColegios();
                        });
                }
            });
        },

        activar(data) {
            if (data.deleted_at == null) {
                var estado = 2;
                var title = "Desactivar colegio";
                var text = `¿Esta seguro de desativar la colegio ${data.nombre}?`;
            } else {
                estado = 1;
                title = "Activar Colegio";
                text = `¿Esta seguro de activar la colegio ${data.nombre}?`;
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
                        .get(`/api/activarcolegio/${data.id_colegio}`)
                        .then(res => {
                            if (res.data) {
                                var message = "Colegio ha sido desactivada";
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

                            this.traerColegios();
                        });
                }
            });
        },

        editar(data) {
            this.form.nombre = data.nombre;
            this.form.id_colegio = data.id_colegio;
            this.form.direccion = data.direccion;
            this.modal = true;
            this.btnCreate = false;
        },

        formSubmit() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();
            if (!this.$v.$invalid && !this.colegioexist) {
                this.axios
                    .post(`/api/crearcolegio`, this.form)
                    .then(res => {
                        let title = "";
                        let message = "";
                        let type = "";
                        if (res.data) {
                            if (this.form.id_colegio == "") {
                                title = "Crear colegio";
                                message = "Colegio creada con exito";
                                type = "success";
                            } else {
                                title = "Editar colegio";
                                message = "Colegio editada con exito";
                                type = "success";
                            }
                            this.modal = false;
                            this.colegioexist = false;
                            this.btnCreate = false;

                            this.submitted = false;

                            this.$v.form.$reset();
                            this.traerColegios();
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
            this.titlemodal = "Crear colegio";
            this.submitted = false;
            (this.typeform = "create"),
                (this.form = {
                    nombre: "",
                    id_colegio: "",
                    direccion: ""
                });
            this.btnCreate = true;
        },

        validarNombre($event) {
            if ($event.target.value.length > 4) {
                this.axios
                    .get(`/api/validarcolegio/${$event.target.value}`)
                    .then(response => {
                        if (response.data == 1) {
                            this.colegioexist = true;
                        } else {
                            this.colegioexist = false;
                        }
                    });
            }
        },

        successmsg(title, message, type) {
            Swal.fire({
                position: "center",
                title:message,
                icon:type,
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
};
