<script>
import moment from "moment";

export default {
    data() {
        return {
            modaldetalle: false,
            titledetalle: "",
            alumnos: "",
            apoderado: "",
            plancontratado: "",
            // tabla

            tableData: [],

            title: "Planes",
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
                "codigo",
                {
                    key: "apoderado.nombre",
                    sortable: true,
                    label: " Comprador"
                },
                {
                    key: "apoderado.direccion",
                    label: "Dirección",
                    sortable: true
                },
                {
                    key: "apoderado.region",
                    label: "Region",
                    sortable: true
                },
                {
                    key: "apoderado.comuna",
                    label: "Comuna",
                    sortable: true
                },
                {
                    key: "total",
                    sortable: true,
                    label: "Total",
                    tdClass: "font-weight",
                    formatter: (total, key, item) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0
                        });
                        return formatter.format(total);
                    }
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
                {
                    key: "cantidad",
                    label: "Cantidad QR",
                    sortable: true,
                    formatter: (cantidad, key, item) => {
                        return cantidad * 24;
                    }
                },
                "estado"
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

        // this.traerVentas();
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        traerVentas() {
            this.axios.get(`/api/ultimasventas/`).then(response => {
                this.tableData = response.data;
            });
        },
        detalleventa(data) {
            this.modaldetalle = true;
            this.titledetalle = `Detalle venta ${data.codigo}`;
            this.alumnos = data.detalleventa;
            this.apoderado = data.apoderado.nombre;
            this.plancontratado = data.plan.nombre;
        }
    }
};
</script>

<template>
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">Últimas 10 ventas</h4>

                 <div class="col-12" >

                    <button class="btn">{{$can('Gestion Categoria Vacunas')}}</button>

                </div>

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
                        <template v-slot:cell(codigo)="data">
                            <span
                                v-b-modal.detalleventa
                                @click="detalleventa(data.item)"
                            >
                                {{ data.item.codigo }}
                            </span>
                        </template>
                        <template v-slot:cell(estado)="data">
                            <button
                                type="button"
                                class="btn btn-sm btn-warning waves-effect waves-light"
                                v-if="data.item.estado.id_estado == 8"
                            >
                                {{ data.item.estado.nombre }}
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-success waves-effect waves-light"
                                v-if="
                                    data.item.estado.id_estado == 9 ||
                                        data.item.estado.id_estado == 15
                                "
                            >
                                {{ data.item.estado.nombre }}
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger waves-effect waves-light"
                                v-if="data.item.estado.id_estado == 10"
                            >
                                {{ data.item.estado.nombre }}
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-light waves-effect text-dark waves-light"
                                v-if="data.item.estado.id_estado == 14"
                            >
                                {{ data.item.estado.nombre }}
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-light waves-effect text-dark waves-light"
                                v-if="data.item.estado.id_estado == 16"
                            >
                                {{ data.item.estado.nombre }}
                            </button>
                        </template>
                    </b-table>
                </div>
            </div>
        </div>

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
                            <br />
                            <p>{{ apoderado }}</p>
                        </div>
                        <div class="col-12">
                            <h6 class="float-start mb-2">
                                Alumnos:
                            </h6>
                            <br />
                            <ul
                                class="list-group lista_estudiantes"
                                v-if="alumnos"
                            >
                                <li
                                    class="list-group-item d-flex justify-content-between"
                                    v-for="(alumno, i) in alumnos"
                                    :key="i"
                                >
                                    <div class="row">
                                        <div class="col-12">
                                            <span>
                                                Nombre: {{ alumno.nombre }}
                                            </span>
                                        </div>
                                        <div class="col-12">
                                            <span>
                                                Colegio: {{ alumno.colegio }}
                                            </span>
                                        </div>
                                        <div class="col-12">
                                            <span>
                                                Curso: {{ alumno.curso }}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-12 mt-4">
                            <h6 class="float-start mb-4">
                                Plan Contratado:
                            </h6>
                            <br />
                            <p>{{ plancontratado }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>
