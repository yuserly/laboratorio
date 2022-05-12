<script>
import LayoutTienda from "../layouts/main2tienda.vue";

export default {
    components: {
        LayoutTienda
    }
};
</script>

<template>
    <div>
        <LayoutTienda>
            <section class=" mt-5" style="overflow: hidden;">
                <div class="container">
                    <div class="row justify-content-center mt-5">
                        <div class="col-md-7 text-center">
                            <img
                                src="/images/icon-escanear.png"
                                class="img-fluid"
                                width="70px"
                            />

                            <h5
                                class="pt-3"
                                style="font-weight: bold;line-height: 1;color: #000;font-size: 22px"
                            >
                                ¡Comencemos!
                            </h5>
                            <h5
                                style="font-weight: bold;line-height: 1;color: #000;font-size: 22px"
                            >
                                Escanea el código QR
                            </h5>

                            <br />
                        </div>
                    </div>
                </div>
            </section>

            <hr
                style="-webkit-box-shadow: -1px -11px 45px 20px rgba(14,234,175,0.44); box-shadow: -1px -11px 45px 20px rgba(14,234,175,0.44);height: 0px!important;border:none!important;bottom: 0px!important;width: 100%;position: absolute;"
            />
        </LayoutTienda>
    </div>
</template>
