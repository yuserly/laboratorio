<script>
import Layout from "../../layouts/main.vue";

import appConfig from "../../../app.config.json";
import Stat from "../../../compontents/widgets/stat.vue";
import SalesAnalytics from "./sales-analytics.vue";
import Tablaventas from './tablaventas.vue';


export default {
  page: {
    title: "Dashboard",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
 
    Stat,
    SalesAnalytics,
    Tablaventas,
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Lodevuelvo",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <Layout>
  
    <Stat />
    <div class="row">
      <Tablaventas />
    </div>
  </Layout>
</template>
