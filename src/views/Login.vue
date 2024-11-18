<template>
  <div id="login-container" class="card">
    <h1>Iniciar Sesión</h1>
    <form class="">
      <div class="mb-3">
        <label>Usuario</label>
        <input v-model="username" class="form-control" type="text" />
      </div>
      <div class="mb-3">
        <label>Contraseña</label>
        <input v-model="password" v-on:keyup.enter="login" class="form-control" type="password" />
      </div>
      <button v-on:click="login" :disabled="isLoading" type="button" class="btn btn-primary mb-3">
        <Loading v-if="isLoading"></Loading>
        Iniciar Sesión
      </button>
      <div class="">
        <span
          >¿No tenés una cuenta?
          <router-link :disabled="isLoading" :to="{ name: 'Register' }">Registrate</router-link></span
        >
      </div>
      <div>
        <router-link :disabled="isLoading" :to="{ name: 'Home' }">Volver a la home</router-link>
      </div>
    </form>
    <v-dialog v-model="wrongDataDialog" max-width="290" style="padding: 20px;">
      <v-card>
        <v-card-title class="text-h5"> ¡Atención! </v-card-title>
        <v-card-text class="text-h5"> Error de credenciales, por favor, intente nuevamente </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text v-on:click="wrongDataDialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Loading from "vue-material-design-icons/Loading.vue";

export default {
  components: {
    Loading,
  },  
  data() {
    return {
      username: "",
      password: "",
      wrongDataDialog: false,
    };
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters.isLoading;
      },
      set(val) {
        this.$store.commit('setLoading', val);
      }
    }
  },
  methods: {
    login() {
      this.isLoading = true;
      const req = this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      }).then((resp) => {
        this.$router.replace({ path: "/" });
      }).catch((error) => {
        console.log(error.response)
        if (error.response.status === 403) {
          this.wrongDataDialog = true;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#login-container {
  padding: 50px;
}
</style>
