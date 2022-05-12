<script src="./generarqr.js"></script>
<style scoped>
.multiselect__select {
 height: 10px !important;
}
</style>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Listado QR</h4>

                        <div class="row mt-5">
                            <div class="col-12">
                                <button
                                    type="button"
                                    class="btn btn-success waves-effect waves-light float-end"
                                    v-b-modal.generarqr
                                    @click="modal = true"
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    Generar QR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <b-modal
                id="generarqr"
                size="md"
                title="Generar QR"
                title-class="font-18"
                hide-footer
                v-if="modal"
                no-close-on-backdrop
            >
                <form
                    class="needs-validation"
                    @submit.prevent="formSubmit"
                    v-if="!cargando && !pdfdisponible"
                >
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="cantidad">Cantidad</label>

                                <multiselect
                                    v-model="form.cantidad"
                                    :options="options"
                                    track-by="cantidad"
                                    label="name"
                                    size="sm"
                                ></multiselect>

                                <span
                                    class="text-danger"
                                    v-if="!form.cantidad && submitted"
                                    >Cantidad requerida.</span
                                >
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary float-end" type="submit">
                        <i class="fas fa-sync"></i> Generar
                    </button>
                </form>

                <div class="row" v-if="cargando">
                    <div class="col d-flex text-center justify-content-center">
                        <div class="row">
                            <div class="col-12">
                                <b-spinner
                                    type="grow"
                                    class="m-2"
                                    variant="primary"
                                    role="status"
                                >
                                </b-spinner>
                            </div>
                            <div class="col-12">
                                <p>Preparando QR</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="pdfdisponible">
                    <div class="col-12 d-flex justify-content-center text-center">
                        <a
                            type="button"
                            class="btn btn-success waves-effect waves-light"
                            @click="descargarpdf()"
                            href="/storage/pdf/primerpdf.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            ><i class="fas fa-plus-circle"></i> Descargar PDF</a
                        >
                    </div>
                </div>
            </b-modal>
        </div>
    </Layout>
</template>
