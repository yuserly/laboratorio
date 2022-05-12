import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import appConfig from "../../../app.config.json";
import Multiselect from "vue-multiselect";
import {
    required,
    email,
    maxLength,
    minLength
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import moment from "moment";

import $ from "jquery";

export default {
    components: { Layout, PageHeader, Multiselect },
    data() {
        return {
            form: {
                nombre: "",
                correo: "",
                telefono: "",
                direccion: "",
                region: "",
                comuna: "",
                alumnos: "",
                idplan: ""
            },
            formalumnos: [],
            precioplan: 0,
            nombreplan: "",
            totalpagar: 0,
            caracteres: 12,
            caracteresapellido: 12,
            caracteresTelefono: 8,
            optionRegiones: [],
            optionComunas: [],
            optionPlanes: [],
            options:[{name:'J. Infantil A'},
               {name:'J. Infantil B'},
               {name:'J. Infantil C'},
               {name:'J. Infantil D'},
               {name:'J. Infantil E'},
               {name:'J. Infantil F'},
               {name:'Play Group A'},
               {name:'Play Group B'},
               {name:'Play Group C'},
               {name:'Play Group D'},
               {name:'Play Group E'},
               {name:'Play Group F'},
               {name:'Pre Kinder A'},
               {name:'Pre Kinder B'},
               {name:'Pre Kinder C'},
               {name:'Pre Kinder D'},
               {name:'Pre Kinder E'},
               {name:'Pre Kinder F'},
               {name:'Kinder A'},
               {name:'Kinder B'},
               {name:'Kinder C'},
               {name:'Kinder D'},
               {name:'Kinder E'},
               {name:'Kinder F'},
               {name:'1° Basico A'},
               {name:'1° Basico B'},
               {name:'1° Basico C'},
               {name:'1° Basico D'},
               {name:'1° Basico E'},
               {name:'1° Basico F'},
               {name:'2° Basico A'},
               {name:'2° Basico B'},
               {name:'2° Basico C'},
               {name:'2° Basico D'},
               {name:'2° Basico E'},
               {name:'2° Basico F'},
               {name:'3° Basico A'},
               {name:'3° Basico B'},
               {name:'3° Basico C'},
               {name:'3° Basico D'},
               {name:'3° Basico E'},
               {name:'3° Basico F'},
               {name:'4° Basico A'},
               {name:'4° Basico B'},
               {name:'4° Basico C'},
               {name:'4° Basico D'},
               {name:'4° Basico E'},
               {name:'4° Basico F'},
               {name:'5° Basico A'},
               {name:'5° Basico B'},
               {name:'5° Basico C'},
               {name:'5° Basico D'},
               {name:'5° Basico E'},
               {name:'5° Basico F'},
               {name:'6° Basico A'},
               {name:'6° Basico B'},
               {name:'6° Basico C'},
               {name:'6° Basico D'},
               {name:'6° Basico E'},
               {name:'6° Basico F'},
               {name:'7° Basico A'},
               {name:'7° Basico B'},
               {name:'7° Basico C'},
               {name:'7° Basico D'},
               {name:'7° Basico E'},
               {name:'7° Basico F'},
               {name:'8° Basico A'},
               {name:'8° Basico B'},
               {name:'8° Basico C'},
               {name:'8° Basico D'},
               {name:'8° Basico E'},
               {name:'8° Basico F'},
               {name:'1° Medio A'},
               {name:'1° Medio B'},
               {name:'1° Medio C'},
               {name:'1° Medio D'},
               {name:'1° Medio E'},
               {name:'1° Medio F'},
               {name:'2° Medio A'},
               {name:'2° Medio B'},
               {name:'2° Medio C'},
               {name:'2° Medio D'},
               {name:'2° Medio E'},
               {name:'2° Medio F'},
               {name:'3° Medio A'},
               {name:'3° Medio B'},
               {name:'3° Medio C'},
               {name:'3° Medio D'},
               {name:'3° Medio E'},
               {name:'3° Medio F'},
               {name:'4° Medio A'},
               {name:'4° Medio B'},
               {name:'4° Medio C'},
               {name:'4° Medio D'},
               {name:'4° Medio E'},
               {name:'4° Medio F'},
              ],
              formalumnostemp: {
                nombre: "",
                apellido:"",
                colegio: "",
                curso: "",
                index: "na",
              },
            modal: false,
            submitted: false,
            submittedalumno: false
        };
    },

    validations: {
        form: {
            nombre: {
                required
            },
            correo: {
                required,
                email
            },
            telefono: {
                required,
                maxLength: maxLength(8),
                minLength: minLength(8)
            },
            direccion: {
                required
            },
            region: {
                required
            },
            comuna: {
                required
            },
            idplan: {
                required
            }
        },
        formalumnostemp: {
            nombre: {
                required,
                maxLength: maxLength(12),
              },
              apellido: {
                required,
                maxLength: maxLength(12),
              },
            colegio: {
                required
            },
            curso: {
                required
            }
        }
    },

    mounted() {
        this.traerPlanes();
        this.traerRegiones();
    },

    methods: {
        onlyNumber($event) {
            let keyCode = $event.keyCode ? $event.keyCode : $event.which;
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                // 46 is dot
                $event.preventDefault();
            }
        },

        traerPlanes() {
            (this.vistatablaplaninactivo = true),
                this.axios.get(`/api/obtenerplanes/`).then(response => {
                    this.optionPlanes = response.data;
                });
        },

        traerRegiones() {
            this.axios.get(`/api/regiones`).then(response => {
                this.optionRegiones = response.data;
            });
        },
        traercomuna() {
            this.axios
                .get(`/api/comuna/${this.form.region.REG_ID}`)
                .then(response => {
                    this.optionComunas = response.data;
                });
        },
        AddAlumno() {
            this.formalumnostemp = {
                nombre: "",
                apellido:"",
                colegio: "",
                curso: "",
                index: "na",
              };
            this.modal = true;
        },
        deleteRow(index) {
            this.formalumnos.splice(index, 1);
            // this.calculopagar();
        },
        // calculopagar() {
        //     var totalalumnos = this.formalumnos.length;

        //     this.totalpagar = totalalumnos * this.precioplan;
        // },
        conteo() {
            var cantidad = this.formalumnostemp.nombre.length;
            this.caracteres = 12 - cantidad;
          },
          conteoapellido() {
            var cantidad = this.formalumnostemp.apellido.length;
            this.caracteresapellido = 12 - cantidad;
          },
        guardar() {
            this.submittedalumno = true;

            this.$v.formalumnostemp.$touch();

            if (!this.$v.formalumnostemp.$invalid) {
                if (this.formalumnostemp.index != "na") {
                    this.formalumnos[
                      this.formalumnostemp.index
                    ].nombre = this.formalumnostemp.nombre;
                    this.formalumnos[
                      this.formalumnostemp.index
                    ].apellido = this.formalumnostemp.apellido;
                    this.formalumnos[
                      this.formalumnostemp.index
                    ].colegio = this.formalumnostemp.colegio;
                    this.formalumnos[
                      this.formalumnostemp.index
                    ].curso = this.formalumnostemp.curso.name;
                  } else {
                    this.formalumnos.push({
                      nombre: this.formalumnostemp.nombre,
                      apellido:this.formalumnostemp.apellido,
                      colegio: this.formalumnostemp.colegio,
                      curso: this.formalumnostemp.curso.name,
                    });
                  }

                // this.calculopagar();

                this.modal = false;
                this.submittedalumno = false;
            }
        },
        editarRow(alumno, i) {
            this.formalumnostemp.nombre = alumno.nombre;
            this.formalumnostemp.apellido = alumno.apellido;
            this.formalumnostemp.colegio = alumno.colegio;
            this.formalumnostemp.curso = this.options.find(option => option.name === alumno.curso);
            this.formalumnostemp.index = i;
            this.conteoapellido();
            this.conteo();
            this.modal = true;
        },

        crearventa() {
            this.submitted = true;

            if (this.formalumnos.length == 0) {
                this.successmsg(
                    "Alumno",
                    "Debes agregar uno o varios alumnos",
                    "error"
                );

                return;
            }

            this.$v.form.$touch();

            this.form.alumnos = this.formalumnos;

            if (!this.$v.form.$invalid) {
                this.axios
                    .post(`/api/aggventa`, this.form)
                    .then(res => {

                        if (res.data == 1) {
                            this.successmsg(
                                "Venta Creada con éxito",
                                "success"
                            );
                            this.$router.push("/ventas");
                        } else {
                            this.successmsg("Error al crear la venta", "error");
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
        successmsg(message, type) {
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
