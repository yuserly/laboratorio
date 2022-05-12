<script src="./crear-venta.js"></script>
<style>
@font-face {
    font-family: fuente1;

    src: url("/fonts/Gotham-Bold.otf");
}

@font-face {
    font-family: fuente2;

    src: url("/fonts/AmazonEmber_Rg.ttf");
}
input,
textarea {
    font-family: fuente2 !important;
    font-size: 17px !important;
}
h5,
h4,
span,
button,
a,
small,
button,
p {
    font-family: fuente2 !important;
}
.form-group {
    margin-bottom: 1rem !important;
}
.form-row > .col,
.form-row > [class*="col-"] {
    padding-right: 5px !important;

    padding-left: 5px !important;
}
.btn-add {
    color: #04a28d !important;

    border-color: #04a28d !important;

    font-size: 1rem !important;

    border-radius: 5px !important;

    padding-left: 5px !important;

    padding-right: 5px !important;
}

.btn-add:hover {
    color: #fff !important;

    background-color: #04a28d !important;

    border-color: #04a28d !important;
}
.multiselect__option:hover {
    background-color: rgb(14, 234, 175) !important;
}
.multiselect__option:focus {
    background-color: rgb(14, 234, 175) !important;
}
.multiselect__option--selected {
    background-color: rgb(14, 234, 175) !important;
}
</style>
<template>
    <Layout>
        <section class="banner1c mt-5" style="overflow: hidden;">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <h5 class="mb-3">
                            Ingresa tus datos para realizar tu compra
                        </h5>

                        <form class="datosbasicos">
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <div class="form-group col-12 col-md-6">
                                        <label for="">Selecciona el Plan</label>
                                        <multiselect
                                            v-model="form.idplan"
                                            :options="optionPlanes"
                                            track-by="id_plan"
                                            label="nombre"
                                            placeholder=""
                                            deselect-label=""
                                            select-label=""
                                            selected-label=""
                                        ></multiselect>
                                        <span v-if="submitted && !form.idplan"
                                            >Plan Requerido.</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-12">
                                    <input
                                        v-model="form.nombre"
                                        type="text"
                                        class="form-control"
                                        id="nombre"
                                        placeholder="Nombre"
                                        :class="{
                                            'is-invalid':
                                                submitted &&
                                                $v.form.nombre.$error
                                        }"
                                    />
                                    <div
                                        v-if="
                                            submitted && $v.form.nombre.$error
                                        "
                                        class="invalid-feedback"
                                    >
                                        <span v-if="!$v.form.nombre.required"
                                            >Nombre requerido.</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-12 col-md-6">
                                    <input
                                        v-model="form.correo"
                                        type="email"
                                        class="form-control"
                                        id="correo"
                                        placeholder="Correo Electrónico"
                                        :class="{
                                            'is-invalid':
                                                submitted &&
                                                $v.form.correo.$error
                                        }"
                                    />
                                    <div
                                        v-if="
                                            submitted && $v.form.correo.$error
                                        "
                                        class="invalid-feedback"
                                    >
                                        <span v-if="!$v.form.correo.required"
                                            >Email requerido.</span
                                        >
                                    </div>
                                </div>

                                <div class="form-group col-12 col-md-6">
                                    <div class="input-group">
                                        <div class="input-group-prepend d-flex">
                                            <div class="input-group-text">
                                                +569
                                            </div>
                                        </div>
                                        <input
                                            v-model="form.telefono"
                                            type="text"
                                            class="form-control"
                                            id="telefono"
                                            placeholder="Número Celular"
                                            maxlength="8"
                                            minlength="8"
                                            @keypress="onlyNumber"
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
                                                >Telefono requerido.</span
                                            >

                                            <span
                                                v-if="
                                                    !$v.form.telefono.minLength
                                                "
                                                >Debe ingresar 8 números (sin
                                                incluir +569).</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <hr class="hrcompra" />

                        <div class="d-flex justify-content-between mb-3">
                            <h6 class="mb-3">Alumnos</h6>
                            <button
                                type="button"
                                class="btn btn-outline-primary ml-2 btn-add"
                                v-b-modal.crearalumno
                                @click="AddAlumno()"
                            >
                                <i class="far fa-plus-square"></i> Añadir
                            </button>
                        </div>

                        <ul
                            class="list-group lista_estudiantes"
                            v-if="formalumnos"
                        >
                            <li
                                class="list-group-item d-flex justify-content-between"
                                v-for="(alumno, i) in formalumnos"
                                :key="i"
                            >
                                <span> {{ alumno.nombre }} </span>
                                <div>
                                    <i
                                        style="cursor: pointer !important;"
                                        class="far fa-edit mr-1"
                                        v-b-modal.crearalumno
                                        @click="editarRow(alumno, i)"
                                    ></i>
                                    <i
                                        style="cursor: pointer !important;"
                                        class="far fa-trash-alt"
                                        @click="deleteRow(i)"
                                    ></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <hr class="hrcompra" />

                        <h6 class="mb-3">
                            Ingresa tu dirección de envío
                        </h6>

                        <form class="datosbasicos">
                            <div class="form-row">
                                <div class="form-group col-12">
                                    <input
                                        v-model="form.direccion"
                                        type="text"
                                        class="form-control"
                                        id="direccion"
                                        placeholder="Dirección"
                                        :class="{
                                            'is-invalid':
                                                submitted &&
                                                $v.form.direccion.$error
                                        }"
                                    />
                                    <div
                                        v-if="
                                            submitted &&
                                                $v.form.direccion.$error
                                        "
                                        class="invalid-feedback"
                                    >
                                        <span v-if="!$v.form.direccion.required"
                                            >Dirección requerida.</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-12 col-md-6">
                                    <multiselect
                                        v-model="form.region"
                                        :options="optionRegiones"
                                        track-by="REG_ID"
                                        label="REG_NOMBRE"
                                        placeholder="Seleccione Región"
                                        deselect-label=""
                                        select-label=""
                                        selected-label=""
                                        @input="traercomuna()"
                                    ></multiselect>
                                    <span v-if="submitted && !form.region"
                                        >Región requerida.</span
                                    >
                                </div>

                                <div class="form-group col-12 col-md-6">
                                    <multiselect
                                        v-model="form.comuna"
                                        :options="optionComunas"
                                        track-by="COM_ID"
                                        label="COM_NOMBRE"
                                        placeholder="Seleccione Comuna"
                                        deselect-label=""
                                        select-label=""
                                        selected-label=""
                                    ></multiselect>
                                    <span v-if="submitted && !form.comuna"
                                        >Comuna requerida.</span
                                    >
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- <div class="row justify-content-center">
                    <div class="col-md-6">
                        <hr class="hrcompra" />

                        <form class="datosbasicos">
                            <div
                                class="pl-2  pr-2 pb-3 pt-3 d-flex justify-content-center"
                                style="height: 80px;background-color:  #0eeaaf ;border-radius: 5px;"
                            >
                                <p
                                    class="pl-4 pr-2 pt-1 text-center"
                                    style="color: #000;font-weight: bold;line-height: 1;font-size: 17px; margin-left: 20px;"
                                >
                                    TOTAL: {{ totalpagar | toCurrency }} + Envío
                                </p>
                            </div>
                        </form>
                    </div>
                </div> -->
                <div class="row justify-content-center mt-4 mb-5">
                    <div class="col-12 col-md-6">
                        <button
                            class="btn btn-success waves-effect waves-light float-end"
                            @click="crearventa()"
                        >
                            Crear venta
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <b-modal
            id="crearalumno"
            size="lg"
            title="Ingresar los Datos del Alumno"
            title-class="font-18"
            hide-footer
            v-if="modal"
        >
            <div class="row">
                <div class="col-md-6 col-12">
                    <form class="datosbasicos">
                        <div class="form-group">
                            <input
                                type="text"
                                class="form-control"
                                id="nombre_estudiante"
                                maxlength="17"
                                v-model="formalumnostemp.nombre"
                                placeholder="Nombre"
                                @input="conteo()"
                                :class="{
                                    'is-invalid':
                                        submittedalumno &&
                                        $v.formalumnostemp.nombre.$invalid
                                }"
                            />
                            <small
                                ><span class="text-muted"
                                    >Restan {{ caracteres }} caracteres</span
                                ></small
                            >
                            <div
                                v-if="
                                    submittedalumno &&
                                        $v.formalumnostemp.nombre.$invalid
                                "
                                class="invalid-feedback"
                            >
                                <span v-if="!$v.formalumnostemp.nombre.required"
                                    >Nombre requerido.</span
                                >
                                <br />
                                <span
                                    v-if="!$v.formalumnostemp.nombre.maxlength"
                                    >El Nombre debe contener maximo 12
                                    carateres.</span
                                >
                            </div>
                        </div>
                        <div class="form-group">
                            <input
                                type="text"
                                class="form-control"
                                id="apellido_estudiante"
                                maxlength="12"
                                v-model="formalumnostemp.apellido"
                                placeholder="apellido"
                                @input="conteoapellido()"
                                :class="{
                                    'is-invalid':
                                        submittedalumno &&
                                        $v.formalumnostemp.apellido.$invalid
                                }"
                            />
                            <small
                                ><span class="text-muted"
                                    >Restan
                                    {{ caracteresapellido }} caracteres</span
                                ></small
                            >
                            <div
                                v-if="
                                    submittedalumno &&
                                        $v.formalumnostemp.apellido.$invalid
                                "
                                class="invalid-feedback"
                            >
                                <span
                                    v-if="!$v.formalumnostemp.apellido.required"
                                    >Apellido requerido.</span
                                >
                                <br />
                                <span
                                    v-if="
                                        !$v.formalumnostemp.apellido.maxlength
                                    "
                                    >El Apellido debe contener maximo 12
                                    carateres.</span
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <input
                                type="text"
                                class="form-control"
                                id="colegio"
                                v-model="formalumnostemp.colegio"
                                :class="{
                                    'is-invalid':
                                        submittedalumno &&
                                        $v.formalumnostemp.colegio.$invalid
                                }"
                                placeholder="Colegio"
                            />
                            <div
                                v-if="
                                    submittedalumno &&
                                        $v.formalumnostemp.colegio.$invalid
                                "
                                class="invalid-feedback"
                            >
                                <span
                                    v-if="!$v.formalumnostemp.colegio.required"
                                    >Colegio requerido.</span
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <multiselect
                                v-model="formalumnostemp.curso"
                                :options="options"
                                track-by="name"
                                label="name"
                                placeholder="Curso"
                            ></multiselect>
                            <div
                                v-if="
                                    submittedalumno &&
                                        $v.formalumnostemp.curso.$invalid
                                "
                                class="invalid-feedback"
                            >
                                <span v-if="!$v.formalumnostemp.curso.required"
                                    >Curso requerido.</span
                                >
                            </div>
                        </div>
                    </form>
                </div>

                <div
                    class="col-md-5 col-12 d-flex justify-content-center align-item-center"
                    v-if="form.idplan.id_plan == 2"
                >
                    <div
                        style="border: 2px solid rgb(4, 210, 140); border-radius:5px;width:84%; height:102px;  white-space: nowrap; padding: 5px;"
                    >
                        <div
                            align="center"
                            style="width:30%; margin-top:0px; background:black; height:90px ;border-radius:5px;"
                        >
                            <img
                                align="center"
                                class="margintext"
                                src="https://lodevuelvo.cl/public/images/qr.png"
                                style="border-radius:5px; border: 1px solid #fff; margin-left:-1px; margin-top:4px; object-fit:cover"
                                height="65"
                                width="65"
                                alt="..."
                            />
                            <br />

                            <span
                                style="color:#fff; font-size: 13px; line-height: 1 !important;"
                                >Scan me</span
                            >
                            <br />
                            <br />
                        </div>

                        <div
                            style="width:50%; margin-top:-79px; margin-left:40%; text-align:left; white-space: nowrap;"
                            v-if="form.idplan.id_plan == 2"
                        >
                            <p
                                style="font-weight:900 !important; font-family:'fuente1' !important; font-style:'font-style: bold'; !important; line-height: 0.3 !important; "
                                v-if="formalumnostemp.nombre"
                            >
                                {{ formalumnostemp.nombre }}
                            </p>
                            <p
                                style="font-weight:900 !important; font-family:'fuente1' !important; font-style:'font-style: bold'; !important; line-height: 0.3 !important; "
                                v-else
                            >
                                Nombre
                            </p>
                            <p
                                style="font-weight:900 !important; font-family:'fuente1' !important; font-style:'font-style: bold'; !important; line-height: 0.4!important; "
                                v-if="formalumnostemp.apellido"
                            >
                                {{ formalumnostemp.apellido }}
                            </p>
                            <p
                                style="font-weight:900 !important; font-family:'fuente1' !important; font-style:'font-style: bold'; !important; line-height: 0.3 !important; "
                                v-else
                            >
                                Apellido
                            </p>
                            <p
                                style="font-weight:900 !important; font-family:'fuente1' !important; font-style:'font-style: bold'; !important; line-height: 0.4 !important; "
                                v-if="formalumnostemp.curso.name"
                            >
                                {{ formalumnostemp.curso.name }}
                            </p>
                            <p
                                style="font-weight:900 !important; font-family:'fuente1' !important; font-style:'font-style: bold'; !important; line-height: 0.3 !important; "
                                v-else
                            >
                                Curso
                            </p>
                            <span align="center" style="font-size: 13px;"
                                >www.lodevuelvo.cl</span
                            >
                        </div>

                        <div
                            style="width:5%; margin-top:-95px; margin-left:91%"
                            v-if="form.idplan.id_plan == 2"
                        >
                            <img
                                src="https://lodevuelvo.cl/public/images/logo.png"
                                width="35"
                                style="margin-top:-10px;"
                                alt="..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="button"
                class="btn mt-4 btn-agregar-alumno"
                @click="guardar()"
                style="background-color: #0eeaaf;"
            >
                Añadir
            </button>
        </b-modal>
    </Layout>
</template>
