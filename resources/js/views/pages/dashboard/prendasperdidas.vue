<script>
import moment from "moment";

export default {
    data() {
        return {
            // tabla

            tableData: [],

            title: "Prendas",
            items: [
                {
                    text: "Tables"
                },
                {
                    text: "Planes",
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
                    key: "qr.code",
                    sortable: true,
                    label: "Codigo QR"
                },
                {
                    key: "nombre",
                    sortable: true
                },

                {
                    key: "email",
                    sortable: true
                },

                {
                    key: "celular",
                    sortable: true
                },

                {
                    key: "estado.nombre",
                    label: "Estado",
                    sortable: true
                },
                {
                    key: "created_at",
                    label: "Fecha",
                    sortable: true,
                    formatter: created_at => {
                        var fecha = moment(created_at).format(
                            "DD/MM/YYYY - h:mm A"
                        );
                        return fecha;
                    }
                },
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

        // this.traerPrendas()

    },
    methods: {

        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        traerPrendas() {
            this.axios.get(`/api/ultimasprendasnotificadas/`).then(response => {
                this.tableData = response.data;
            });
        },

    },
};
</script>

<template>
    <div class="col-xl-12">
        <div class="card">

            <div class="card-body">
            <h4 class="card-title mb-4">Últimas 10 Prendas Notificadas</h4>

                <div class="row mt-4">
                    <div class="col-sm-12 col-md-6">
                        <div
                            id="tickets-table_length"
                            class="dataTables_length"
                        >
                            <label class="d-inline-flex align-items-center">
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
                            <label class="d-inline-flex align-items-center">
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
                    </b-table>
                </div>
            </div>
        </div>
    </div>
</template>
