<script src="./ventas.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Listado Ventas</h4>

                        <div class="row mt-1">
                            <div class="col-12">
                                <router-link to="crear-venta"
                                    ><button
                                        type="button"
                                        class="btn btn-success waves-effect waves-light float-end"
                                    >
                                        Crear venta
                                    </button>
                                </router-link>
                            </div>
                        </div>

                        <!--  -->
                    </div>
                </div>
            </div>

            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row mt-4">
                            <!-- <div class="col-12 mb-4">
                                <button
                                    v-if="vistatablapagada"
                                    type="button"
                                    class="btn btn-sm btn-success waves-effect waves-light float-star"
                                    @click="traerVentasPagadas()"
                                >
                                    Pagadas
                                </button>
                                <button
                                    v-if="vistatablapendiente"
                                    type="button"
                                    class="btn btn-sm btn-warning waves-effect waves-light float-star"
                                    @click="traerVentasPendientes()"
                                >
                                    Pendientes
                                </button>
                                <button
                                    v-if="vistatablarechazada"
                                    type="button"
                                    class="btn btn-sm btn-danger waves-effect waves-light float-star"
                                    @click="traerVentasRechazadas()"
                                >
                                    Rechazadas
                                </button>
                                <button
                                    v-if="vistatablaenviada"
                                    type="button"
                                    class="btn btn-sm btn-info waves-effect waves-light float-star"
                                    @click="traerVentasEnviadas()"
                                >
                                    Enviadas
                                </button>
                            </div> -->
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
                                <template v-slot:cell(action)="data">
                                    <ul class="list-inline mb-0">
                                        <li
                                            class="list-inline-item"
                                            v-if="
                                                (data.item.estado.id_estado ==
                                                    9 ||
                                                    data.item.estado
                                                        .id_estado == 15) &&
                                                    data.item.qr_generados == 0
                                            "
                                        >
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-success waves-effect waves-light float-end"
                                                v-b-modal.generarqr
                                                @click="generarqr(data.item)"
                                            >
                                                <i class="fas fa-qrcode"></i>
                                                Generar QR
                                            </button>
                                        </li>

                                        <li
                                            class="list-inline-item"
                                            v-if="
                                                (data.item.estado.id_estado ==
                                                    9 ||
                                                    data.item.estado
                                                        .id_estado == 15 ||
                                                    data.item.estado
                                                        .id_estado == 16) &&
                                                    data.item.qr_generados == 1
                                            "
                                        >
                                            <button
                                                type="button"
                                                class=" btn btn-sm btn-primary waves-effect waves-light float-end"
                                                @click="
                                                    marcarenviada(data.item)
                                                "
                                            >
                                                <i
                                                    class="fas fa-paper-plane"
                                                ></i>
                                                Despachado Cliente
                                            </button>
                                        </li>

                                        <li
                                            class="list-inline-item"
                                            v-if="
                                                (data.item.estado.id_estado ==
                                                    9 ||
                                                    data.item.estado
                                                        .id_estado == 15 ||
                                                    data.item.estado
                                                        .id_estado == 14 ) &&
                                                    data.item.qr_generados == 1
                                            "
                                        >
                                            <button
                                                type="button"
                                                class=" btn btn-sm btn-primary waves-effect waves-light float-end"
                                                @click="
                                                    marcarqrimprenta(data.item)
                                                "
                                            >
                                                <i
                                                    class="fas fa-paper-plane"
                                                ></i>
                                                Enviar Imprenta
                                            </button>
                                        </li>

                                        <li
                                            class="list-inline-item"
                                            v-if="
                                                (data.item.estado.id_estado ==
                                                    9 ||
                                                    data.item.estado
                                                        .id_estado == 14 ||
                                                    data.item.estado
                                                        .id_estado == 15 ||
                                                    data.item.estado
                                                        .id_estado == 16) &&
                                                    data.item.qr_generados == 1
                                            "
                                        >
                                            <a
                                                class="btn btn-sm btn-danger waves-effect waves-light float-end"
                                                :href="
                                                    urlbackend +
                                                        '/storage/pdf/pdf' +
                                                        data.item.codigo +
                                                        '.pdf'
                                                "
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i class="fas fa-file-pdf"></i>
                                                Descargar QR
                                            </a>
                                        </li>
                                        <li
                                            class="list-inline-item"
                                            v-if="
                                                (data.item.estado.id_estado ==
                                                    9 ||
                                                    data.item.estado
                                                        .id_estado == 14 ||
                                                    data.item.estado
                                                        .id_estado == 15 ||
                                                    data.item.estado
                                                        .id_estado == 16) &&
                                                    data.item.qr_generados == 1
                                            "
                                        >
                                            <button
                                                type="button"
                                                class=" btn btn-sm btn-warning waves-effect waves-light float-end"
                                                v-b-modal.regenerarpdf
                                                @click="
                                                    regenerarpdf(data.item)
                                                "
                                            >
                                            <i class="fas fa-sync-alt"></i>
                                               Regenerar PDF
                                            </button>
                                        </li>
                                        <li
                                            class="list-inline-item"
                                            v-if="
                                                (data.item.estado.id_estado == 8)
                                            "
                                        >
                                            <button
                                                type="button"
                                                class=" btn btn-sm btn-danger waves-effect waves-light float-end"
                                                @click="
                                                    marcarcomopagado(data.item)
                                                "
                                            >
                                            <i class="fa-solid fa-hand-holding-dollar"></i>
                                                Marcar Pagado
                                            </button>
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

            <!-- modal -->

            <b-modal
                id="generarqr"
                size="md"
                title="Generar QR"
                title-class="font-18"
                hide-footer
                v-if="modal"
                no-close-on-backdrop
            >
                <div class="row" v-if="!pdfdisponible">
                    <div class="col d-flex text-center justify-content-center">
                        <div class="row">
                            <div class="col-12">
                                <b-spinner
                                    type="grow"
                                    class="m-2"
                                    variant="primary"
                                    role="status"
                                >
                                </b-spinner>
                            </div>
                            <div class="col-12">
                                <p>Preparando QR</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="pdfdisponible">
                    <div
                        class="col-12 d-flex justify-content-center text-center"
                    >
                        <a
                            type="button"
                            class="btn btn-success waves-effect waves-light"
                            @click="descargarpdf()"
                            :href="pdfdisponible"
                            target="_blank"
                            rel="noopener noreferrer"
                            ><i class="fas fa-plus-circle"></i> Descargar PDF</a
                        >
                    </div>
                </div>
            </b-modal>

            <!-- regenerar QR -->

    <b-modal
                id="regenerarpdf"
                size="md"
                title="Regenerando PDF"
                title-class="font-18"
                hide-footer
                v-if="modalpdf"
                no-close-on-backdrop
            >
                <div class="row">
                    <div class="col d-flex text-center justify-content-center">
                        <div class="row">
                            <div class="col-12">
                                <b-spinner
                                    type="grow"
                                    class="m-2"
                                    variant="primary"
                                    role="status"
                                >
                                </b-spinner>
                            </div>
                            <div class="col-12">
                                <p>Preparando PDF</p>
                            </div>
                        </div>
                    </div>
                </div>
            </b-modal>

            <!-- regenerar QR -->
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
                                                    Colegio:
                                                    {{ alumno.colegio }}
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
                            <div class="col-12  mt-4">
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
    </Layout>
</template>
