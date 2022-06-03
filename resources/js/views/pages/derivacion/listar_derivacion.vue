<script src="./listar_derivacion.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body row">
                        <div class="col-8">
                            <h4 class="card-title">Listado Derivaciones</h4>
                        </div>
                        <div class="col-4">
                                <form
                                    class="needs-validation"
                                    @submit.prevent="formSubmit"
                                >
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="mb-3">
                                                <label for="rut"
                                                    >RUT DEL PACIENTE</label
                                                >
                                                <input
                                                    id="rut"
                                                    v-model="form.rut"
                                                    type="text"
                                                    class="form-control form-control-sm inputRUT"
                                                    :class="{
                                                        'is-invalid':
                                                            submitted &&
                                                            $v.form.rut.$error
                                                    }"
                                                    v-on:input="checkRut(this)"
                                                />

                                                <div
                                                    v-if="
                                                        submitted &&
                                                            $v.form.rut
                                                                .$error
                                                    "
                                                    class="invalid-feedback"
                                                >
                                                    <span
                                                        v-if="
                                                            !$v.form.rut
                                                                .required
                                                        "
                                                        >El Rut es
                                                        requerido.</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-3" style="margin-top: 1.8rem !important;">
                                            <button
                                                type="submit"
                                                class="btn btn-success btn-soft-success btn-sm waves-effect waves-light float-star btnSubmit"
                                            >   <i class="fa fa-search"></i>
                                                Buscar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-12" v-if="existereceta">
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
                                    <ul
                                        class="list-inline mb-0"
                                    >
                                        <li class="list-inline-item">
                                            <a
                                                :href="'/derivacion/'+data.item.codigo"
                                                target="_blank" rel="noopener noreferrer"
                                                class="px-2 text-primary"
                                                v-b-tooltip.hover
                                                title="Editar"
                                            >

                                            <i class="uil-print font-size-18"></i>

                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a
                                                href="javascript:void(0);"
                                                v-on:click="envioderivacion(data.item)"
                                                class="px-2 text-danger"
                                                v-b-tooltip.hover
                                                title="Enviar Derivacion"
                                            >
                                                <i
                                                    class="uil-fast-mail font-size-18"
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
    </Layout>
</template>
