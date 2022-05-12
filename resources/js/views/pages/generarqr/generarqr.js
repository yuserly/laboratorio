import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import appConfig from "../../../app.config.json";
import { required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";

export default {
    page: {
        title: "Generar QR",
        meta: [
            {
                name: "description",
                content: appConfig.description
            }
        ]
    },

    components: {
        Layout,
        PageHeader,
        Multiselect
    },
    data() {
        return {
            title: "Generar QR",
            items: [
                {
                    text: "Lodevuelvo"
                },
                {
                    text: "Generar QR",
                    active: true
                }
            ],

            form: {
                cantidad: ""
            },
            options: [
                { name: "Generar 32 (1 pagina) QR", cantidad: 32 },
                { name: "Generar 64 (2 paginas) QR", cantidad: 64 },
                { name: "Generar 96 (3 paginas) QR", cantidad: 96 }
            ],
            submitted: false,
            cargando: false,
            pdfdisponible: false,
            modal: false
        };
    },

    validations: {
        form: {
            cantidad: {
                required
            }
        }
    },
    methods: {
        formSubmit() {
            this.submitted = true;
            console.log(this.form, "exe");
            // stop here if form is invalid
            this.$v.$touch();
            if (!this.$v.$invalid && this.form.cantidad) {
                this.cargando = true;

                this.axios
                    .post(
                        `/api/generarqr`,
                        this.form
                    )
                    .then(res => {

                        console.log(res)
                        if (res.data == 1) {

                            this.cargando = false;
                            this.pdfdisponible = true;
                            this.$v.form.$reset();
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
                        this.modal = false;
                        this.cargando = false;
                        this.$v.form.$reset();
                    });
            }
        },

        descargarpdf(){

            this.pdfdisponible = false;
            this.modal = false;

        },

        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        }
    }
};
