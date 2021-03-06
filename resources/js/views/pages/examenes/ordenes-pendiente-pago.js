import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";

import $ from "jquery";
import { slice } from "lodash";

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
            inputPrecio: false,
            ordenPorPagar: "",
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
            formpago: {
                id_orden_examenes: "",
                codigo: "",
                efectivo: "",
                debito: "",
                credito: "",
                totalpago: 0,
                totalpagoiva: 0,
                prevision: "",
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
                    label: "CODIGO",
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

        checkRut() {
            var valor = this.form.rut.replace(".", ""); // Quita Punto
            valor = valor.replace("-", ""); // Quita Gui??n
            var cuerpo = valor.slice(0, -1); // Aislar Cuerpo y D??gito Verificador
            var dv = valor.slice(-1).toUpperCase();
            this.form.rut = cuerpo + "-" + dv; // Formatear RUN

            if (cuerpo.length < 7) {
                // Si no cumple con el m??nimo de digitos ej. (n.nnn.nnn)
                $(".inputRUT").attr("style", "border-color: red !important");
                $(".btnSubmit").prop("disabled", true);
                return false;
            }

            var suma = 0; // Calcular D??gito Verificador
            var multiplo = 2;

            for (
                var i = 1;
                i <= cuerpo.length;
                i++ // Para cada d??gito del Cuerpo
            ) {
                var index = multiplo * valor.charAt(cuerpo.length - i); // Obtener su Producto con el M??ltiplo Correspondiente
                suma = suma + index; // Sumar al Contador General
                if (multiplo < 7) {
                    multiplo = multiplo + 1;
                } else {
                    multiplo = 2;
                } // Consolidar M??ltiplo dentro del rango [2,7]
            }

            var dvEsperado = 11 - (suma % 11); // Calcular D??gito Verificador en base al M??dulo 11
            dv = dv == "K" ? 10 : dv; // Casos Especiales (0 y K)
            dv = dv == 0 ? 11 : dv;

            if (dvEsperado != dv) {
                $(".inputRUT").attr("style", "border-color: red !important");
                $(".btnSubmit").prop("disabled", true);
                return false;
            } // Validar que el Cuerpo coincide con su D??gito Verificador

            $(".inputRUT").attr("style", "border-color: #40A944 !important"); // Si todo sale bien, eliminar errores (decretar que es v??lido)
            $(".btnSubmit").prop("disabled", false);
        },

        traerOrden() {
            this.axios
                .get(`/api/obtenordenpendientepago`)
                .then(response => {
                    this.tableData = response.data.examenes;
                    this.options = response.data.previsiones;
                }).catch(error => {
                    console.log("error", error);
                    this.validarSessionActive(error);
                });
        },

        selectPrevision(event)
        {   
            
            if(this.formpago.prevision == null){
                this.formpago.totalpago = 0;
                this.inputPrecio = false;
                return;
            }

            if(this.formpago.prevision.id_prevision == 1)
            {
                var total = 0;
                this.ordenPorPagar.examenorden.map((p) => {
                    total = total+p.examen.precio_pac;
                    return p;
                });
                
            }else{
                var total = 0;
                this.ordenPorPagar.examenorden.map((p) => {
                    total = total+p.examen.precio_par;
                    return p;
                });
                
            }
            this.formpago.totalpago = total;
            this.formpago.totalpagoiva = Math.round(total*1.19);
            this.inputPrecio = true;
        },

        formPagoEmitir()
        {   
            if(this.formpago.debito.length == 0){this.formpago.debito = 0;}

            if(this.formpago.credito.length == 0){this.formpago.credito = 0;}

            if(this.formpago.efectivo.length == 0){this.formpago.efectivo = 0;}
           
            if(parseInt(this.formpago.debito)+parseInt(this.formpago.credito)+parseInt(this.formpago.efectivo) == 0)
            {
                Swal.fire({
                    icon: 'warning',
                    title: 'Medio de Pago',
                    text: "Debe ingresar metodos de pagos.",
                    timer: 1500,
                    showConfirmButton: false
                });
                return false;
            }

            if(parseInt(this.formpago.debito)+parseInt(this.formpago.credito)+parseInt(this.formpago.efectivo) != parseInt(this.formpago.totalpagoiva))
            {   
                Swal.fire({
                    icon: 'warning',
                    title: 'Ops!!',
                    text: "El monto total no es igual a los medios de pago ingresados.",
                    timer: 1500,
                    showConfirmButton: false
                });
                return false;
            }

            var text = `??Esta seguro de marcar como pagada la orden ${this.formpago.codigo} ?`;

            Swal.fire({
                title: "Pago Orden",
                text: text,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Si, Pagar.",
              }).then((result) => {
                if (result.value) {
                  this.axios
                    .post(
                      '/api/marcarpagada', this.formpago
                    )
                    .then((res) => {
                      if (res.data) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Pagar Orden',
                          text: "Orden ha sido pagada exitosamente.",
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
                      this.formpago = {
                          id_orden_examenes: "",
                          codigo: "",
                          debito: "",
                          credito: "",
                          efectivo: "",
                          prevision: "",
                          totalpago: 0,
                      }
                      this.modal = false;
                      this.traerOrden();
                    }).catch(error => {
                        console.log("error", error);
                        this.validarSessionActive(error);
                    });
                }
              });

        },

        pagar(data){
             
            this.ordenPorPagar = data;
        
            
            this.formpago.codigo = data.codigo;
            this.formpago.id_orden_examenes = data.id_orden_examenes;

            this.modal = true;
            this.titlemodal = "Crear Usuario";
            this.submitted = false;
            this.typeform = "create";

        },

    },

}
