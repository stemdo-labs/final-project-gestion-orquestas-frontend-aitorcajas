<template>
  <div>
    <router-link class="dashboard-card" :to="resourcesRoute">
      <div class="dashboard-card-icon"><Music :size="48"></Music></div>
      <div><h1>Recursos</h1></div>
    </router-link>
    <router-link class="dashboard-card" :to="usersRoute">
      <div class="dashboard-card-icon"><Account :size="48"></Account></div>
      <div><h1>Usuarios</h1></div>
    </router-link>
    <router-link class="dashboard-card" :to="newsRoute">
      <div class="dashboard-card-icon"><Newspaper :size="48"></Newspaper></div>
      <div><h1>Noticias</h1></div>
    </router-link>
    <router-link class="dashboard-card" :to="showsRoute">
      <div class="dashboard-card-icon"><Theater :size="48"></Theater></div>
      <div><h1>Shows</h1></div>
    </router-link>
  </div>
</template>
<script>
import axios from "@/helpers/axiosInterceptor.js";
import Music from "vue-material-design-icons/Music.vue";
import Account from "vue-material-design-icons/Account.vue";
import Newspaper from "vue-material-design-icons/Newspaper.vue";
import Theater from "vue-material-design-icons/Theater.vue";

export default {
  components: {
    Music,
    Account,
    Newspaper,
    Theater
  },
  computed: {
    resourcesRoute() {
      const route = this.$router.options.routes.find(r => r.name === "Recursos");
      return route;
    },
    usersRoute() {
      const route = this.$router.options.routes.find(r => r.name === "Usuarios");
      return route;
    },
    newsRoute() {
      const route = this.$router.options.routes.find(r => r.name === "NewsManagement");
      return route;
    },
    showsRoute() {
      const route = this.$router.options.routes.find(r => r.name === "ShowsManagement");
      return route;
    },
  }
};
</script>
<style scoped>
.dashboard-card {
  display: flex;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  background: var(--secondary);
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
.dashboard-card-icon {
  width: 200px;
}
</style>
