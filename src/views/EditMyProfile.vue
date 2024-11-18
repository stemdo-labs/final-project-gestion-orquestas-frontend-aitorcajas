<template>
  <div>
    <edit-my-profile-form :user="user" @completed="completedForm"></edit-my-profile-form>
  </div>
</template>
<script>
import axios from '@/helpers/axiosInterceptor';

import EditMyProfileForm from '../components/Forms/EditMyProfileForm.vue';

export default {
  components: {
    EditMyProfileForm,
  },
  data() {
    return {
      user: {
        email: '',
        name: '',
        lastname: '',
        address: '',
      },
    };
  },
  mounted() {
    this.user = this.$store.getters.currentUser;
  },
  methods: {
    async completedForm(user) {
      try {
        let { currentUser } = this.$store.getters;
        currentUser = {
          ...currentUser,
          ...user,
        };
        await axios.post('/api/users', currentUser);
        this.$store.commit('setCurrentUser', currentUser);
        window.localStorage.setItem('user', JSON.stringify(currentUser));

        this.$toastr.i('¡Editaste tu perfil correctamente!');
        this.$router.replace({ name: 'UserProfile', params: { id: currentUser.id } });
      } catch (error) {
        console.log(error)
        this.$toastr.e('Ocurrió un error al editar tu perfil');
      }
    },
  },
};
</script>
