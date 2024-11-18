<template>
  <div id="user-layout-container" class="main-container">
    <b-navbar toggleable="lg" :sticky="true" class="main-navbar">
      <b-navbar-toggle target="nav-collapse-alt"></b-navbar-toggle>
      <b-collapse id="nav-collapse-alt" is-nav>
        <b-navbar-nav class="d-flex align-items-center">
          <b-nav-item>
            <img height="40px" src="../assets/logo.png" />
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="social-icons align-items-center">
          <div class="d-flex justify-content-between">
            <Instagram />
            <Facebook />
            <Twitter />
          </div>
        </b-navbar-nav>
        <b-navbar-nav>
          <account-menu v-if="isLoggedIn"></account-menu>
          <guests-menu v-else></guests-menu>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main>
      <div class="container">
        <slot></slot>
      </div>
    </main>
    <footer>
      <div class="d-flex justify-content-between">
        <span>Charagua, suena la orilla</span>
        <span class="mr-1">
          <router-link :to="{ name: 'IndiceDocs' }">Ayuda</router-link>
        </span>
      </div>
    </footer>
  </div>
</template>
<script>
import Instagram from "vue-material-design-icons/Instagram.vue";
import Facebook from "vue-material-design-icons/Facebook.vue";
import Twitter from "vue-material-design-icons/Twitter.vue";
import AccountMenu from "../components/Menus/AccountMenu.vue";
import GuestsMenu from "../components/Menus/GuestsMenu.vue";

export default {
  components: {
    Instagram,
    Facebook,
    Twitter,
    AccountMenu,
    GuestsMenu
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/user-styles.scss";

@media screen and (min-width: 1200px) {
  .gestion-container {
    width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
