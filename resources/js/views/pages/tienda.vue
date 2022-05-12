<script>
import LayoutTienda from "../layouts/maintienda.vue";
export default {
    components: {
        LayoutTienda
    }
};
</script>

<template>
    <div>
        <LayoutTienda>

            <h1>Estoy dentro del layout</h1>
        </LayoutTienda>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h6>Hola</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
