import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

import $ from "jquery";

export default {
    components: { Layout, PageHeader, Multiselect, Cropper },

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
            img: 'https://images.pexels.com/photos/4323307/pexels-photo-4323307.jpeg',
            urlbackend: this.$urlBackend,
            roles: [],

            // form
            rol: "", 
            emailexist: false,
            rutexist: false,
            FileCropper: false,
            requireFirma: 0,
            formsa: {
                nombres: "",
                apellidos: "",
                email: "",
                rol: this.rol,
                id: "",
                imagenCheck: 0,
            },
            formp: {
                nombres: "",
                apellidos: "",
                email: "",
                rol: this.rol,
                profesion: "",
                rut: "",
                id: "",
                imagenCheck: 0,
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

        validarSessionActive(error)
        {
            if (error.response.status === 401) {
                localStorage.removeItem('name');
                localStorage.removeItem('token');
                localStorage.removeItem('permisos');
                this.$router.push({ name: 'login' })
            }
        },

        uploadImage(event) {
            if (typeof this.$refs.file.files[0] == "undefined") {
                this.imgCr = null;
                this.FileCropper = false;
            } else {
                var input = event.target;

                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = e => {
                        this.imgCr = e.target.result;
                        this.FileCropper = true;
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            }
        },

        onFileImagen(event) {
            this.nuevoProducto.imagen = event.target.files[0];
        },

        traerAdministradores() {
            this.axios
                .get(`/api/obtenerusuario/Administrador`)
                .then(response => {
                    this.tableData = response.data;
                }, error => {
                     this.validarSessionActive(error);
                    return error;
                });
        },

        traerProfesionales() {
            this.axios
                .get(`/api/obtenerusuarioprofesionales`)
                .then(response => {
                    this.tableDataProfesional = response.data;
                }, error => {
                    this.validarSessionActive(error);
                   return error;
               });
        },

        traerSecretaria() {
            this.axios
                .get(`/api/obtenerusuariosecretaria`)
                .then(response => {
                    this.tableDataSecretaria = response.data;
                }, error => {
                    this.validarSessionActive();
                   return error;
               });
        },

        obtroles() {
            this.axios.get(`/api/obtenerroles`).then(response => {
                this.roles = response.data;
            }, error => {
                this.validarSessionActive();
               return error;
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
                    }, error => {
                        this.validarSessionActive(error);
                       return error;
                   });
            }
        },

        SelectUsuario()
        {
            console.log(this.rol);
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

        },

        formpSubmit() 
        {
            this.submitted = true;
            this.$v.formp.$touch();

            if (!this.$v.formp.$invalid && !this.emailexist && !this.rutexist) {

                if(this.rol.name == "Profesional Laboratorio"){
                    if (typeof this.$refs.file.files[0] == "undefined") {
                        Swal.fire({
                            icon: "warning",
                            title: "FIRMA",
                            text: "Debes seleccionar una imagen para la firma.",
                            timer: 1500,
                            showConfirmButton: false
                        });
                        return false;
                    }
    
                    const { canvas } = this.$refs.cropper.getResult();
                    
                    var fd = new FormData();
    
                    if (canvas) {
                        canvas.toBlob(blob => {
                            fd.append("rut", this.formp.rut);
                            fd.append("nombres", this.formp.nombres);
                            fd.append("apellidos", this.formp.apellidos);
                            fd.append("profesion", this.formp.profesion);
                            fd.append("email", this.formp.email);
                            fd.append("id", this.formp.id);
                            fd.append("rol", this.rol.id);
                            fd.append("imagen", blob);
                            fd.append('imagenCheck', 1);
    
                            this.axios
                        .post(`/api/crearusuario`, fd, {
                            headers: {
                                "content-type": "multipart/form-data"
                            }
                        })
                        .then(res => {
                            if(res.data == 0)
                            {
                                Swal.fire({
                                    icon: "warning",
                                    title: "RUT",
                                    text: "RUT usuario por otro usuario.",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                                return false;
                            }
                            if(res.data == 1)
                            {
                                Swal.fire({
                                    icon: "warning",
                                    title: "RUT",
                                    text: "RUT usuado por otro usuario.",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                                return false;
                            }
                            if (res.data) {
                                
                                if (this.formp.id == "") {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Nuevo Usuarios",
                                        text: "Usuarios ingreso con exitosamente",
                                        timer: 1500,
                                        showConfirmButton: false
                                    });
                                } else {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Usuarios Actualizado",
                                        text: "Usuarios actualizado exitosamente",
                                        timer: 1500,
                                        showConfirmButton: false
                                    });
                                }
                                this.modal = false;
                                this.emailexist = false;
                                this.rutexist = false;
                                this.btnCreate = false;

                                this.FileCropper = false;
                                this.imgCr = null;
                                $('.inputImg').val(""),
                                this.formp.firma = "";
    
                                this.$v.formp.$reset();
                                this.traerAdministradores();
                                this.traerProfesionales();
                                this.traerSecretaria();
                            }
                        })
                        .catch(error => {
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
    
                            this.modal = false;
                            this.btnCreate = false;
                            this.$v.formp.$reset();
                        });
                                  
                        }, "image/png");
                    }
    
                }else{
                        var fd = new FormData();

                        fd.append("rut", this.formp.rut);
                        fd.append("nombres", this.formp.nombres);
                        fd.append("apellidos", this.formp.apellidos);
                        fd.append("profesion", this.formp.profesion);
                        fd.append("email", this.formp.email);
                        fd.append("id", this.formp.id);
                        fd.append("rol", this.rol.id);
                        fd.append("imagenCheck", 0);
    
                    this.axios
                        .post(`/api/crearusuario`, fd, {
                            headers: {
                                "content-type": "multipart/form-data"
                            }
                        })
                        .then(res => {
                            if(res.data == 0)
                            {
                                Swal.fire({
                                    icon: "warning",
                                    title: "RUT",
                                    text: "RUT usuario por otro usuario.",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                                return false;
                            }
                            if(res.data == 1)
                            {
                                Swal.fire({
                                    icon: "warning",
                                    title: "RUT",
                                    text: "RUT usuado por otro usuario.",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                                return false;
                            }
                            if (res.data) {
                                
                                if (this.formp.id == "") {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Nuevo Usuarios",
                                        text: "Usuarios ingreso con exitosamente",
                                        timer: 1500,
                                        showConfirmButton: false
                                    });
                                } else {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Usuarios Actualizado",
                                        text: "Usuarios actualizado exitosamente",
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
    
                            this.modal = false;
                            this.btnCreate = false;
                            this.$v.formp.$reset();
                        });
                }

                
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
                        if(res.data == 0)
                        {
                            Swal.fire({
                                icon: "warning",
                                title: "RUT",
                                text: "RUT usuario por otro usuario.",
                                timer: 1500,
                                showConfirmButton: false
                            });
                            return false;
                        }
                        if (res.data) {
                            if (this.formsa.id == "") {
                                Swal.fire({
                                    icon: "success",
                                    title: "Nuevo Usuarios",
                                    text: "Usuarios ingreso con exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            } else {
                                Swal.fire({
                                    icon: "success",
                                    title: "Usuarios Actualizado",
                                    text: "Usuarios actualizado con exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            }
                            this.modal = false;
                            this.emailexist = false;
                            this.btnCreate = false;

                            this.submitted = false;

                            this.$v.formsa.$reset();
                            this.traerAdministradores();
                            this.traerProfesionales();
                            this.traerSecretaria();
                        }
                    })
                    .catch(error => {
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

        editar(data) {
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
                  }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
              }
            });
          },
    }
};
