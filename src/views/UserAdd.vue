<template>
  <div>
    <div class="d-flex justify-content-end">
        <button class="btn btn-secondary float-rigth" v-on:click="goBack">Volver</button>
    </div>
    <user-form :mode="mode" :edit-user="user" v-on:submit="handleSubmission($event)"></user-form>
  </div>
</template>
<script>
import UserForm from '@/components/Forms/UserForm.vue';
import axios from '@/helpers/axiosInterceptor';

export default {
  data() {
    return {
      user: {},
      mode: 'add',
    };
  },
  components: {
    UserForm,
  },
  mounted() {
    if (this.$route.params.id) {
      const request = axios.get('/api/users', { params: { id: this.$route.params.id } });
      request.then((resp) => {
        this.user = { ...resp.data, password: '' };
        this.mode = 'edit';
      });
    }
  },
  methods: {
    async handleSubmission(user) {
      delete user.password1;
      console.log(user);
      await axios.post('/api/users', user);
      this.$store.dispatch('getUsers');
      this.$router.replace({ name: 'UserList' });
    },
    goBack() {
      this.$router.replace({ name: 'UserList' });
    },
  },
};
</script>
