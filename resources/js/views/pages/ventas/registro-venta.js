import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";

import $ from "jquery";

export default {
    components: { Layout, PageHeader,Multiselect },

    page: {
        title: "Recetas",
        meta: [
            {
                name: "description",
                content: "Pagina de Recetas "
            }
        ]
    }, 

    data() {
        return {
            urlbackend: this.$urlBackend,
            modal:false,
            modalPago: false,
            inputPrecio: true,
            ordenPorPagar: "",
            examenes:[],
            options:[],
            form: {
                rut: ""
            },
            formpago: {
                id_venta: "",
                id_orden_examenes: "",
                codigo: "",
                efectivo: "",
                debito: "",
                credito: "",
                totalpago: 0,
                prevision: "",
            }, 
            submitted: false,
            existeventas: false,
            // tabla

            tableData: [],

            title: "Consultas",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Consultas",
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
                    key: "ordenexamen.paciente.rut",
                    label: "RUT  ",
                    sortable: true
                },
                {
                    key: "paciente",
                    label: "Paciente",
                    sortable: true
                },
                {
                    key: "pago",
                    label: "Pago",
                    sortable: true,
                },
                {
                    key: "prevision.nombre",
                    label: "Previsión  ",
                    sortable: true
                },

                "action"
            ]
        };
    },

    validations: {
        form: {
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
        }
    },

    mounted() {
        this.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;
        this.getVentas();
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
            valor = valor.replace("-", ""); // Quita Guión
            var cuerpo = valor.slice(0, -1); // Aislar Cuerpo y Dígito Verificador
            var dv = valor.slice(-1).toUpperCase();
            this.form.rut = cuerpo + "-" + dv; // Formatear RUN

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
        
        getVentas()
        {   
            this.axios
            .get(`/api/getVentasSecretaria`)
            .then(res => {
                res.data.ventas.map((p) => {
                    p['paciente']    = p.ordenexamen.paciente.nombres+' '+p.ordenexamen.paciente.apellidos;
                    p['pago']        = '$'+p.total;
                    return p;
                });
                this.options = res.data.previsiones;
                this.tableData = res.data.ventas;
                this.existeventas = true;
            })
            .catch(error => {
                console.log("error", error);
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
        },

        formSubmit() {
            this.submitted = true;
            this.$v.form.$touch();

            if (!this.$v.form.$invalid) {
                this.axios
                    .get(`/api/derivaciones/${this.form.rut}`)
                    .then(res => {
                        if(res.data == 0)
                        {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Derivaciones',
                                text: "No se han encontrado derivaciones para este paciente",
                                timer: 2500,
                                showConfirmButton: false
                            });
                            this.tableData = "";
                            this.existereceta = false;
                        }else{ 
                            Swal.fire({
                                icon: 'success',
                                title: 'Derivaciones',
                                text: "Derivaciones encontradas",
                                timer: 1000,
                                showConfirmButton: false
                            });
                            this.tableData = res.data.derivacion;
                            this.existereceta = true;
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
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

        selectPrevision()
        {   
            console.log(this.ordenPorPagar);
            if(this.formpago.prevision == null){
                this.formpago.totalpago = 0;
                this.inputPrecio = false;
                return;
            }

            if(this.formpago.prevision.id_prevision == 1)
            {
                var total = 0;
                this.ordenPorPagar.ordenexamen.examenorden.map((p) => {
                    
                    total = total+p.examen.precio_pac;
                    return p;
                });
                
            }else{
                var total = 0;
                this.ordenPorPagar.ordenexamen.examenorden.map((p) => {
                    
                    total = total+p.examen.precio_par;
                    return p;
                });
                
            }
            this.formpago.totalpago = total;
            this.formpago.totalpagoiva = Math.round(total*1.19);
            this.inputPrecio = true;
        },

        Editarpagar(data){
            
            this.ordenPorPagar = data;
        
            this.formpago.id_venta = data.id_venta;
            this.formpago.efectivo = data.pago_efectivo;
            this.formpago.credito = data.pago_credito;
            this.formpago.debito = data.pago_debito;
            this.formpago.totalpagoiva = data.total;
            this.formpago.prevision = data.prevision;
            this.formpago.codigo = data.ordenexamen.codigo;
            // this.formpago.id_orden_examenes = data.id_orden_examenes;

            this.modalPago = true;
            this.titlemodal = "Crear Usuario";
            this.submitted = false;
            this.typeform = "create";

        },

        verorden(data, codigo) {
            //console.log(data.examenorden[0]);
            let examenes = [];

            data.examenorden.forEach(element => {
                examenes.push(element.examen);
            });
             
            this.examenes = examenes;
            this.titlemodal = "Examenes de la Orden "+ codigo;
            this.modal = true;
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

            var text = `¿Esta seguro de marcar como pagada la orden ${this.formpago.codigo} ?`;

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
                      '/api/marcarpagadaactualizar', this.formpago
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
                          id_venta: "",
                          codigo: "",
                          debito: "",
                          credito: "",
                          efectivo: "",
                          prevision: "",
                          totalpago: 0,
                          totalpagoiva: 0,
                      }
                      this.modalPago = false;
                      this.getVentas();
                    }).catch(error => {
                        console.log("error", error);
                        this.validarSessionActive(error);
                    });
                }
              });

        },

    }
};
