<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import appConfig from "../../../app.config.json";
import Swal from "sweetalert2";
import moment from "moment";
import { required } from "vuelidate/lib/validators";

export default {
    components: { Layout, PageHeader },

    page: {
        title: "Listado Alumnos",
        meta: [
            {
                name: "description",
                content: appConfig.description
            }
        ]
    },

    data() {
        return {
            // tabla

            tableData: [],
            form: {
                idalumno: "",
                nombre: "",
                curso: "",
                colegio: ""
            },
            submitted: false,
            title: "Alumnos",
            modal: false,
            titlemodal: 'Datos del Alumno',
            apoderado: '',
            alumnos: '',
            plancontratado: '',
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Alumnos",
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
                    key: "apoderados.nombre",
                    sortable: true,
                    label: "Apoderado"
                },
                {
                    key: "nombre",
                    sortable: true,
                    label: "Nombre del Alumno"
                },
                {
                    key: "curso",
                    sortable: true,
                    label: "Curso"
                },
                {
                    key: "colegio",
                    sortable: true,
                    label: "Colegio"
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
            curso: {
                required
            },
            colegio: {
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
        this.traerAlumnos();
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        traerAlumnos() {
            this.axios.get(`/api/obteneralumnos/`).then(response => {
                console.log(response);
                this.tableData = response.data;
                //this.alumnos = data.detalleventa;
                //this.apoderado = response.data.qr.alumnoqr.dellateventa.venta.apoderado.nombre;
                //this.plancontratado = data.plan.nombre;

            });
        },
        onlyNumber ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                $event.preventDefault();
            }
        },
        editar(data) {
            this.form.idalumno = data.id_alumno;
            this.form.nombre = data.nombre;
            this.form.curso = data.curso;
            this.form.colegio = data.colegio;
            
            this.modal = true;
        },
        formSubmit() {
            this.submitted = true;
            
            this.$v.form.$touch();
            if (!this.$v.form.$invalid) {
                this.axios
                    .post(`/api/updatealumno`, this.form)
                    .then(res => {
                        console.log(res);
                        if(res.data==1){

                            this.modal = false;

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title:
                                    "Datos actualizados correctamente.",
                                showConfirmButton: false,
                                timer: 2000
                            });

                            this.traerAlumnos();

                        }else{

                        }
                        
                    })
                    .catch(error => {
                        console.log("error", error);
                    });
            }
        },
    }
};
</script>

<template>
    <Layout>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Listado Alumnos</h4>
                    </div>
                </div>
            </div>

            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row mt-4">
                            <div class="col-sm-12 col-md-6">
                                <div
                                    id="tickets-table_length"
                                    class="dataTables_length"
                                >
                                    <label
                                        class="d-inline-flex align-items-center"
                                    >
                                        Mostrar&nbsp;
                                        <b-form-select
                                            v-model="perPage"
                                            size="sm"
                                            :options="pageOptions"
                                        ></b-form-select
                                        >&nbsp;entradas
                                    </label>
                                </div>
                            </div>
                            <!-- Search -->
                            <div class="col-sm-12 col-md-6">
                                <div
                                    id="tickets-table_filter"
                                    class="dataTables_filter text-md-end"
                                >
                                    <label
                                        class="d-inline-flex align-items-center"
                                    >
                                        Buscar:
                                        <b-form-input
                                            v-model="filter"
                                            type="search"
                                            placeholder="Buscar..."
                                            class="form-control form-control-sm ms-2"
                                        ></b-form-input>
                                    </label>
                                </div>
                            </div>
                            <!-- End search -->
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table
                                :items="tableData"
                                :fields="fields"
                                responsive="sm"
                                :per-page="perPage"
                                :current-page="currentPage"
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :filter="filter"
                                :filter-included-fields="filterOn"
                                @filtered="onFiltered"
                            >
                            <template v-slot:cell(action)="data">
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item">
                                        <a
                                            href="javascript:void(0);"
                                            v-on:click="editar(data.item)"
                                            class="px-2 text-primary"
                                            v-b-modal.actualizarcliente
                                            data-toggle="modal"
                                            data-target=".bs-example-actualizarcliente"
                                            v-b-tooltip.hover
                                            title="Editar"
                                        >
                                            <i
                                                class="uil uil-pen font-size-18"
                                            ></i>
                                        </a>
                                    </li>
                                </ul>

                            </template>
                            </b-table>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div
                                    class="dataTables_paginate paging_simple_numbers float-end"
                                >
                                    <ul
                                        class="pagination pagination-rounded mb-0"
                                    >
                                        <!-- pagination -->
                                        <b-pagination
                                            v-model="currentPage"
                                            :total-rows="rows"
                                            :per-page="perPage"
                                        ></b-pagination>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- modal -->

            <b-modal
                id="actualizarcliente"
                size="lg"
                :title="titlemodal"
                title-class="font-18"
                hide-footer
                v-if="modal"
            >
                <form class="needs-validation" @submit.prevent="formSubmit">
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="nombres">Nombre</label>
                                <input
                                    id="nombres"
                                    v-model="form.nombre"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.nombre.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.form.nombre.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.nombre.required"
                                        >El nombre es requerido.</span
                                    >
                                </div>

                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="cantidad">Curso</label>
                                <input
                                    id="cantidad"
                                    v-model="form.curso"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.curso.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.form.curso.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.curso.required"
                                        >Curso es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="precio">Colegio</label>
                                <input
                                    id="precio"
                                    v-model="form.colegio"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.colegio.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.form.colegio.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.colegio.required"
                                        >Colegio es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        class="btn btn-primary float-end"
                        type="submit" 
                    >
                        <i class="far fa-save"></i> Actualizar
                    </button>
                </form>
            </b-modal>

    </Layout>
</template>
