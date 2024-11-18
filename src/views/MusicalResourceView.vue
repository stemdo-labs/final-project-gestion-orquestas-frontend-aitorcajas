<template>
  <div v-if="!loading">
    <div class="d-flex justify-content-between">
      <span>{{ resource.song.title }}</span>
      <button class="btn btn-secondary" v-on:click="goBack">Volver</button>
    </div>
    <div v-if="resource.typeMusicalResource.systemName == 'texto'">
      <musical-resource-text-content mode="view" :value="resource.content" />
    </div>
    <div v-if="resource.typeMusicalResource.systemName == 'imagen'">
      <musical-resource-image-content mode="view" :value="resource.content" />
    </div>
    <div v-if="resource && resource.typeMusicalResource.systemName == 'video'">
      <musical-resource-video-content mode="view" :value="resource.content" />
    </div>
  </div>
</template>
<script>
import MusicalResourceTextContent from '../components/MusicalResourceTextContent.vue';
import MusicalResourceImageContent from '../components/MusicalResourceImageContent.vue';
import MusicalResourceVideoContent from '../components/MusicalResourceVideoContent.vue';

export default {
  components: {
    MusicalResourceTextContent,
    MusicalResourceImageContent,
    MusicalResourceVideoContent,
  },
  data() {
    return {
      resource: null,
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    const request = this.$store.dispatch('getResource', this.$route.params.id);
    request.then((response) => {
      this.resource = response.data;
      this.$route.meta.link_name = response.data.name;
      this.loading = false;
    });
  },
  methods: {
    goBack() {
      this.$router.replace({ name: 'Recursos' });
    },
  },
};
</script>
