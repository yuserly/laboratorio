import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";

import $ from "jquery";

export default {
    components: { Layout, PageHeader, Multiselect },

    page: {
        title: "Usuarios",
        meta: [
            {
                name: "description",
                content: "Pagina de usuarios"
            }
        ]
    },

    data() {
        return {
            urlbackend: this.$urlBackend,
            roles: [],

            // form
            rol: "",
            emailexist: false,
            rutexist: false,
            formsa: {
                nombres: "",
                apellidos: "",
                email: "",
                rol: this.rol,
                id: ""
            },
            formp: {
                nombres: "",
                apellidos: "",
                email: "",
                rol: this.rol,
                profesion: "",
                firma: "",
                antfirma:"",
                rut: "",
                id: ""
            },
            submitted: false,
            typeform: "create",
            titlemodal: "Crear Usuarios",
            btnCreate: true,
            modal: false,

            // tabla administrador

            tableData: [],

            title: "Usuarios",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Usuarios",
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
                    key: "name",
                    label: "Nombre",
                    sortable: true
                },
                {
                    key: "email",
                    sortable: true
                },
                "action"
            ],

            // tabla profesioonales

            tableDataProfesional: [],

            title: "Usuarios",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Usuarios",
                    active: true
                }
            ],
            totalRowsProfesional: 1,
            currentPageProfesional: 1,
            perPageProfesional: 10,
            pageOptionsProfesional: [10, 25, 50, 100],
            filterProfesional: null,
            filterOnProfesional: [],
            sortByProfesional: "nombre",
            sortDescProfesional: false,
            fieldsProfesional: [
                {
                    key: "name",
                    label: "Nombre",
                    sortable: true
                },
                {
                    key: "email",
                    sortable: true
                },
                "action"
            ],

            // tabla secretaria

            tableDataSecretaria: [],

            title: "Usuarios",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Usuarios",
                    active: true
                }
            ],
            totalRowsSecretaria: 1,
            currentPageSecretaria: 1,
            perPageSecretaria: 10,
            pageOptionsSecretaria: [10, 25, 50, 100],
            filterSecretaria: null,
            filterOnSecretaria: [],
            sortBySecretaria: "nombre",
            sortDescSecretaria: false,
            fieldsSecretaria: [
                {
                    key: "name",
                    label: "Nombre",
                    sortable: true
                },
                {
                    key: "email",
                    sortable: true
                },
                "action"
            ]
        };
    },
    validations: {
        formsa: {
            nombres: {
                required
            },
            apellidos: {
                required
            },
            email: {
                required,
                email
            }
        },
        formp: {
            nombres: {
                required
            },
            apellidos: {
                required
            },
            email: {
                required,
                email
            },
            profesion: {
                required
            },
            firma: {
                required
            },
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
        },
        rowsProfesional() {
            return this.tableDataProfesional.length;
        },
        rowsSecretaria() {
            return this.tableDataSecretaria.length;
        }
    },
    mounted() {
        this.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;

        this.totalRowsProfesional = this.items.length;
        this.totalRowsSecretaria = this.items.length;


        this.obtroles();
        this.traerAdministradores();
        this.traerProfesionales();
        this.traerSecretaria();
    },

    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        onFilteredProfesional(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRowsProfesional = filteredItems.length;
            this.currentPageProfesional = 1;
        },

        onFilteredSecretaria(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRowsSecretaria = filteredItems.length;
            this.currentPageSecretaria = 1;
        },

        traerAdministradores() {
            this.axios
                .get(`/api/obtenerusuario/Administrador`)
                .then(response => {
                    console.log(response);
                    this.tableData = response.data;
                });
        },

        traerProfesionales() {
            this.axios
                .get(`/api/obtenerusuarioprofesionales`)
                .then(response => {
                    console.log(response);
                    this.tableDataProfesional = response.data;
                });
        },

        traerSecretaria() {
            this.axios
                .get(`/api/obtenerusuariosecretaria`)
                .then(response => {
                    console.log(response);
                    this.tableDataSecretaria = response.data;
                });
        },

        obtroles() {
            this.axios.get(`/api/obtenerroles`).then(response => {
                console.log(response);
                this.roles = response.data;
            });
        },
        modalNuevo() {
            this.modal = true;
            this.titlemodal = "Crear Usuario";
            this.submitted = false;
            this.typeform = "create";
            this.rol = "";
            (this.emailexist = false),
                (this.rutexist = false),
                (this.formsa = {
                    nombres: "",
                    apellidos: "",
                    email: "",
                    rol: this.rol,
                    id: ""
                });

            this.formp = {
                nombres: "",
                apellidos: "",
                email: "",
                rol: this.rol,
                profesion: "",
                firma: "",
                antfirma:"",
                rut: "",
                id: ""
            };
            this.btnCreate = true;
        },

        onFileChange($event) {
            var files = $event.target.files || $event.dataTransfer.files;
            if (!files.length) return;
            this.formp.firma = files[0];

            // para crear por primera vez la firma
        },

        validarEmail($event) {
            if ($event.target.value.length > 4) {
                this.axios
                    .get(`/api/validaremail/${$event.target.value}`)
                    .then(response => {
                        if (response.data == 1) {
                            this.emailexist = true;
                        } else {
                            this.emailexist = false;
                        }
                    });
            }
        },

        checkRut() {
            var valor = this.formp.rut.replace(".", ""); // Quita Punto
            valor = valor.replace("-", ""); // Quita Guión
            var cuerpo = valor.slice(0, -1); // Aislar Cuerpo y Dígito Verificador
            var dv = valor.slice(-1).toUpperCase();
            this.formp.rut = cuerpo + "-" + dv; // Formatear RUN

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
                .get(`/api/validarrut/${this.formp.rut}`)
                .then(response => {
                    if (response.data == 1) {
                        this.rutexist = true;
                    } else {
                        this.rutexist = false;
                    }
                });
        },

        change({ coordinates, canvas }) {
            console.log(coordinates, canvas);
        },

        formpSubmit() {
            this.submitted = true;
            this.$v.formp.$touch();

            if (!this.$v.formp.$invalid && !this.emailexist && !this.rutexist) {
                var fd = new FormData();
                fd.append("rut", this.formp.rut);
                fd.append("nombres", this.formp.nombres);
                fd.append("apellidos", this.formp.apellidos);
                fd.append("profesion", this.formp.profesion);
                fd.append("email", this.formp.email);
                fd.append("id", this.formp.id);
                fd.append("firma", this.formp.firma);
                fd.append("antfirma", this.formp.antfirma);
                fd.append("rol", this.rol.id);

                this.axios
                    .post(`/api/crearusuario`, fd, {
                        headers: {
                            "content-type": "multipart/form-data"
                        }
                    })
                    .then(res => {
                        if (res.data) {
                            if (this.formp.id == "") {
                                Swal.fire({
                                    icon: "success",
                                    title: "Crear Usuarios",
                                    text: "Usuarios creado con exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            } else {
                                Swal.fire({
                                    icon: "success",
                                    title: "Crear Usuarios",
                                    text: "Usuarios editado exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            }
                            this.modal = false;
                            this.emailexist = false;
                            this.rutexist = false;
                            this.btnCreate = false;

                            this.$v.formp.$reset();
                            this.traerAdministradores();
                            this.traerProfesionales();
                            this.traerSecretaria();
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

                        this.modal = false;
                        this.btnCreate = false;
                        this.$v.formp.$reset();
                    });
            }
        },

        formsaSubmit() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.formsa.$touch();

            if (!this.$v.formsa.$invalid && !this.emailexist) {
                this.formsa.rol = this.rol.id;
                this.axios
                    .post(`/api/crearusuario`, this.formsa)
                    .then(res => {
                        let title = "";
                        let message = "";
                        let type = "";
                        if (res.data) {
                            if (this.formsa.id == "") {
                                title = "Crear Usuario";
                                message = "Usuario creada con exito";
                                type = "success";
                            } else {
                                title = "Editar Usuario";
                                message = "Usuario editado con exito";
                                type = "success";
                            }
                            this.modal = false;
                            this.emailexist = false;
                            this.btnCreate = false;

                            this.submitted = false;

                            this.$v.formsa.$reset();
                            this.traerAdministradores();
                            this.traerProfesionales();
                            this.traerSecretaria();
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

        editar(data) {
            console.log(data);

            this.titlemodal = "Editar Usuario";
            this.formp.rut = data.rut;
            this.formp.nombres = data.nombres;
            this.formsa.nombres = data.nombres;
            this.formp.id = data.id;
            this.formsa.id = data.id;
            this.formp.apellidos = data.apellidos;
            this.formsa.apellidos = data.apellidos;
            this.formp.profesion = data.profesion;
            this.formp.firma = data.firma;
            this.formp.antfirma = data.firma;
            this.formp.email = data.email;
            this.formsa.email = data.email;
            this.rol = data.roles[0]
            this.modal = true;
            this.btnCreate = false;
        },

        eliminar(data) {
            if (data.deleted_at == null) {
              var estado = 2;
              var title = "Desactivar Profesional";
              var text = `¿Esta seguro de desativar profesional ${data.nombres} ${data.apellidos}?`;
            } else {
              estado = 1;
              title = "Activar Profesional";
              text = `¿Esta seguro de activar profesional ${data.nombres} ${data.apellidos}?`;
            }

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
                  .delete(
                    `/api/eliminarusuario/${data.id}`
                  )
                  .then((res) => {
                    console.log(res);
                    if (res.data) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Eliminar Usuario',
                        text: "Usuario ha sido desactivado",
                        timer: 1500,
                        showConfirmButton: false
                      });
                    } else {
                      if (estado == 1) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Eliminar Usuario',
                          text: "Error al activar Usuario",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Eliminar Usuario',
                          text: "Error al desactivar Usuario",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      }
                      type = "error";
                    }

                    this.traerAdministradores();
                    this.traerProfesionales();
                    this.traerSecretaria();
                  });
              }
            });
          },

        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        }
    }
};
