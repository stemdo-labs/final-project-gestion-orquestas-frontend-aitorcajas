<template>
  <div class="d-flex justify-content-between" style="font-size: 13px;">
    <router-link :to="{ name: 'UserProfile', params: { id: currentUser.id } }"
      >Mi cuenta</router-link
    ><span>|</span><router-link :to="{ name: 'MyTickets' }">Mis Entradas</router-link> <span>|</span
    ><a class="btn-link" v-on:click="logout">Cerrar sesión</a>
    <template v-if="isAdmin"
      >|<router-link :to="{ name: 'Dashboard' }">Admin</router-link></template
    >
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    isAdmin() {
      return this.$store.getters.currentUserIsAdmin;
    }
  }
};
</script>
<style scoped>
a {
  padding: 0 20px;
}
</style>
