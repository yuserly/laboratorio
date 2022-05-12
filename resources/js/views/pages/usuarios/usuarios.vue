<script src="./usuarios.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Usuarios</h4>

                        <div class="row mt-5">
                            <div class="col-12">
                                <button
                                    type="button"
                                    class="btn btn-success waves-effect waves-light float-end"
                                    v-b-modal.crearusuario
                                    @click="modalNuevo"
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    Crear Usuario
                                </button>
                            </div>
                        </div>
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
                            <b-tab active>
                                <template v-slot:title>
                                    <span class="d-inline-block d-sm-none">
                                        <i class="fas fa-home"></i>
                                    </span>
                                    <span class="d-none d-sm-inline-block"
                                        >Administradores</span
                                    >
                                </template>

                                <div class="row">
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
                                                                        v-b-modal.crearusuario
                                                                        data-toggle="modal"
                                                                        data-target=".bs-example-crearusuario"
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
                                                            <ul
                                                                class="list-inline mb-0"
                                                                v-else
                                                            >
                                                                <li
                                                                    class="list-inline-item"
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        v-on:click="
                                                                            activar(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-primary"
                                                                        v-b-tooltip.hover
                                                                        title="Activar"
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
                            <b-tab>
                                <template v-slot:title>
                                    <span class="d-inline-block d-sm-none">
                                        <i class="far fa-user"></i>
                                    </span>
                                    <span class="d-none d-sm-inline-block"
                                        >Profesionales</span
                                    >
                                </template>

                                <div class="row">
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
                                                                        perPageProfesional
                                                                    "
                                                                    size="sm"
                                                                    :options="
                                                                        pageOptionsProfesional
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
                                                                        filterProfesional
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
                                                            tableDataProfesional
                                                        "
                                                        :fields="
                                                            fieldsProfesional
                                                        "
                                                        responsive="sm"
                                                        :per-page="
                                                            perPageProfesional
                                                        "
                                                        :current-page="
                                                            currentPageProfesional
                                                        "
                                                        :sort-by.sync="
                                                            sortByProfesional
                                                        "
                                                        :sort-desc.sync="
                                                            sortDescProfesional
                                                        "
                                                        :filter="
                                                            filterProfesional
                                                        "
                                                        :filter-included-fields="
                                                            filterOnProfesional
                                                        "
                                                        @filtered="
                                                            onFilteredProfesional
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
                                                                            editar(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-primary"
                                                                        v-b-modal.crearusuario
                                                                        data-toggle="modal"
                                                                        data-target=".bs-example-crearusuario"
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
                                                            <ul
                                                                class="list-inline mb-0"
                                                                v-else
                                                            >
                                                                <li
                                                                    class="list-inline-item"
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        v-on:click="
                                                                            activar(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-primary"
                                                                        v-b-tooltip.hover
                                                                        title="Activar"
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
                                                                        currentPageProfesional
                                                                    "
                                                                    :total-rows="
                                                                        rowsProfesional
                                                                    "
                                                                    :per-page="
                                                                        perPageProfesional
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
                            <b-tab>
                                <template v-slot:title>
                                    <span class="d-inline-block d-sm-none">
                                        <i class="far fa-envelope"></i>
                                    </span>
                                    <span class="d-none d-sm-inline-block"
                                        >Secretarias</span
                                    >
                                </template>

                                <div class="row">
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
                                                                        perPageSecretaria
                                                                    "
                                                                    size="sm"
                                                                    :options="
                                                                        pageOptionsSecretaria
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
                                                                        filterSecretaria
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
                                                            tableDataSecretaria
                                                        "
                                                        :fields="
                                                            fieldsSecretaria
                                                        "
                                                        responsive="sm"
                                                        :per-page="
                                                            perPageSecretaria
                                                        "
                                                        :current-page="
                                                            currentPageSecretaria
                                                        "
                                                        :sort-by.sync="
                                                            sortBySecretaria
                                                        "
                                                        :sort-desc.sync="
                                                            sortDescSecretaria
                                                        "
                                                        :filter="
                                                            filterSecretaria
                                                        "
                                                        :filter-included-fields="
                                                            filterOnSecretaria
                                                        "
                                                        @filtered="
                                                            onFilteredSecretaria
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
                                                                            editar(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-primary"
                                                                        v-b-modal.crearusuario
                                                                        data-toggle="modal"
                                                                        data-target=".bs-example-crearusuario"
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
                                                            <ul
                                                                class="list-inline mb-0"
                                                                v-else
                                                            >
                                                                <li
                                                                    class="list-inline-item"
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        v-on:click="
                                                                            activar(
                                                                                data.item
                                                                            )
                                                                        "
                                                                        class="px-2 text-primary"
                                                                        v-b-tooltip.hover
                                                                        title="Activar"
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
                                                                        currentPageSecretaria
                                                                    "
                                                                    :total-rows="
                                                                        rowsSecretaria
                                                                    "
                                                                    :per-page="
                                                                        perPageSecretaria
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

            <!-- modal -->

            <b-modal
                id="crearusuario"
                size="lg"
                :title="titlemodal"
                title-class="font-18"
                hide-footer
                v-if="modal"
            >
                <div class="row">
                    <div class="col-12">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label>Rol</label>
                                <multiselect
                                    v-model="rol"
                                    :options="roles"
                                    track-by="id"
                                    label="name"
                                ></multiselect>

                                <!-- <span v-if="submitted && !form.prevension_id"
                            >Prevision es requerido.</span
                          > -->
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    class="needs-validation"
                    @submit.prevent="formsaSubmit"
                    v-if="
                        rol.name == 'Administrador' || rol.name == 'Secretaria'
                    "
                >
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="nombres">Nombres</label>
                                <input
                                    id="nombres"
                                    v-model="formsa.nombres"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formsa.nombres.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.formsa.nombres.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formsa.nombres.required"
                                        >Los nombres son requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="apellidos">Apellidos</label>
                                <input
                                    id="apellidos"
                                    v-model="formsa.apellidos"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formsa.apellidos.$error
                                    }"
                                />

                                <div
                                    v-if="
                                        submitted && $v.formsa.apellidos.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.apellidos.required"
                                        >Los Apellidos son requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="email">Email</label>
                                <input
                                    id="email"
                                    v-model="formsa.email"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.formsa.email.$error
                                    }"
                                    @input="validarEmail($event)"
                                />

                                <div
                                    v-if="submitted && $v.formsa.email.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formsa.email.required"
                                        >Email es requerido.</span
                                    >
                                </div>
                                <span class="text-danger" v-if="emailexist"
                                    >Email ya en uso.</span
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

                <form
                    class="needs-validation"
                    enctype="multipart/form-data"
                    @submit.prevent="formpSubmit"
                    v-if="
                        rol.name == 'Profesional Box' ||
                            rol.name == 'Profesional Laboratorio' ||
                            rol.name == 'Profesional Ejecutor'
                    "
                >
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="nombres">Nombres</label>
                                <input
                                    id="nombres"
                                    v-model="formp.nombres"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.formp.nombres.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.formp.nombres.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formp.nombres.required"
                                        >Los nombres son requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="apellidos">Apellidos</label>
                                <input
                                    id="apellidos"
                                    v-model="formp.apellidos"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formp.apellidos.$error
                                    }"
                                />

                                <div
                                    v-if="
                                        submitted && $v.formp.apellidos.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formp.apellidos.required"
                                        >Los Apellidos son requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="email">Email</label>
                                <input
                                    id="email"
                                    v-model="formp.email"
                                    type="email"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.formp.email.$error
                                    }"
                                    @input="validarEmail($event)"
                                />

                                <div
                                    v-if="submitted && $v.formp.email.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formp.email.required"
                                        >Email es requerido.</span
                                    >
                                </div>
                                <span class="text-danger" v-if="emailexist"
                                    >Email ya en uso.</span
                                >
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="rut">Rut</label>
                                <input
                                    id="rut"
                                    v-model="formp.rut"
                                    type="text"
                                    class="form-control inputRUT"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.formp.rut.$error
                                    }"
                                    v-on:input="checkRut(this)"
                                />

                                <div
                                    v-if="submitted && $v.formp.rut.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formp.rut.required"
                                        >Rut es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="profesion">Profesión</label>
                                <input
                                    id="profesion"
                                    v-model="formp.profesion"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formp.profesion.$error
                                    }"
                                />

                                <div
                                    v-if="
                                        submitted && $v.formp.profesion.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formp.profesion.required"
                                        >Profesión es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="firma">Firma</label>
                                <input
                                    id="firma"
                                    type="file"
                                    @change="onFileChange($event)"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.formp.firma.$error
                                    }"
                                    accept="image/*"
                                />

                                <div
                                    v-if="submitted && $v.formp.firma.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formp.firma.required"
                                        >Profesión es requerido.</span
                                    >
                                </div>


                            </div>
                        </div>
                    </div>

                    <button
                        v-if="btnCreate === true"
                        class="btn btn-primary float-end btnSubmit"
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

            <!-- modal -->
        </div>
    </Layout>
</template>
