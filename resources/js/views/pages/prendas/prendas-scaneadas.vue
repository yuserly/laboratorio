<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import appConfig from "../../../app.config.json";
import moment from "moment-timezone";

export default {
    components: { Layout, PageHeader },

    page: {
        title: "Prendas Escaneadas",
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

            title: "Prendas Escaneadas",
            modaldetalle: false,
            titledetalle: '',
            apoderado: '',
            colegio: '',
            curso: '',
            alumnonombre: '',
            plancontratado: '',
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Prendas Escaneadas",
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
                /*
                {
                    key: "qr.alumnoqr.dellateventa.venta.apoderado.nombre",
                    sortable: true,
                    label: "Apoderado"
                },
                {
                    key: "qr.code",
                    sortable: true,
                    label: "Codigo QR"
                },*/
                "codigo",
                {
                    key: "created_at",
                    label: "Fecha",
                    sortable: true,
                    formatter: created_at => {
                        var fecha = moment.tz(created_at,"America/Santiago").utc().format(
                            "DD/MM/YYYY - h:mm A"
                        );
                        return fecha;
                    }
                }
            ]
        };
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
        this.traerPrendas();
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        traerPrendas() {
            this.axios.get(`/api/obtenerprendascaneadas/`).then(response => {
                console.log(response);
                this.tableData = response.data;

                //this.alumnos = data.detalleventa;
                //this.apoderado = response.data.qr.alumnoqr.dellateventa.venta.apoderado.nombre;
                //this.plancontratado = data.plan.nombre;

            });
        },
        detalleventa(data){

            console.log(data)

            this.modaldetalle = true;
            this.titledetalle = `Detalle Código ${data.qr.code}`;
            this.apoderado = data.qr.alumnoqr.dellateventa.venta.apoderado.nombre;
            this.colegio = data.qr.alumnoqr.dellateventa.alumnos.colegio;
            this.curso = data.qr.alumnoqr.dellateventa.alumnos.curso;
            this.alumnonombre = data.qr.alumnoqr.dellateventa.alumnos.nombre;

        }
    }
};
</script>

<template>
    <Layout>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Listado Prendas Scaneadas</h4>
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
                            <template v-slot:cell(codigo)="data">
                                <span
                                    v-b-modal.detalleventa
                                    @click="detalleventa(data.item)"
                                >
                                    {{ data.item.qr.code }}
                                </span>
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


        <!--modal-->
        <b-modal
                id="detalleventa"
                size="md"
                :title="titledetalle"
                title-class="font-18"
                hide-footer
                v-if="modaldetalle"
                no-close-on-backdrop
            >
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col-12">
                            <h6 class="float-start mb-4">
                                Apoderado:
                            </h6>
                            <br>
                            <p>{{ apoderado }}</p>
                        </div>
                        <div class="col-12">
                            <h6 class="float-start mb-2">
                                Alumno:
                            </h6>
                            <br>
                            <ul
                                class="list-group lista_estudiantes"
                            >
                                <li
                                    class="list-group-item d-flex justify-content-between"
                                >
                                <div class="row">
                                    <div class="col-12">
                                        <span>
                                        Nombre: {{ alumnonombre }}
                                        </span
                                    >
                                    </div>
                                    <div class="col-12">
                                        <span>
                                        Colegio: {{ colegio }}
                                        </span
                                    >
                                    </div>
                                    <div class="col-12">
                                        <span>
                                        Curso: {{ curso }}
                                        </span
                                    >
                                    </div>
                                </div>

                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </b-modal>

    </Layout>
</template>
