import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";

import $ from "jquery";

export default {
    components: { Layout, PageHeader, Multiselect },

    page: {
        title: "Examenes",
        meta: [
            {
                name: "description",
                content: "Pagina de Examenes"
            }
        ]
    },

    data() {
        return {

            urlbackend: this.$urlBackend,
            preloader : true,
            btnAccionTipo: true,
            btnAccionExamen: true,
            btnAccionAnalisis: true,
            // tipo de examen
            formtipo: {
                nombre: "",
                id_tipo_examens:"" 
            },
            submitted: false,
            typeform: "create",
            titlemodaltipo: "Nuevo Tipo de examen",
            // btncreate se usa para todos los formularios
            btnCreate: true,
            modaltipo: false,
            nombretipoexist:false,

            tableData: [],

            title: "Tipo de Examen",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Tipo de Examen",
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
                "action"
            ],


            //tipo de examen

            // examen
            formexamen: {
                nombre: "",
                precio_lab: "",
                precio_pac: "",
                precio_par:"",
                kids: false,
                codigo:"",
                id_examen:0,
                tipoexamen:""
            },
            tipoexamen : [],
            titlemodalexamen: "Nuevo examen",
            // btncreate se usa para todos los formularios
            btnCreate: true,
            modalexamen: false,
            nombreexamenexist:false,
            codigoexiste:false,

            tableDataExamen: [],

            titleExamen: "Tipo de Examen",
            itemsExamen: [
                {
                    text: "Tables"
                },
                {
                    text: "Tipo de Examen",
                    active: true
                }
            ],
            totalRowsExamen: 1,
            currentPageExamen: 1,
            perPageExamen: 10,
            pageOptionsExamen: [10, 25, 50, 100],
            filterExamen: null,
            filterOnExamen: [],
            sortByExamen: "nombre",
            sortDescExamen: false,
            fieldsExamen: [
                {
                    key: "codigo",
                    sortable: true
                },
                {
                    key: "nombre",
                    sortable: true
                },
                {
                    key: "precio_par",
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
                    key: "tipoexamen",
                    sortable: true,
                    label: "Tipo de Examen",
                    formatter: (item) => {

                        return item.nombre;
                    }
                },
                "action"
            ],


            //examen

            // analisis

            formanalisis: {
                nombre: "",
                id_analisis_examens:"",
                examen_id:""
            },
            optionsExamen : [],
            formvalores : [],
            tienevalores:false,
            titlemodalanalisis: "Nuevo Análisis",
            // btncreate se usa para todos los formularios
            modalanalisis: false,
            nombreanalisisexist:false,
            summitedH:false,

            tableDataAnalisis: [],

            titleAnalisis: "Tipo de Analisis",
            itemsAnalisis: [
                {
                    text: "Tables"
                },
                {
                    text: "Tipo de Analisis",
                    active: true
                }
            ],
            totalRowsAnalisis: 1,
            currentPageAnalisis: 1,
            perPageAnalisis: 10,
            pageOptionsAnalisis: [10, 25, 50, 100],
            filterAnalisis: null,
            filterOnAnalisis: [],
            sortByAnalisis: "nombre",
            sortDescAnalisis: false,
            fieldsAnalisis: [

                {
                    key: "nombre",
                    sortable: true
                },
                {
                    key: "examen",
                    sortable: true,
                    label: "Examen",
                    formatter: (item) => {

                        return item.nombre;
                    }
                },
                "action"
            ],

            // analisis
        }
    },

    validations: {
        formtipo: {
            nombre: {
                required
            }
        },
        formexamen: {
            nombre: {
                required
            },
            precio_par:{
                required
            },
            precio_lab:{
                required
            },
            precio_pac:{
                required
            },
            codigo:{
                required
            },
            tipoexamen:{
                required
            }
        },
        formanalisis: {
            nombre: {
                required
            },
            examen_id:{
                required
            }
        },
    },

    computed: {
      
        rows() {
            return this.tableData.length;
        },

         rowsExamen() {
            return this.tableDataExamen.length;
        },

        rowsAnalisis() {
            return this.tableDataAnalisis.length;
        }

    },

    mounted() {
        this.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;
        this.totalRowsExamen = this.itemsExamen.length;
        this.totalRowsAnalisis = this.itemsAnalisis.length;
        this.traertipoExamen();
        this.traerExamen();
        this.traerAnalisis();
        this.preloader = false;
    },

    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        onFilteredExamen(filteredItems) {
                    // Trigger pagination to update the number of buttons/pages due to filtering
                    this.totalRowsExamen = filteredItems.length;
                    this.currentPageExamen = 1;
        },
        onFilteredAnalisis(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRowsAnalisis = filteredItems.length;
            this.currentPageAnalisis = 1;
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
        traertipoExamen() {   
            this.axios
                .get(`/api/obtenertipoexamen`)
                .then(response => {
                    this.tableData = response.data;
                    this.tipoexamen = response.data;
                }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
        },

        traerExamen() {
            
            this.axios
                .get(`/api/obtenerexamen`)
                .then(response => {
                    this.btnAccionExamen = true;
                    this.tableDataExamen = response.data;
                    this.optionsExamen = response.data;
                }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
        },

        traerAnalisis() {
            this.axios
                .get(`/api/obteneranalisis`)
                .then(response => {
                    this.tableDataAnalisis = response.data;
                }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
        },

        modalNuevoTipo() {
            this.modaltipo = true;
            this.titlemodaltipo = "Nuevo Tipo Examen";
            this.submitted = false;
            this.typeform = "create";
            this.formtipo = {
                nombre: "",
                id_tipo_examens:""
            };
            this.btnCreate = true;
        },

        modalNuevoExamen() {
            this.modalexamen = true;
            this.titlemodalexamen = "Nuevo Examen";
            this.submitted = false;
            this.typeform = "create";
            this.formexamen = {
                nombre: "",
                precio_lab:"",
                precio_pac: "",
                precio_par: "",
                kids: false,
                codigo:"",
                id_examen:"",
                tipoexamen:""
            };
            this.btnCreate = true;
        },

        modalNuevoAnalisis() {
            this.modalanalisis = true;
            this.titlemodalanalisis = "Nuevo Análisis";
            this.submitted = false;
            this.typeform = "create";
            this.formanalisis = {
                nombre: "",
                examen_id:"",
                id_analisis_examens:""
            };
            this.formvalores = [];
            this.tienevalores = false;
            this.btnCreate = true;
        },

        validarNombreTipo($event) {
            if ($event.target.value.length > 4) {
                this.axios
                    .get(`/api/validarnombretipo/${$event.target.value}`)
                    .then(response => {
                        if (response.data == 1) {
                            this.nombretipoexist = true;
                        } else {
                            this.nombretipoexist = false;
                        }
                    }, error => {
                        this.validarSessionActive(error);
                        return error;
                    });
            }
        },

        validarNombreExamen($event) {
            if ($event.target.value.length > 4) {
                this.axios
                    .get(`/api/validarnombreexamen/${$event.target.value}`)
                    .then(response => {
                        if (response.data == 1) {
                            this.nombreexamenexist = true;
                        } else {
                            this.nombreexamenexist = false;
                        }
                    }, error => {
                        this.validarSessionActive(error);
                        return error;
                    });
            }
        },

        validarNombreAnalisis($event) {
            if ($event.target.value.length > 4) {
                this.axios
                    .get(`/api/validarnombreanalisis/${$event.target.value}`)
                    .then(response => {
                        if (response.data == 1) {
                            this.nombreanalisisexist = true;
                        } else {
                            this.nombreanalisisexist = false;
                        }
                    }, error => {
                        this.validarSessionActive(error);
                        return error;
                    });
            }
        },

        formtipoSubmit() {

            this.submitted = true;
            // stop here if form is invalid
            this.$v.formtipo.$touch();
            

            if (!this.$v.formtipo.$invalid && !this.nombretipoexist) {
                this.btnAccionTipo = false;
                this.axios
                    .post(`/api/creartipoexamen`, this.formtipo)
                    .then(res => {
                        this.btnAccionTipo = true;
                        if (res.data) {
                            if (this.formtipo.id_tipo_examens == "") {
                                Swal.fire({
                                    icon: "success",
                                    title: "Nuevo Tipo Examen",
                                    text: "Ha sido ingreso exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            } else {
                                Swal.fire({
                                    icon: "success",
                                    title: "Tipo Examen Actualizado",
                                    text: "Ha sido actualizado exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            }
                            this.modaltipo = false;
                            this.nombretipoexist = false;
                            this.btnCreate = false;
                            this.submitted = false;
                            this.$v.formtipo.$reset();
                            this.traertipoExamen();
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
                        this.validarNombreAnalisis(error);
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

        formexamenSubmit() {
            if(this.formexamen.precio_lab.length <= 0 || this.formexamen.precio_pac.length <= 0)
            {   
                
                Swal.fire({
                    icon: "warning",
                    title: "Precio Incompleto",
                    text: "Hay precios que aun no se han ingresado.",
                    timer: 1500,
                    showConfirmButton: false
                });
                return;
    
            }
            
            this.submitted = true;
            // stop here if form is invalid
            this.$v.formexamen.$touch();

            if (!this.$v.formexamen.$invalid && !this.nombreexamenexist && !this.codigoexiste) {

                this.btnAccionExamen = false;
                this.axios
                    .post(`/api/crearexamen`, this.formexamen)
                    .then(res => { 
                        this.btnAccionExamen = true;
                        if(res.data.estado == 1)
                        {
                            Swal.fire({
                                icon: "warning",
                                title: "Nuevo Examen",
                                text: "El codigo de examen ya sido ingresado.",
                                timer: 1500,
                                showConfirmButton: false
                            });
                            return false;
                        }
            
                        if (res.data) {
                            if (this.formexamen.id_examen == "") {
                                Swal.fire({
                                    icon: "success",
                                    title: "Codigo Examen",
                                    text: "Ha sido ingreso exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            } else {
                                Swal.fire({
                                    icon: "success",
                                    title: "Examen Actualizado",
                                    text: "Ha sido actualizado exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            }
                            this.modalexamen = false;
                            this.nombreexamenexist = false;
                            this.codigoexiste = false;
                            this.btnCreate = false;
                            this.submitted = false;
                            this.$v.formexamen.$reset();
                            this.traerExamen();
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
                        this.validarNombreAnalisis(error);
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
            this.titlemodaltipo = "Actualizar Tipo Examen";
            this.formtipo.nombre = data.nombre;
            this.formtipo.id_tipo_examens = data.id_tipo_examens;
            this.modaltipo = true;
            this.btnCreate = false;
        },

        filterKey(e) {
            // Si el código es menor que 48 (0) o mayor que 57 (9)
            if(e.keyCode < 48 || e.keyCode > 57) {
                // No se agrega
                e.preventDefault();
            }
        },
        
        checaValor(item) {
            // Obtener valor actual
            let valor = parseInt(item.value);
            // Si no es número o es menor de 1
            if(isNaN(valor) || valor < 1) {
                // Asignar 1
                item.value = 1;
            }
        },

        eliminar(data) {
            if (data.deleted_at == null) {
              var estado = 2;
              var title = "Desactivar Tipo Examen";
              var text = `¿Esta seguro de desativar Tipo Examen ${data.nombre} ?`;
            } else {
              estado = 1;
              title = "Activar Tipo Examen";
              text = `¿Esta seguro de activar Tipo Examen ${data.nombre} ?`;
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
                    `/api/eliminartipoexamen/${data.id_tipo_examens}`
                  )
                  .then((res) => {
                    console.log(res);
                    if (res.data) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Eliminar Tipo Examen',
                        text: "Tipo Examen ha sido desactivado",
                        timer: 1500,
                        showConfirmButton: false
                      });
                    } else {
                      if (estado == 1) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Eliminar Tipo Examen',
                          text: "Tipo Examen Eliminado correctamente",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Eliminar Tipo Examen',
                          text: "Error al desactivar Tipo Examen",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      }
                      type = "error";
                    }

                    this.traertipoExamen();
                  }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
              }
            });
          },

          editarexamen(data) {
          
            this.titlemodalexamen = "Actualizar Examen";
            this.formexamen.nombre = data.nombre;
            this.formexamen.id_examen = data.id_examen;
            this.formexamen.precio_par = data.precio_par,
            this.formexamen.precio_lab = data.precio_lab,
            this.formexamen.precio_pac = data.precio_pac,
            this.formexamen.codigo = data.codigo;
            this.formexamen.tipoexamen = data.tipoexamen;

            if(data.kids == 1){
                this.formexamen.kids = true;

            }else{
                this.formexamen.kids = false;

            }
            this.modalexamen = true;
            this.btnCreate = false;
        },

        eliminarexamen(data) {
            if (data.deleted_at == null) {
              var estado = 2;
              var title = "Desactivar Tipo Examen";
              var text = `¿Esta seguro de desativar Tipo Examen ${data.nombre} ?`;
            } else {
              estado = 1;
              title = "Activar Tipo Examen";
              text = `¿Esta seguro de activar Tipo Examen ${data.nombre} ?`;
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
                    `/api/eliminartipoexamen/${data.id_tipo_examens}`
                  )
                  .then((res) => {
                    console.log(res);
                    if (res.data) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Eliminar Tipo Examen',
                        text: "Tipo Examen ha sido desactivado",
                        timer: 1500,
                        showConfirmButton: false
                      });
                    } else {
                      if (estado == 1) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Eliminar Tipo Examen',
                          text: "Tipo Examen Eliminado correctamente",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Eliminar Tipo Examen',
                          text: "Error al desactivar Tipo Examen",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      }
                      type = "error";
                    }

                    this.traerExamen();
                  }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
              }
            });
          },

          editaranalisis(data) {
            console.log(data);
            this.titlemodalanalisis = "Actualizar Analisis";
            this.formvalores = [];
            this.tienevalores = false;
            let valores = data.valoresreferenciales;

            if(valores.length > 0 ){

                for (let i = 0; i < valores.length; i++) {

                    this.formvalores.push({
                        tipo: valores[i]["tipo"],
                        valor_minimo: valores[i]["valor_minimo"],
                        valor_maximo: valores[i]["valor_maximo"],
                      });

                }

                this.tienevalores = true;
            }
            this.formanalisis.id_analisis_examens = data.id_analisis_examens;
            this.formanalisis.examen_id = data.examen;
            this.formanalisis.nombre = data.nombre;
            this.modalanalisis = true;
            this.btnCreate = false;
        },

        eliminaranalisis(data) {
            if (data.deleted_at == null) {
              var estado = 2;
              var title = "Desactivar Analisis";
              var text = `¿Esta seguro de desativar Analisis ${data.nombre} ?`;
            } else {
              estado = 1;
              title = "Activar Analisis";
              text = `¿Esta seguro de activar Analisis ${data.nombre} ?`;
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
                    `/api/eliminaranalisis/${data.id_analisis_examens}`
                  )
                  .then((res) => {
                    this.traerAnalisis();
                    if (res.data) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Eliminar Analisis',
                        text: "Analisis ha sido desactivado",
                        timer: 1500,
                        showConfirmButton: false
                      });
                    } else {
                      if (estado == 1) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Eliminar Analisis',
                          text: "Analisis Eliminado correctamente",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Eliminar Analisis',
                          text: "Error al desactivar Analisis",
                          timer: 1500,
                          showConfirmButton: false
                        });
                      }
                      type = "error";
                    }

                    // this.traerExamen();
                  }, error => {
                    this.validarSessionActive(error);
                    return error;
                });
              }
            });
          },

          AddformData() {
            if(this.formvalores.length > 0){
                this.summitedH = true;
                let invalido = false;

                for (let i = 0; i < this.formvalores.length; i++) {
                    if(this.formvalores[i].tipo == ''){
                        invalido = true;
                    }else if( this.formvalores[i].valor_maximo == ''){
                        invalido = true;
                    }else if(this.formvalores[i].valor_minimo == ''){
                        invalido = true;
                    }

                }

                if(invalido){
                    return;
                }else{

                    this.formvalores.push({
                        tipo: "",
                        valor_minimo: "",
                        valor_maximo: "",
                      });

                    this.summitedH = false;


                }

            }else{

                this.formvalores.push({
                    tipo: "",
                    valor_minimo: "",
                    valor_maximo: "",
                  });

                  this.summitedH = false;

            }


            this.tienevalores = true;
          },

          deleteRow(index) {
            this.formvalores.splice(index, 1);
          },

          formanalisisSubmit() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.formanalisis.$touch();

            if (!this.$v.formanalisis.$invalid && !this.nombreanalisisexist) {

                this.formanalisis.valores = this.formvalores;
                this.formanalisis.examen_id = this.formanalisis.examen_id.id_examen;
                this.btnAccionAnalisis = false;
                this.axios
                    .post(`/api/crearanalisis`, this.formanalisis)
                    .then(res => {
                        this.btnAccionAnalisis = true;
                        if (res.data) {
                            if (this.formanalisis.id_analisis_examens == "") {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Nuevo Analisis',
                                    text: "Ha sido ingresado exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            } else {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Analisis Actulizado',
                                    text: "Ha sido actualizado exitosamente",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            }
                            this.modalanalisis = false;
                            this.nombreanalisisexist = false;
                            this.btnCreate = false;
                            this.submitted = false;
                            this.$v.formanalisis.$reset();
                            this.formvalores = [];
                            this.traerAnalisis();
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
                        this.validarNombreAnalisis(error);
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

    }
}
