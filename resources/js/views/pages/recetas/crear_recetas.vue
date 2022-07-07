<script src="./crear_recetas.js"></script>

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
                        <h4 class="card-title">Nueva Receta</h4>
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
                                <div class="col-12 col-lg-6">
                                    <div class="mb-3">
                                        <label for="diagnostico"
                                            >Diagnostico</label
                                        >
                                        <input
                                            id="diagnostico"
                                            v-model="form.diagnostico"
                                            type="text"
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    submitted &&
                                                    $v.form.diagnostico.$error
                                            }"
                                        />

                                        <div
                                            v-if="
                                                submitted &&
                                                    $v.form.diagnostico.$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span
                                                v-if="
                                                    !$v.form.diagnostico
                                                        .required
                                                "
                                                >El Diagnostico es
                                                requerido.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="mb-3">
                                        <label for="fecha">Fecha Emisión</label>
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
                                <div class="col-12 ">
                                    <div class="mb-3">
                                        <label for="fecha">Prescripción</label>

                                        <ckeditor
                                            v-model="form.preinscripcion"
                                            :editor="editor"
                                            required
                                        ></ckeditor>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <div class="custom-control custom-checkbox">
                                            <input id="invalidCheck" type="checkbox" v-model="form.enviarSecretaria" class="custom-control-input"> 
                                            <label for="invalidCheck" class="custom-control-label">Permitir impresion secretaria.</label> 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                v-if="btnAccionSubmit == true"
                                class="btn btn-primary btn-soft-primary btn-sm float-end btnSubmit"
                                type="submit"
                            >
                                <i class="far fa-save"></i> Generar Receta
                            </button>

                            <button
                                v-else
                                class="btn btn-warning btn-soft-warning btn-sm float-end"
                                type="submit"
                            >
                                <i class="far fa-save"></i> Espere...
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
