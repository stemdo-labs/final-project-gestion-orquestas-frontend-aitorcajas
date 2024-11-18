<template>
  <div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-secondary float-rigth" v-on:click="goBack">Volver</button>
    </div>
    <show-form :mode="mode" :edit-show="show" v-on:submit="handleSubmission($event)"></show-form>
  </div>
</template>
<script>
import ShowForm from "@/components/Forms/ShowForm.vue";
import axios from "@/helpers/axiosInterceptor";
export default {
  data() {
    return {
      show: {
        name: "",
        date: "",
        place: "",
        publicDate: "",
        tickets: null
      },
      mode: "add"
    };
  },
  components: {
    ShowForm
  },
  mounted() {
    if (this.$route.params.id) {
      const request = axios.get("/api/shows", {
        params: { id: this.$route.params.id }
      });
      request.then(resp => {
        console.log(resp);
        this.show = resp.data;
        this.mode = "edit";
      });
    }
  },
  methods: {
    async handleSubmission(show) {
      await axios.post("/api/shows", show);
      this.$router.replace({ name: "ShowsList" });
    },
    goBack() {
      this.$router.replace({ name: "ShowsList" });
    }
  }
};
</script>
