<script src="./analizar-muestra.js"></script>

<template>
    <Layout>

        <loader  v-if="preloader == true"
            object="#622181" 
            color1="#18a096" 
            color2="#93117e" 
            size="5" 
            speed="2" 
            bg="#343a40" 
            objectbg="#999793" 
            opacity="80" 
            name="circular">
        </loader>
        
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">
                            Toma de Muestras Por Analizar
                        </h4>
                    </div>
                </div>
            </div>

            <div class="col-12">
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
                                                v-on:click="verorden(data.item)"
                                                class="px-2 text-info"
                                                v-b-modal.verorden
                                                data-toggle="modal"
                                                data-target=".bs-example-verorden"
                                                v-b-tooltip.hover
                                                title="Ingresar Resultados"
                                            >
                                                <i
                                                    class="uil-dna font-size-18"
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

            <!-- modal ver orden -->

            <b-modal
                id="verorden"
                size="xl"
                :title="titlemodal"
                title-class="font-18"
                hide-footer
                v-if="modal"
            >
                <div class="row">
                    <div class="col-12 ">
                        <div class="row">
                            <div
                                class="col-6"
                                style="border-style: ridge; padding: 5px;"
                                v-for="(item, i) in form.datos"
                                :key="item.id"
                            >
                                <h6><i> Resultado Examen: </i> <b> {{ item.examen }} </b></h6>
                                <hr />
                                <form
                                    class="form-horizontal"
                                    role="form"
                                    v-for="(item2, j) in item.analisis"
                                    :key="item2.id"
                                >
                                    <b-form-group
                                        class="mb-3"
                                        id="example text"
                                        label-cols-sm="6"
                                        label-cols-lg="6"
                                        :label="form.datos[i].analisis[j].nombre"
                                        :label-for="form.datos[i].analisis[j].nombre"
                                    >
                                        <div class="row">
                                            <div class="col-6">
                                                <b-form-input
                                                    type="text"
                                                    :for="
                                                        form.datos[i].analisis[j].nombre
                                                    "
                                                    v-model="
                                                        form.datos[i].analisis[j].valor
                                                    "
                                                    @change="guardarvalores()"
                                                ></b-form-input>
                                                <input
                                                    type="hidden"
                                                    v-model="
                                                        form.datos[i].analisis[j]
                                                            .id_resultados_examenes
                                                    "
                                                />
                                                <input
                                                    type="hidden"
                                                    v-model="
                                                        form.datos[i].analisis[j]
                                                            .analisis_examens_id
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </b-form-group>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <button
                            class="btn btn-primary mt-5"
                            type="button"
                            v-on:click="marcar()"
                        >
                            <i class="fas fa-check"></i> Marcar como muestra
                            tomada
                        </button>
                    </div>
                </div>
            </b-modal>

            <!-- modal ver orden -->
        </div>
    </Layout>
</template>
