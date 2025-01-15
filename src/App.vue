<template>
  <div id="app" data-app>
    <admin-layout v-if="currentLayout == 'admin'">
      <router-view />
    </admin-layout>
    <user-layout v-if="currentLayout == 'user'">
      <router-view />
    </user-layout>
    <registration-layout v-if="currentLayout == 'login'">
      <router-view />
    </registration-layout>
    <user-home-layout v-if="currentLayout == 'user-home'">
      <router-view />
    </user-home-layout>
    <docs-layout v-if="currentLayout == 'docs'">
      <router-view />
    </docs-layout>
  </div>
</template>
<script>
import AdminLayout from './layouts/AdminLayout.vue';
import UserLayout from './layouts/UserLayout.vue';
import UserHomeLayout from './layouts/UserHomeLayout.vue';
import RegistrationLayout from './layouts/RegistrationLayout.vue';
import DocsLayout from './layouts/DocsLayout.vue';


export default {
  components: {
    'admin-layout': AdminLayout,
    'user-layout': UserLayout,
    'registration-layout': RegistrationLayout,
    'docs-layout': DocsLayout,
    UserHomeLayout,
  },
  data() {
    return {
      baseURL: "http://backend:8080"
    };
  },
  mounted(){
    this.$toastr.defaultPosition = "toast-bottom-right";
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    currentUserIsAdmin() {
      return this.$store.getters.currentUserIsAdmin;
    },
    currentLayout() {

      if (this.$route.meta.hasOwnProperty('layout')) {
        return this.$route.meta.layout;
      }

      if (this.$route.name == 'Login' || this.$route.name == 'Register') {
        return 'login';
      }

      const { currentUser } = this.$store.getters;
      if (currentUser && this.currentUserIsAdmin) {
        return 'admin';
      }
      return 'user';
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/styles.scss';

</style>
