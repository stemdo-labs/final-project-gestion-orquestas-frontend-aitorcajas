<template>
  <div>
    <div v-for="route in links" :key="route.name">
      <router-link class="nav-link pl-0" :to="route"
        >{{ route.meta.link_name }}
        <span v-if="!currentUserIsGuest && route.meta.for_guest"
          >(para invitados)</span
        ></router-link
      >
    </div>
    <div>
      <router-link class="nav-link pl-0" style="margin-top: 20px;" :to="{name: 'Home'}">Regresar</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: []
    };
  },
  computed: {
    currentUserIsGuest() {
      const currentUser = this.$store.getters.currentUser;
      if (!currentUser) {
        return true;
      }

      return !this.$store.getters.currentUserIsAdmin;
    }
  },
  mounted() {
    const mainRoute = this.$router.options.routes.find(route => route.meta.is_docs);
    let links = mainRoute.children.filter(route => route.meta.is_docs);
    console.log(this.currentUserIsGuest);
    if (this.currentUserIsGuest) {
      links = links.filter(route => route.meta.for_guest);
    }
    this.links = links;
  }
};
</script>
