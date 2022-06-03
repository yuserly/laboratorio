<script src="./registro-venta.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body row">
                        <div class="col-8">
                            <h4 class="card-title">Venta Emitidas & Pagadas</h4>
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

            <div class="col-lg-12" v-if="existeventas">
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
                                                href="javascript:void(0);"
                                                v-on:click="Editarpagar(data.item)"
                                                class="px-2 text-primary"
                                                v-b-modal.crearpago
                                                v-b-tooltip.hover
                                                title="Pagar"
                                            >
                                                <i
                                                    class="uil-dollar-alt  font-size-18"
                                                ></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a
                                                href="javascript:void(0);"
                                                v-on:click="verorden(data.item.ordenexamen, data.item.codigo)"
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
                        <div class="col-12">
                            <ul>
                                <li style="list-style:none;" v-for="item of examenes" :key="item.id_orden_examenes"> <i class="fa fa-asterisk"></i> {{item.nombre}}</li>
                            </ul>
                        </div>
                    </div>

            </b-modal>

            <!-- modal ver orden -->

            <b-modal
                id="crearpago"
                size="lg"
                title="PAGO EXAMEN"
                title-class="font-18"
                hide-footer
                v-if="modalPago"
            >
                <form
                    class="needs-validation"
                    @submit.prevent="formPagoEmitir"
                >   
                
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label for="efectivo">Codigo</label>
                                <input
                                    id="efectivo"
                                    v-model="formpago.codigo"
                                    type="text"
                                    disabled
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="mb-3">
                                <label>Previsión</label>
                                <multiselect
                                    v-model="formpago.prevision"
                                    :options="options"
                                    track-by="id_prevision"
                                    label="nombre"
                                    @input="selectPrevision()"
                                ></multiselect>

                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="inputPrecio">
                        <div class="col-12 col-lg-3">
                            <div class="mb-3">
                                <label for="efectivo">Efectivo</label>
                                <input
                                    id="efectivo"
                                    v-model="formpago.efectivo"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formsa.efectivo.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.formsa.efectivo.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formsa.efectivo.required"
                                        >Los efectivo son requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                          
                        <div class="col-12 col-lg-3">
                            <div class="mb-3">
                                <label for="efectivo">Debito</label>
                                <input
                                    id="efectivo"
                                    v-model="formpago.debito"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formsa.efectivo.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.formsa.efectivo.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formsa.efectivo.required"
                                        >Los efectivo son requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3">
                            <div class="mb-3">
                                <label for="efectivo">Credito</label>
                                <input
                                    id="efectivo"
                                    v-model="formpago.credito"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.formsa.efectivo.$error
                                    }"
                                />

                                <div
                                    v-if="submitted && $v.formsa.efectivo.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.formsa.efectivo.required"
                                        >Los efectivo son requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3">
                            <div class="mb-3">
                                <label for="efectivo">Total Pago</label>
                                <input
                                    id="efectivo"
                                    v-model="formpago.totalpagoiva"
                                    type="number"
                                    disabled
                                    class="form-control form-control-sm"
                                />
                            </div>
                        </div>
                      
                    </div>
                    <hr>
                    <button
                        class="btn btn-success btn-soft-success btn-sm float-end"
                        type="submit"
                    >
                        <i class="far fa-save"></i> Aprobar Pago
                    </button>
                </form>
        </b-modal>

    </Layout>
</template>
