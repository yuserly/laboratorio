<script src="./historial-ordenes.js"></script>

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
                    <div class="card-body row">
                        <div class="col-7">
                            <h4 class="card-title">Listado Examenes</h4>
                        </div>
                        <div class="col-5">
                            <form
                                    class="needs-validation"
                                    @submit.prevent="formSubmit"
                                >
                                    <div class="row">
                                        <div class="col-12 col-lg-8">
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
                                        <div class="col-12 col-lg-4 mt-4" v-if="btnAccionBuscar == true">
                                            <button
                                                type="submit"
                                                class="mt-1 btn btn-primary btn-soft-primary btn-sm waves-effect waves-light float-star btnSubmit"
                                            >
                                                <i class="fa fa-search"></i>
                                                Buscar Examen
                                            </button>
                                        </div>
                                        <div class="col-12 col-lg-4 mt-4" v-else>
                                            <button
                                                type="button" 
                                                disabled
                                                class="mt-1 btn btn-warning btn-soft-warning btn-sm waves-effect waves-light float-star"
                                            >
                                                <i class="fa fa-search"></i>
                                                Buscar Examen
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="col-lg-12" v-if="existeexamen">
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
                                        <li class="list-inline-item" v-if="rol != 'Secretaria'">
                                            <a
                                                :href="'/verOrdenExamen/'+data.item.codigo"
                                                target="_blank" rel="noopener noreferrer"
                                                class="px-2 text-warning"
                                                v-b-tooltip.hover
                                                title="Ver PDF"
                                            >

                                            <i class="uil-parcel font-size-18"></i>

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

            <div class="col-12 d-flex justify-content-center" style="margin-bottom: 10px" v-else>
                <img src="images/no-found.png" width="100%" alt="">
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

    </Layout>
</template> 
