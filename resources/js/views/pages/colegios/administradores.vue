<script src="./administradores.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Listado Administradores</h4>

                        <div class="row mt-5">
                            <div class="col-12">
                                <button
                                    type="button"
                                    class="btn btn-success waves-effect waves-light float-end"
                                    v-b-modal.crearadmin
                                    @click="modalNuevo"
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    Crear Administrador
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row mt-4">
                            <div class="col-12 mb-4">
                                <button
                                    v-if="!vistatablaadmininactivo"
                                    type="button"
                                    class="btn btn-success waves-effect waves-light float-star"
                                    @click="traerAdmin()"
                                >
                                    Admin Activos
                                </button>
                                <button
                                    v-else
                                    type="button"
                                    class="btn btn-success waves-effect waves-light float-star"
                                    @click="traerAdminInactivos()"
                                >
                                    Admin Inactivos
                                </button>
                            </div>
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
                                        v-if="!data.item.deleted_at"
                                    >
                                        <li class="list-inline-item">
                                            <a
                                                href="javascript:void(0);"
                                                v-on:click="editar(data.item)"
                                                class="px-2 text-primary"
                                                v-b-modal.crearadmin
                                                data-toggle="modal"
                                                data-target=".bs-example-crearadmin"
                                                v-b-tooltip.hover
                                                title="Editar"
                                            >
                                                <i
                                                    class="uil uil-pen font-size-18"
                                                ></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a
                                                href="javascript:void(0);"
                                                v-on:click="eliminar(data.item)"
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
                                    <ul class="list-inline mb-0" v-else>
                                        <li class="list-inline-item">
                                            <a
                                                href="javascript:void(0);"
                                                v-on:click="activar(data.item)"
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
                id="crearadmin"
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
                                <label for="email">Email</label>
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.email.$error
                                    }"
                                    @input="validarEmail($event)"
                                />

                                <div
                                    v-if="submitted && $v.form.email.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.email.required"
                                        >El email es requerido.</span
                                    >
                                </div>

                                <span class="text-danger" v-if="emailexist"
                                    >Email ya registrado.</span
                                >
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="nombres">Nombres</label>
                                <input
                                    id="nombres"
                                    v-model="form.nombres"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.nombres.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.form.nombres.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.nombres.required"
                                        >Nombres es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="apellidos">Apellidos</label>
                                <input
                                    id="apellidos"
                                    v-model="form.apellidos"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.apellidos.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.form.apellidos.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.apellidos.required"
                                        >apellidos es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="colegio">Colegio</label>

                                <multiselect
                                    v-model="form.colegio_id"
                                    :options="options"
                                    track-by="colegio"
                                    label="nombre"
                                ></multiselect>

                                <span
                                    class="text-danger"
                                    v-if="!form.colegio_id && submitted"
                                    >Colegio requerido.</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="password">Password</label>
                                <input
                                    id="password"
                                    v-model="form.password"
                                    type="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && !form.id_adm_colegio
                                    }"
                                />

                                <div
                                    v-if="submitted  && !form.id_adm_colegio"
                                    class="invalid-feedback"
                                >
                                    <span v-if="submitted && !form.id_adm_colegio"
                                        >Contraseña es requerida.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        v-if="btnCreate === true"
                        class="btn btn-primary float-end"
                        type="submit"
                    >
                        <i class="far fa-save"></i> Crear
                    </button>
                    <button
                        v-else
                        class="btn btn-primary float-end"
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
