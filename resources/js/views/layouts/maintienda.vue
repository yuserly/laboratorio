<script>
import Nav from '../../compontents/nav.vue'
export default {

    components:{
        Nav
    }

}
</script>

<template>

<div>

    <Nav></Nav>

    <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <slot />
          </div>
          <!-- container-fluid -->
        </div>
        <!-- End Page-content -->
      </div>
</div>

</template>
