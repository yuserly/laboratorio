<script src="./crear-examenes.js"></script>

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
                        <h4 class="card-title">Gestión Examenes</h4>
                    </div>
                </div>
            </div>

            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <b-tabs
                            justified
                            nav-class="nav-tabs-custom"
                            content-class="p-3 text-muted"
                        >
                            <!-- tipo de examen -->
                            <b-tab active>
                                <template v-slot:title>
                                    <span class="d-inline-block d-sm-none">
                                        <i class="fas fa-home"></i>
                                    </span>
                                    <span class="d-none d-sm-inline-block"
                                        >Tipo de Examen</span
                                    >
                                </template>

                                <div class="row">
                                    <div class="col-12 mt-5">
                                        <div class="d-grid gap-2">
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-soft-primary btn-sm waves-effect waves-light float-end"
                                                v-b-modal.creartipo
                                                @click="modalNuevoTipo"
                                            >
                                            <i class="fas fa-plus-circle"></i>
                                                Nuevo Tipo de Examen
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row mt-4">
                                                    <div
                                                        class="col-sm-12 col-md-6"
                                                    >
                                                        <div
                                                            id="tickets-table_length"
                                                            class="dataTables_length"
                                                        >
                                                            <label
                                                                class="d-inline-flex align-items-center"
                                                            >
                                                                Mostrar&nbsp;
                                                                <b-form-select
                                                                    v-model="
                                                                        perPage
                                                                    "
                                                                    size="sm"
                                                                    :options="
                                                                        pageOptions
                                                                    "
                                                                ></b-form-select
                                                                >&nbsp;entradas
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <!-- Search -->
                                                    <div
                                                        class="col-sm-12 col-md-6"
                                                    >
                                                        <div
                                                            id="tickets-table_filter"
                                                            class="dataTables_filter text-md-end"
                                                        >
                                                            <label
                                                                class="d-inline-flex align-items-center"
                                                            >
                                                                Buscar:
                                                                <b-form-input
                                                                    v-model="
                                                                        filter
                                                                    "
                                                                    type="search"
                                                                    placeholder="Buscar..."
                                                                    class="form-control form-control-sm ms-2"
                                                                ></b-form-input>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <!-- End search -->
                                                </div>

                                                <div
                                                    class="table-responsive mb-0"
                                                >
                                                    <b-table
                                                        :items="tableData"
                                                        :fields="fields"
                                                        responsive="sm"
                                                        :per-page="perPage"
                                                        :current-page="
                                                            currentPage
                                                        "
                                                        :sort-by.sync="sortBy"
                                                        :sort-desc.sync="
                                                            sortDesc
                                                        "
                                                        :filter="filter"
                                                        :filter-included-fields="
                                                            filterOn
                                                        "
                                                        @filtered="onFiltered"
                                                    >
                                                        <template
                                                            v-slot:cell(action)="
                                                                data
                                                            "
                                                        >
                                                            <ul
                                                                class="list-inline mb-0"
                                                                v-if="
                                                                    !data.item
                                                                        .deleted_at
                                                                "
                                                            >
                                                                <li
                                                                    class="list-inline-item"
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        v-on:click="
                                                                            editar(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-primary"
                                                                        v-b-modal.creartipo
                                                                        data-toggle="modal"
                                                                        data-target=".bs-example-creartipo"
                                                                        v-b-tooltip.hover
                                                                        title="Editar"
                                                                    >
                                                                        <i
                                                                            class="uil uil-pen font-size-18"
                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    class="list-inline-item"
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        v-on:click="
                                                                            eliminar(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-danger"
                                                                        v-b-tooltip.hover
                                                                        title="Eliminar"
                                                                    >
                                                                        <i
                                                                            class="uil uil-power font-size-18"
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
                                                                    v-model="
                                                                        currentPage
                                                                    "
                                                                    :total-rows="
                                                                        rows
                                                                    "
                                                                    :per-page="
                                                                        perPage
                                                                    "
                                                                ></b-pagination>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-tab>

                            <!-- examenes -->

                            <b-tab>
                                <template v-slot:title>
                                    <span class="d-inline-block d-sm-none">
                                        <i class="fas fa-home"></i>
                                    </span>
                                    <span class="d-none d-sm-inline-block"
                                        >Examenes</span
                                    >
                                </template>

                                <div class="row">
                                    <div class="col-12 mt-5">
                                        <div class="d-grid gap-2">
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-soft-primary btn-sm waves-effect waves-light float-end"
                                                v-b-modal.crearexamen
                                                @click="modalNuevoExamen"
                                            >
                                            <i class="fas fa-plus-circle"></i>
                                                Nuevo Examen
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row mt-4">
                                                    <div
                                                        class="col-sm-12 col-md-6"
                                                    >
                                                        <div
                                                            id="tickets-table_length"
                                                            class="dataTables_length"
                                                        >
                                                            <label
                                                                class="d-inline-flex align-items-center"
                                                            >
                                                                Mostrar&nbsp;
                                                                <b-form-select
                                                                    v-model="
                                                                        perPageExamen
                                                                    "
                                                                    size="sm"
                                                                    :options="
                                                                        pageOptionsExamen
                                                                    "
                                                                ></b-form-select
                                                                >&nbsp;entradas
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <!-- Search -->
                                                    <div
                                                        class="col-sm-12 col-md-6"
                                                    >
                                                        <div
                                                            id="tickets-table_filter"
                                                            class="dataTables_filter text-md-end"
                                                        >
                                                            <label
                                                                class="d-inline-flex align-items-center"
                                                            >
                                                                Buscar:
                                                                <b-form-input
                                                                    v-model="
                                                                        filterExamen
                                                                    "
                                                                    type="search"
                                                                    placeholder="Buscar..."
                                                                    class="form-control form-control-sm ms-2"
                                                                ></b-form-input>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <!-- End search -->
                                                </div>

                                                <div
                                                    class="table-responsive mb-0"
                                                >
                                                    <b-table
                                                        :items="tableDataExamen"
                                                        :fields="fieldsExamen"
                                                        responsive="sm"
                                                        :per-page="
                                                            perPageExamen
                                                        "
                                                        :current-page="
                                                            currentPageExamen
                                                        "
                                                        :sort-by.sync="
                                                            sortByExamen
                                                        "
                                                        :sort-desc.sync="
                                                            sortDescExamen
                                                        "
                                                        :filter="filterExamen"
                                                        :filter-included-fields="
                                                            filterOnExamen
                                                        "
                                                        @filtered="
                                                            onFilteredExamen
                                                        "
                                                    >
                                                        <template
                                                            v-slot:cell(action)="
                                                                data
                                                            "
                                                        >
                                                            <ul
                                                                class="list-inline mb-0"
                                                                v-if="
                                                                    !data.item
                                                                        .deleted_at
                                                                "
                                                            >
                                                                <li
                                                                    class="list-inline-item"
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        v-on:click="
                                                                            editarexamen(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-primary"
                                                                        v-b-modal.crearexamen
                                                                        data-toggle="modal"
                                                                        data-target=".bs-example-crearexamen"
                                                                        v-b-tooltip.hover
                                                                        title="Editar"
                                                                    >
                                                                        <i
                                                                            class="uil uil-pen font-size-18"
                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    class="list-inline-item"
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        v-on:click="
                                                                            eliminarexamen(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-danger"
                                                                        v-b-tooltip.hover
                                                                        title="Eliminar"
                                                                    >
                                                                        <i
                                                                            class="uil uil-power font-size-18"
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
                                                                    v-model="
                                                                        currentPageExamen
                                                                    "
                                                                    :total-rows="
                                                                        rowsExamen
                                                                    "
                                                                    :per-page="
                                                                        perPageExamen
                                                                    "
                                                                ></b-pagination>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-tab>

                            <!-- analisis examen -->

                            <b-tab>
                                <template v-slot:title>
                                    <span class="d-inline-block d-sm-none">
                                        <i class="fas fa-home"></i>
                                    </span>
                                    <span class="d-none d-sm-inline-block"
                                        >Analisis Examen</span
                                    >
                                </template>

                                <div class="row">
                                    <div class="col-12 mt-5">
                                        <div class="d-grid gap-2">
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-block btn-soft-primary btn-sm waves-effect waves-light float-end"
                                                v-b-modal.crearanalisis
                                                @click="modalNuevoAnalisis"
                                            >
                                            <i class="fas fa-plus-circle"></i>
                                                Analisis de Examen
                                            </button>
                                        </div>

                                    </div>
                                    <div class="col-lg-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row mt-4">
                                                    <div
                                                        class="col-sm-12 col-md-6"
                                                    >
                                                        <div
                                                            id="tickets-table_length"
                                                            class="dataTables_length"
                                                        >
                                                            <label
                                                                class="d-inline-flex align-items-center"
                                                            >
                                                                Mostrar&nbsp;
                                                                <b-form-select
                                                                    v-model="
                                                                        perPageAnalisis
                                                                    "
                                                                    size="sm"
                                                                    :options="
                                                                        pageOptionsAnalisis
                                                                    "
                                                                ></b-form-select
                                                                >&nbsp;entradas
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <!-- Search -->
                                                    <div
                                                        class="col-sm-12 col-md-6"
                                                    >
                                                        <div
                                                            id="tickets-table_filter"
                                                            class="dataTables_filter text-md-end"
                                                        >
                                                            <label
                                                                class="d-inline-flex align-items-center"
                                                            >
                                                                Buscar:
                                                                <b-form-input
                                                                    v-model="
                                                                        filterAnalisis
                                                                    "
                                                                    type="search"
                                                                    placeholder="Buscar..."
                                                                    class="form-control form-control-sm ms-2"
                                                                ></b-form-input>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <!-- End search -->
                                                </div>

                                                <div
                                                    class="table-responsive mb-0"
                                                >
                                                    <b-table
                                                        :items="
                                                            tableDataAnalisis
                                                        "
                                                        :fields="fieldsAnalisis"
                                                        responsive="sm"
                                                        :per-page="
                                                            perPageAnalisis
                                                        "
                                                        :current-page="
                                                            currentPageAnalisis
                                                        "
                                                        :sort-by.sync="
                                                            sortByAnalisis
                                                        "
                                                        :sort-desc.sync="
                                                            sortDescAnalisis
                                                        "
                                                        :filter="filterAnalisis"
                                                        :filter-included-fields="
                                                            filterOnAnalisis
                                                        "
                                                        @filtered="
                                                            onFilteredAnalisis
                                                        "
                                                    >
                                                        <template
                                                            v-slot:cell(action)="
                                                                data
                                                            "
                                                        >
                                                            <ul
                                                                class="list-inline mb-0"
                                                                v-if="
                                                                    !data.item
                                                                        .deleted_at
                                                                "
                                                            >
                                                                <li
                                                                    class="list-inline-item"
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        v-on:click="
                                                                            editaranalisis(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-primary"
                                                                        v-b-modal.crearanalisis
                                                                        data-toggle="modal"
                                                                        data-target=".bs-example-crearanalisis"
                                                                        v-b-tooltip.hover
                                                                        title="Editar"
                                                                    >
                                                                        <i
                                                                            class="uil uil-pen font-size-18"
                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    class="list-inline-item"
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        v-on:click="
                                                                            eliminaranalisis(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-danger"
                                                                        v-b-tooltip.hover
                                                                        title="Eliminar"
                                                                    >
                                                                        <i
                                                                            class="uil uil-power font-size-18"
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
                                                                    v-model="
                                                                        currentPageAnalisis
                                                                    "
                                                                    :total-rows="
                                                                        rowsAnalisis
                                                                    "
                                                                    :per-page="
                                                                        perPageAnalisis
                                                                    "
                                                                ></b-pagination>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-tab>
                        </b-tabs>
                    </div>
                </div>
            </div>

            <!-- modal tipo -->

            <b-modal
                id="creartipo"
                size="md"
                :title="titlemodaltipo"
                title-class="font-18"
                hide-footer
                v-if="modaltipo"
            >
                <form class="needs-validation" @submit.prevent="formtipoSubmit">
                    <div class="row">
                        <div class="col-12 ">
                            <div class="mb-3">
                                <label for="nombre">Nombre</label>
                                <input
                                    id="nombre"
                                    v-model="formtipo.nombre"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formtipo.nombre.$error
                                    }"
                                    @input="validarNombreTipo($event)"
                                />

                                <div
                                    v-if="
                                        submitted && $v.formtipo.nombre.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formtipo.nombre.required"
                                        >El nombre es requerido.</span
                                    >
                                </div>
                                <span class="text-danger" v-if="nombretipoexist"
                                    >Tipo de Examen ya existe.</span
                                >
                            </div>
                        </div>
                    </div>

                    <div v-if="btnAccionTipo == true">
                        <button
                        v-if="btnCreate === true"
                        class="btn btn-success btn-soft-success btn-sm float-end "
                        type="submit"
                        >
                            <i class="far fa-save"></i> Ingresar
                        </button>
                        <button
                            v-else
                            class="btn btn-success btn-soft-success btn-sm float-end btnSubmit"
                            type="submit"
                        >
                            <i class="fas fa-sync"></i> Actualizar
                        </button>
                    </div>
                    <div v-else>
                        <button
                            class="btn btn-warning btn-soft-warning btn-sm float-end"
                            type="button"
                            disabled
                        >
                            <i class="fas fa-sync"></i> Espere...
                        </button>
                    </div>

                </form>
            </b-modal>

            <!-- modal tipo -->

            <!-- modal examen -->

            <b-modal
                id="crearexamen"
                size="lg"
                :title="titlemodalexamen"
                title-class="font-18"
                hide-footer
                v-if="modalexamen"
            >
                <form
                    class="needs-validation"
                    @submit.prevent="formexamenSubmit"
                >
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label>Tipo de Examen</label>
                                <multiselect
                                    v-model="formexamen.tipoexamen"
                                    :options="tipoexamen"
                                    track-by="id_tipo_examens"
                                    label="nombre"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formexamen.tipoexamen.$error
                                    }"
                                ></multiselect>

                                <span style="color: red;" v-if="submitted && !formexamen.tipoexamen"
                            >Examen es requerido.</span
                          >
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="codigo">Codigo</label>
                                <input
                                    id="codigo"
                                    v-model="formexamen.codigo"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formexamen.codigo.$error
                                    }"
                                />

                                <div
                                    v-if="
                                        submitted && $v.formexamen.codigo.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formexamen.codigo.required"
                                        >El codigo es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-12">
                            <div class="mb-3">
                                <label for="nombre">Nombre</label>
                                <input
                                    id="nombre"
                                    v-model="formexamen.nombre"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formexamen.nombre.$error
                                    }"
                                    @input="validarNombreExamen($event)"
                                />

                                <div
                                    v-if="
                                        submitted && $v.formexamen.nombre.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formexamen.nombre.required"
                                        >El nombre es requerido.</span
                                    >
                                </div>
                                <span
                                    class="text-danger"
                                    v-if="nombreexamenexist"
                                >
                                    Examen ya existe.</span
                                >
                            </div>
                        </div>

                        <div class="col-12 col-lg-4">
                            <div class="mb-3">
                                <label for="precio_lab">Precio Laboratorio</label>
                                <input
                                    id="precio_lab"
                                    v-model="formexamen.precio_lab"
                                    type="number"
                                    placeholder="0"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formexamen.precio_lab.$error
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted && $v.formexamen.precio_lab.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formexamen.precio_lab.required"
                                        >El precio es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4">
                            <div class="mb-3">
                                <label for="precio_pac">Precio Copago</label>
                                <input
                                    id="precio_pac"
                                    v-model="formexamen.precio_pac"
                                    type="number"
                                    placeholder="0"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formexamen.precio_pac.$error
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted && $v.formexamen.precio_pac.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formexamen.precio_pac.required"
                                        >El precio es requerido.</span
                                    >
                                </div>


                            </div>
                        </div>

                        <div class="col-12 col-lg-4">
                            <div class="mb-3">
                                <label for="precio_par">Precio Particular</label>
                                <input
                                    id="precio_par"
                                    v-model="formexamen.precio_par"
                                    type="number"
                                    placeholder="0"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formexamen.precio_par.$error
                                    }"
                                />

                                <div
                                    v-if="
                                        submitted && $v.formexamen.precio_par.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formexamen.precio_par.required"
                                        >El precio es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        v-model="formexamen.kids"
                                    />
                                    <label
                                        class="form-check-label"
                                        for="flexCheckDefault"
                                    >
                                        ¿Aplicable en niños?
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="btnAccionExamen == true">
                        <button
                        v-if="btnCreate === true"
                        class="btn btn-success btn-soft-success btn-sm float-end "
                        type="submit"
                        >
                            <i class="far fa-save"></i> Nuevo
                        </button>
                        <button
                            v-else
                            class="btn btn-success btn-soft-success btn-sm float-end btnSubmit"
                            type="submit"
                        >
                            <i class="fas fa-sync"></i> Actualizar
                        </button>
                    </div>
                    <div v-else>
                        <button
                            class="btn btn-warning btn-soft-warning btn-sm float-end"
                            type="button"
                            disabled
                        >
                            <i class="fas fa-sync"></i> Espere...
                        </button>
                    </div>

                </form>
            </b-modal>

            <!-- modal examen -->

            <!-- modal analisis -->

            <b-modal
                id="crearanalisis"
                size="md"
                :title="titlemodalanalisis"
                title-class="font-18"
                hide-footer
                v-if="modalanalisis"
            >
                <form
                    class="needs-validation"
                    @submit.prevent="formanalisisSubmit"
                >
                    <div class="row">
                        <div class="col-12 ">
                            <div class="mb-3">
                                <label>Examen</label>
                                <multiselect
                                    v-model="formanalisis.examen_id"
                                    :options="optionsExamen"
                                    track-by="id_examen"
                                    label="nombre"
                                ></multiselect>

                                <span style="color: red;" v-if="submitted && !formanalisis.examen_id"
                                    >Examen es requerido.</span
                                >
                            </div>
                        </div>
                        <div class="col-12 ">
                            <div class="mb-3">
                                <label for="nombre">Nombre</label>
                                <input
                                    id="nombre"
                                    v-model="formanalisis.nombre"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formanalisis.nombre.$error
                                    }"
                                    @input="validarNombreAnalisis($event)"
                                />

                                <div
                                    v-if="
                                        submitted &&
                                            $v.formanalisis.nombre.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="!$v.formanalisis.nombre.required"
                                        >El nombre es requerido.</span
                                    >
                                </div>
                                <span
                                    class="text-danger"
                                    v-if="nombreanalisisexist"
                                    >Analisis de Examen ya existe.</span
                                >
                            </div>
                        </div>
                        <div class="col-12 col-md-6 ">
                            <div class="mb-3">
                                <label for="unidad">Unidad</label>
                                <input
                                    id="unidad"
                                    v-model="formanalisis.unidad"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formanalisis.unidad.$error
                                    }"
                                />

                                <div
                                    v-if="
                                        submitted &&
                                            $v.formanalisis.unidad.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="!$v.formanalisis.unidad.required"
                                        >La unidad es requerida.</span
                                    >
                                </div>

                            </div>
                        </div>

                        <hr />
                        <div class="col-12 col-lg-12" v-if="tienevalores">
                            <div class="mb-3">
                                <div
                                    v-for="(field, i) in formvalores"
                                    :key="field.id"
                                    class="row mb-3"
                                >
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-3">
                                                <label for="tipo"><small> Tipo </small></label>
                                                <input
                                                    id="tipo"
                                                    v-model="
                                                        formvalores[i].tipo
                                                    "
                                                    type="text"
                                                    class="form-control form-control-sm"
                                                />
                                                <span
                                                    class="text-danger"
                                                    v-if="
                                                        !formvalores[i].tipo &&
                                                            summitedH
                                                    "
                                                    >Tipo requerido.</span
                                                >
                                            </div>
                                            <div class="col-3">
                                                <label for="valor_minimo"
                                                    ><small> Valor minimo </small></label
                                                >
                                                <input
                                                    id="valor_minimo"
                                                    v-model="
                                                        formvalores[i]
                                                            .valor_minimo
                                                    "
                                                    type="text"
                                                    class="form-control form-control-sm"
                                                />
                                                <span
                                                    class="text-danger"
                                                    v-if="
                                                        !formvalores[i]
                                                            .valor_minimo &&
                                                            summitedH
                                                    "
                                                    >Valor minimo.</span
                                                >
                                            </div>
                                            <div class="col-3">
                                                <label for="valor_maximo"
                                                    ><small> Valor Maximo </small></label
                                                >
                                                <input
                                                    id="valor_maximo"
                                                    v-model="
                                                        formvalores[i]
                                                            .valor_maximo
                                                    "
                                                    type="text"
                                                    class="form-control form-control-sm"
                                                />
                                                <span
                                                    class="text-danger"
                                                    v-if="
                                                        !formvalores[i]
                                                            .valor_maximo &&
                                                            summitedH
                                                    "
                                                    >Valor Maximo
                                                    requerida.</span
                                                >
                                            </div>
                                            <div class="col-1">
                                                <label for=""> <small> Eliminar </small></label>
                                                <div
                                                    class="col-lg-2 align-self-center d-grid"
                                                >
                                                    <button
                                                        type="button"
                                                        class="btn btn-danger btn-block btn-sm"
                                                        @click="deleteRow(i)"
                                                    >
                                                        <i
                                                            class="fa fa-trash"
                                                        ></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6">
                            <button
                                type="button"
                                class="btn btn-warning btn-soft-warning btn-sm mt-3 mt-lg-0 mb-3 float-end"
                                @click="AddformData"
                                style="margin-right: 10px;"
                            >
                                <i class="fa fa-plus-circle"></i>
                                Agregar Valores Referenciales
                            </button>
                        </div>
                        <div class="col-6" v-if="btnAccionAnalisis == true">
                            <button
                                v-if="btnCreate === true"
                                class="btn btn-success btn-soft-success btn-sm float-end "
                                type="submit"
                            >
                                <i class="far fa-save"></i> Nuevo
                            </button>
                            <button
                                v-else
                                class="btn btn-success btn-soft-success btn-sm float-end btnSubmit"
                                type="submit"
                            >
                                <i class="fas fa-sync"></i> Actualizar
                            </button>
                        </div>
                        <div class="col-6" v-else>
                            <button
                                class="btn btn-warning btn-soft-warning btn-sm float-end"
                                type="button"
                                disabled
                            >
                                <i class="fas fa-sync"></i> Espere...
                            </button>
                        </div>
                    </div>


                </form>
            </b-modal>

            <!-- modal analisis -->
        </div>
    </Layout>
</template>
