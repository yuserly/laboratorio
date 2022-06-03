<script src="./crear_consultas.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Nueva Consulta</h4>
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
                                        <label for="motivo"
                                            >Motivo</label
                                        >
                                        <input
                                            id="motivo"
                                            v-model="form.motivo"
                                            type="text"
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    submitted &&
                                                    $v.form.motivo.$error
                                            }"
                                        />

                                        <div
                                            v-if="
                                                submitted &&
                                                    $v.form.motivo.$error
                                            "
                                            class="invalid-feedback"
                                        >
                                            <span
                                                v-if="
                                                    !$v.form.motivo
                                                        .required
                                                "
                                                >El Motivo es
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
                                        <label for="fecha">Anamnesis</label>

                                        <ckeditor
                                            v-model="form.anamnesis"
                                            :editor="editor"
                                            required
                                        ></ckeditor>
                                    </div>
                                </div>
                            </div>

                            <button
                                class="btn btn-primary btn-soft-primary btn-sm float-end btnSubmit"
                                type="submit"
                            >
                                <i class="far fa-save"></i> Generar Consulta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
