<template>
  <div id="docs-page">
    <div v-if="showReturnToIndex">
      <router-link :to="{ name: 'Index' }">Ir al indice </router-link>
    </div>
    <router-view> </router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showReturnToIndex: false,
    };
  },
  mounted() {
    if (this.$route.name !== "Index") {
      this.showReturnToIndex = true;
    }
    this.showReturnToIndex = false;
  }
};
</script>
<style>
#docs-page img {
  margin-bottom: 50px;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 5px;
}
</style>