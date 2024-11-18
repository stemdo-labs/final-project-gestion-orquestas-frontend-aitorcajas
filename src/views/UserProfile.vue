<template>
    <div>
        <h1>
            {{ user.username }}
        </h1>
        <div class="d-flex general-container space-between">
            <div class="card user-general-info">
                <div class="card-body">
                    <div class="d-flex justify-content-between" v-if="isCurrenUser">
                        <h4>Información del usuario</h4>
                        <router-link :to="{ name: 'EditMyProfile' }">Editar</router-link>
                    </div>
                    <h5>Email:
                        {{ user.email }}
                    </h5>
                    <h5>Nombre:
                        {{ user.name }}
                        {{ user.lastname }}
                    </h5>
                    <h5>Dirección: {{ user.address }}</h5>
                </div>
            </div>
            <div class="card">
                <div class="card-body" v-if="isAdminUserLoggedIn">
                    <h5>Roles</h5>
                    <ul class="list-group">
                        <li
                            class="list-group-item"
                            v-for="role in user.rolesUser"
                            :key="role.id"
                        >
                            {{ role.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '@/helpers/axiosInterceptor';
import isAdmin from '@/helpers/isAdmin.js';

export default {
  async mounted() {
    const user_id = this.$route.params.id;

    if (this.currentUser.id != user_id && !isAdminUserLoggedIn()) {
      this.$router.replace({ name: 'Home' });
    }
    this.loading = true;
    try {
      this.user = (
        await axios.get('/api/users/', { params: { id: user_id } })
      ).data;
      this.$route.meta.title = this.user.username;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  },
  data() {
    return {
      user: {},
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    isAdminUserLoggedIn() {
      return isAdmin(this.currentUser.rolesUser);
    },
    isCurrenUser() {
      return this.currentUser.id == this.$route.params.id;
    },
  },
};
</script>
<style lang="scss" scoped>
.user-general-info, .roles {
    flex-grow: 1;
    margin-right: 5px;
}
.general-container {
    padding: 5px;
}
</style>
