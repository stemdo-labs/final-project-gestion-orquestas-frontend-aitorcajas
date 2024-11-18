<template>
  <div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-secondary float-rigth" v-on:click="goBack">Volver</button>
    </div>
    <new-form :mode="mode" :edit-new="aNew" v-on:submit="handleSubmission($event)"></new-form>
  </div>
</template>
<script>
import NewForm from "@/components/Forms/NewForm.vue";
import axios from "@/helpers/axiosInterceptor";
export default {
  data() {
    return {
      aNew: {
        body: "",
        title: "",
        author: "",
        enabled: true,
        publicDate: null
      },
      mode: "add"
    };
  },
  components: {
    NewForm
  },
  mounted() {
    if (this.$route.params.id) {
      const request = axios.get("/api/news", {
        params: { id: this.$route.params.id }
      });
      request.then(resp => {
        this.aNew = resp.data;
        this.mode = "edit";
      });
    }
  },
  methods: {
    async handleSubmission(aNew) {
      await axios.post("/api/news", aNew);
      this.$router.replace({ name: "NewsList" });
    },
    goBack() {
      this.$router.replace({ name: 'NewsList' });
    },
  }
};
</script>
