<script src="./historial-analisis.js"></script>

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
        
            <div class="col-12 d-flex justify-content-center" style="margin-bottom: 10px">
                <img src="images/denegados.jpg" width="100%" alt="">
            </div>

        </div>
    </Layout>
</template>
