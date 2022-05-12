<script src="./crear-examenes.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Examenes</h4>
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
                                        <button
                                            type="button"
                                            class="btn btn-success waves-effect waves-light float-end"
                                            v-b-modal.creartipo
                                            @click="modalNuevoTipo"
                                        >
                                            <i class="fas fa-plus-circle"></i>
                                            Crear Tipo de Examen
                                        </button>
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
                                        <button
                                            type="button"
                                            class="btn btn-success waves-effect waves-light float-end"
                                            v-b-modal.crearexamen
                                            @click="modalNuevoExamen"
                                        >
                                            <i class="fas fa-plus-circle"></i>
                                            Crear Examen
                                        </button>
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
                                        <button
                                            type="button"
                                            class="btn btn-success waves-effect waves-light float-end"
                                            v-b-modal.crearanalisis
                                            @click="modalNuevoAnalisis"
                                        >
                                            <i class="fas fa-plus-circle"></i>
                                            Analisis de Examen
                                        </button>
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

                    <button
                        v-if="btnCreate === true"
                        class="btn btn-primary float-end "
                        type="submit"
                    >
                        <i class="far fa-save"></i> Crear
                    </button>
                    <button
                        v-else
                        class="btn btn-primary float-end btnSubmit"
                        type="submit"
                    >
                        <i class="fas fa-sync"></i> Actualizar
                    </button>
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
                                    track-by="id"
                                    label="nombre"
                                ></multiselect>

                                <!-- <span v-if="submitted && !form.prevension_id"
                            >Prevision es requerido.</span
                          > -->
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
                        <div class="col-12 col-lg-6">
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
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="precio">Precio</label>
                                <input
                                    id="precio"
                                    v-model="formexamen.precio"
                                    type="number"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formexamen.precio.$error
                                    }"
                                />

                                <div
                                    v-if="
                                        submitted && $v.formexamen.precio.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formexamen.precio.required"
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

                    <button
                        v-if="btnCreate === true"
                        class="btn btn-primary float-end "
                        type="submit"
                    >
                        <i class="far fa-save"></i> Crear
                    </button>
                    <button
                        v-else
                        class="btn btn-primary float-end btnSubmit"
                        type="submit"
                    >
                        <i class="fas fa-sync"></i> Actualizar
                    </button>
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
                                    track-by="id"
                                    label="nombre"
                                ></multiselect>

                                <!-- <span v-if="submitted && !form.prevension_id"
                            >Prevision es requerido.</span
                          > -->
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
                                                <label for="tipo">Tipo</label>
                                                <input
                                                    id="tipo"
                                                    v-model="
                                                        formvalores[i].tipo
                                                    "
                                                    type="text"
                                                    class="form-control"
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
                                                    >Valor minimo</label
                                                >
                                                <input
                                                    id="valor_minimo"
                                                    v-model="
                                                        formvalores[i]
                                                            .valor_minimo
                                                    "
                                                    type="text"
                                                    class="form-control"
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
                                                    >Valor Maximo</label
                                                >
                                                <input
                                                    id="valor_maximo"
                                                    v-model="
                                                        formvalores[i]
                                                            .valor_maximo
                                                    "
                                                    type="text"
                                                    class="form-control"
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
                                                <label for="">Eliminar</label>
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

                        <div class="col-12">
                            <button
                                type="button"
                                class="btn btn-success mt-3 mt-lg-0 mb-3 float-end"
                                @click="AddformData"
                                style="margin-right: 10px;"
                            >
                                <i class="fa fa-plus-circle"></i>
                                Agregar Valores Referenciales
                            </button>
                        </div>
                    </div>

                    <button
                        v-if="btnCreate === true"
                        class="btn btn-primary float-end "
                        type="submit"
                    >
                        <i class="far fa-save"></i> Crear
                    </button>
                    <button
                        v-else
                        class="btn btn-primary float-end btnSubmit"
                        type="submit"
                    >
                        <i class="fas fa-sync"></i> Actualizar
                    </button>
                </form>
            </b-modal>

            <!-- modal analisis -->
        </div>
    </Layout>
</template>
