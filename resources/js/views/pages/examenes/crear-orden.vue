<script src="./crear-orden.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Nueva Orden de Examen</h4>
                    </div>
                </div>
            </div> 

            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <form
                            class="needs-validation"
                            @submit.prevent="formSubmit"
                        > 
                            <div class="row">
                                <div class="col-12 col-lg-3">
                                    <div class="mb-3">
                                        <label for="rut">RUT</label> 
                                        <input
                                            id="rut"
                                            v-model="form.rut"
                                            type="text"
                                            class="form-control inputRUT"
                                            :class="{
                                                'is-invalid':
                                                    submitted &&
                                                    $v.form.rut.$error
                                            }"
                                            v-on:input="checkRut(this)"
                                        />

                                        <div
                                            v-if="
                                                submitted && $v.form.rut.$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span v-if="!$v.form.rut.required"
                                                >Rut es requerido.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-3">
                                    <div class="mb-3">
                                        <label for="nombres">Nombres</label>
                                        <input
                                            id="nombres"
                                            v-model="form.nombres"
                                            type="text"
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    submitted &&
                                                    $v.form.nombres.$error
                                            }"
                                        />

                                        <div
                                            v-if="
                                                submitted &&
                                                    $v.form.nombres.$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span
                                                v-if="!$v.form.nombres.required"
                                                >Los nombres son
                                                requerido.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-3">
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
                                            v-if="
                                                submitted &&
                                                    $v.form.apellidos.$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span
                                                v-if="
                                                    !$v.form.apellidos.required
                                                "
                                                >Los Apellidos son
                                                requerido.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-2">
                                    <div class="mb-3">
                                        <label for="fecha_nacimiento"
                                            >Fecha Nacimiento</label
                                        >
                                        <input
                                            id="fecha_nacimiento"
                                            v-model="form.fecha_nacimiento"
                                            type="date"
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    submitted &&
                                                    $v.form.fecha_nacimiento
                                                        .$error
                                            }"
                                        />

                                        <div
                                            v-if="
                                                submitted &&
                                                    $v.form.fecha_nacimiento
                                                        .$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span
                                                v-if="
                                                    !$v.form.fecha_nacimiento
                                                        .required
                                                "
                                                >La Fecha Nacimiento es
                                                requerida.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-1">
                                    <div class="mb-3">
                                        <label for="edad">Edad</label>
                                        <input
                                            id="edad"
                                            v-model="form.edad"
                                            type="number"
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    submitted &&
                                                    $v.form.edad.$error
                                            }"
                                        />

                                        <div
                                            v-if="
                                                submitted && $v.form.edad.$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span v-if="!$v.form.edad.required"
                                                >Los Edad son requerido.</span
                                            >
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-lg-3">
                                    <div class="mb-3">
                                        <label for="email">Email</label>
                                        <input
                                            id="email"
                                            v-model="form.email"
                                            type="email"
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    submitted &&
                                                    $v.form.email.$error
                                            }"
                                        />

                                        <div
                                            v-if="
                                                submitted &&
                                                    $v.form.email.$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span v-if="!$v.form.email.required"
                                                >Email es requerido.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-3">
                                    <div class="mb-3">
                                        <label for="telefono">Telefono</label>
                                        <input
                                            id="telefono"
                                            v-model="form.telefono"
                                            type="text"
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    submitted &&
                                                    $v.form.telefono.$error
                                            }"
                                        />

                                        <div
                                            v-if="
                                                submitted &&
                                                    $v.form.telefono.$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span
                                                v-if="
                                                    !$v.form.telefono.required
                                                "
                                                >El Telefono es requerido.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="examen"
                                            >Selecciona Examenes</label
                                        >

                                        <multiselect
                                            v-model="form.examen"
                                            :options="options"
                                            track-by="id_examen"
                                            :multiple="true"
                                            label="nombre"
                                        ></multiselect>
                                    </div>
                                </div>
                                <div class="col-12 ">
                                    <div class="mb-3 float-end">
                                        <label for="fecha">Fecha de Emisión</label>
                                        <input
                                            id="fecha"
                                            v-model="form.fecha"
                                            type="date"
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    submitted &&
                                                    $v.form.fecha.$error
                                            }"
                                        />

                                        <div
                                            v-if="
                                                submitted &&
                                                    $v.form.fecha.$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span v-if="!$v.form.fecha.required"
                                                >La Fecha es requerida.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                v-if="btnCreate === true"
                                class="btn btn-primary btn-soft-primary btn-sm float-end "
                                :disabled="disable"
                                type="submit"
                            >
                                <i class="far fa-save"></i> Emitir Orden
                            </button>
                            <button
                                v-else
                                class="btn btn-primary float-end btnSubmit"
                                :disabled="disable"
                                type="submit"
                            >
                                <i class="fas fa-sync"></i> Actualizar
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-12" v-if="ordenpaciente">
                <div class="card">
                    <div class="card-body">
                        <div class="row mt-4">
                            <div class="col-12 mb-2">
                                <h4 class="card-title ">Ordenes del Paciente {{paciente}}</h4>
                            </div>
                            <div class="col-12 shadow-sm mb-3" v-for="item of ordenesexamenpaciente" :key="item.id_orden_examenes">
                                <h6>Examenes Orden  {{item.codigo}} </h6>
                                <ul>
                                    <li @click="addexamenes(item1.examen)" style="cursor:pointer"  v-for="item1 of item.examenorden" :key="item1.id_examenes" >{{item1.examen.nombre}}</li>
                                </ul>
                            </div>
                        </div>
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
                                                v-on:click="editar(data.item)"
                                                class="px-2 text-primary"
                                                v-b-tooltip.hover
                                                title="Editar"
                                            >
                                                <i
                                                    class="uil uil-pen  font-size-18"
                                                ></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a
                                                href="javascript:void(0);"
                                                v-on:click="verorden(data.item)"
                                                class="px-2 text-info"
                                                v-b-modal.verorden
                                                data-toggle="modal"
                                                data-target=".bs-example-verorden"
                                                v-b-tooltip.hover
                                                title="ver orden"
                                            >
                                                <i
                                                    class="uil-eye font-size-18"
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
                size="md"
                :title="titlemodal"
                title-class="font-18"
                hide-footer
                v-if="modal"
            >
                    <div class="row">
                        <div class="col-12 ">
                            <ul>
                                <li v-for="item of examenes" :key="item.id_orden_examenes">{{item.nombre}}</li>
                            </ul>
                        </div>
                    </div>

            </b-modal>

            <!-- modal ver orden -->
        </div>
    </Layout>
</template>
