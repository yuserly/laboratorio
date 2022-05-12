import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import appConfig from "../../../app.config.json";
import { required, numeric } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import $ from "jquery";
import Multiselect from "vue-multiselect";
export default {
    components: { Layout, PageHeader, Multiselect },

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
                nombres: "",
                apellidos: "",
                id_adm_colegio: "",
                colegio_id: "",
                email: "",
                user_id: "",
                password: ""
            },
            submitted: false,
            typeform: "create",
            titlemodal: "Crear Administrador",
            modal: false,
            emailexist: false,
            btnCreate: true,
            vistatablaadmininactivo: true,
            options: [],
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
            sortBy: "nombres",
            sortDesc: false,
            fields: [
                {
                    key: "nombres",
                    sortable: true
                },
                {
                    key: "apellidos",
                    sortable: true
                },
                {
                    key: "user.email",
                    label:'Email',
                    sortable: true
                },
                {
                    key: "colegio.nombre",
                    label:'Colegio',
                    sortable: true
                },
                "action"
            ]
        };
    },
    validations: {
        form: {
            nombres: {
                required
            },
            apellidos: {
                required
            },
            email: {
                required
            },
            colegio_id: {
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
        this.traerAdmin();
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        traerColegios() {
            (this.vistatablaadmininactivo = true),
                this.axios.get(`/api/obtenercolegios/`).then(response => {
                    this.options = response.data;
                });
        },
        traerAdmin() {
            (this.vistatablaadmininactivo = true),
                this.axios.get(`/api/obteneradmin/`).then(response => {
                    console.log(response)
                    this.tableData = response.data;
                });
        },

        traerAdminInactivos() {
            this.vistatablaadmininactivo = false;
            this.axios.get(`/api/obteneradmininactivos/`).then(response => {
                this.tableData = response.data;
            });
        },

        eliminar(data) {
            if (data.deleted_at == null) {
                var estado = 2;
                var title = "Desactivar administrador";
                var text = `¿Esta seguro de desativar la administrador ${data.nombres}?`;
            } else {
                estado = 1;
                title = "Activar administrador";
                text = `¿Esta seguro de activar la administrador ${data.nombres}?`;
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
                        .delete(`/api/eliminaradmin/${data.id_adm_colegio}`)
                        .then(res => {
                            if (res.data) {
                                var message =
                                    "Administrador ha sido desactivado";
                                var type = "success";
                            } else {
                                if (estado == 1) {
                                    message = "Error al activar administrador";
                                } else {
                                    message =
                                        "Error al desactivar administrador";
                                }
                                type = "error";
                            }

                            this.successmsg(title, message, type);

                            this.traerAdmin();
                        });
                }
            });
        },

        activar(data) {
            if (data.deleted_at == null) {
                var estado = 2;
                var title = "Desactivar admin";
                var text = `¿Esta seguro de desativar la admin ${data.nombres}?`;
            } else {
                estado = 1;
                title = "Activar admin";
                text = `¿Esta seguro de activar la admin ${data.nombres}?`;
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
                        .get(`/api/activaradmin/${data.id_adm_colegio}`)
                        .then(res => {
                            if (res.data) {
                                var message =
                                    "Administrador ha sido desactivada";
                                var type = "success";
                            } else {
                                if (estado == 1) {
                                    message = "Error al activar administrador";
                                } else {
                                    message =
                                        "Error al desactivar administrador";
                                }
                                type = "error";
                            }

                            this.successmsg(title, message, type);

                            this.traerAdmin();
                        });
                }
            });
        },

        editar(data) {
            console.log(data)
            this.form.nombres = data.nombres;
            this.form.id_adm_colegio = data.id_adm_colegio;
            this.form.apellidos = data.apellidos;
            this.form.email = data.user.email;
            this.form.user_id = data.user.id;
            this.form.colegio_id = data.colegio

            this.modal = true;
            this.btnCreate = false;
        },

        formSubmit() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();
            if(this.form.id_adm_colegio == "" && this.form.password == ''){
                return;
            }
            if (!this.$v.$invalid && !this.emailexist) {

                this.axios
                    .post(`/api/crearadmin`, this.form)
                    .then(res => {
                        let title = "";
                        let message = "";
                        let type = "";
                        if (res.data) {
                            if (this.form.id_adm_colegio == "") {
                                title = "Crear Administrador";
                                message = "Administrador creada con exito";
                                type = "success";
                            } else {
                                title = "Editar Administrador";
                                message = "Administrador editada con exito";
                                type = "success";
                            }
                            this.modal = false;
                            this.emailexist = false;
                            this.btnCreate = false;
                            this.submitted = false;

                            this.$v.form.$reset();
                            this.traerAdmin();
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
            this.titlemodal = "Crear Administrador";
            this.submitted = false;
            (this.typeform = "create"),
                (this.form = {
                    nombres: "",
                    apellidos: "",
                    id_adm_colegio: "",
                    colegio_id: "",
                    email: "",
                    user_id: "",
                    password: ""
                });
            this.btnCreate = true;
        },

        validarEmail($event) {
            if ($event.target.value.length > 4) {
                this.axios
                    .get(`/api/validaremailadmin/${$event.target.value}`)
                    .then(response => {
                        if (response.data == 1 && !this.form.id_adm_colegio) {
                            this.emailexist = true;
                        } else {
                            this.emailexist = false;
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
