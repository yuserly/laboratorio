<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "../../../compontents/page-header.vue";
import appConfig from "../../../app.config.json";
import Stat from "../../../compontents/widgets/stat.vue";
import SalesAnalytics from "./sales-analytics.vue";
import Tablaventas from './tablaventas.vue';
import TablaPrendas from './prendasperdidas.vue';


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
    PageHeader,
    Stat,
    SalesAnalytics,
    Tablaventas,
    TablaPrendas
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
    <PageHeader :title="title" :items="items" />
    <Stat />
    <div class="row">

      <Tablaventas />
      <TablaPrendas />
    </div>
  </Layout>
</template>
