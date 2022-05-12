<script src="./planes.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Listado Planes</h4>

                        <div class="row mt-5">
                            <div class="col-12">
                                <button
                                    type="button"
                                    class="btn btn-success waves-effect waves-light float-start"
                                    v-b-modal.crearenvio
                                    @click="modalenvio = true"
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    Precio de Envío
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-success waves-effect waves-light float-end"
                                    v-b-modal.crearplan
                                    @click="modalNuevo"
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    Crear Planes
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
                                    v-if="!vistatablaplaninactivo"
                                    type="button"
                                    class="btn btn-success waves-effect waves-light float-star"
                                    @click="traerPlanes()"
                                >
                                    Planes Activos
                                </button>
                                <button
                                    v-else
                                    type="button"
                                    class="btn btn-success waves-effect waves-light float-star"
                                    @click="traerPlanesInactivos()"
                                >
                                    Planes Inactivos
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
                                                v-b-modal.crearplan
                                                data-toggle="modal"
                                                data-target=".bs-example-crearplan"
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
                id="crearplan"
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
                                <label for="nombres">Nombre</label>
                                <input
                                    id="nombres"
                                    v-model="form.nombre"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.nombre.$error
                                    }"
                                    @input="validarNombre($event)"
                                />

                                <div
                                    v-if="submitted && $v.form.nombre.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.nombre.required"
                                        >El nombre es requerido.</span
                                    >
                                </div>

                                <span class="text-danger" v-if="planexist"
                                    >Plan ya creado.</span
                                >
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="cantidad">Cantidad</label>
                                <input
                                    id="cantidad"
                                    v-model="form.cantidad"
                                    type="number"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.cantidad.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.form.cantidad.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.cantidad.required"
                                        >Cantidad es requerida.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="precio">Precio</label>
                                <input
                                    id="precio"
                                    v-model="form.precio"
                                    type="number"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.precio.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.form.precio.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.precio.required"
                                        >Precio es requerido.</span
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

            <!-- modal -->

            <b-modal
                id="crearenvio"
                size="sm"
                title="Precio Envio"
                title-class="font-18"
                hide-footer
                v-if="modalenvio"
            >
                <form class="needs-validation" @submit.prevent="formSubmitPrecio">
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="Precio">Precio</label>
                                <input
                                    id="Precio"
                                    v-model="formenvio.precio"
                                    type="number"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            submittedenvio && $v.formenvio.precio.$invalid
                                    }"
                                />

                                <div
                                    v-if="submittedenvio && $v.formenvio.precio.$invalid"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formenvio.precio.required"
                                        >Precio es requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        class="btn btn-primary float-end"
                        type="submit"
                    >
                        <i class="far fa-save"></i> Guardar
                    </button>
                </form>
            </b-modal>

            <!-- modal -->
        </div>
    </Layout>
</template>
