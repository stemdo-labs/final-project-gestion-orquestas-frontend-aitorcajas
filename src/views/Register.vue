<template>
  <div id="login-container" class="card">
    <h1>Registro</h1>
    <div class="col-md-12">
      <div class="row">
        <div class="mb-3 col-md-12 col-xs-12">
          <div class="d-flex justify-content-between">
            <label>Nombre de Usuario</label>
            <small class="is-invalid" v-if="$v.username.$invalid">Mínimo 8 caracteres</small>
          </div>
          <text-input
            v-model.trim="username"
            :class="{ 'is-invalid': $v.username.$error }"
            type="text"
          />
        </div>
        <div class="mb-3 col-md-12 col-xs-12">
          <div class="d-flex justify-content-between">
            <label>Email</label>
            <small class="is-invalid" v-if="$v.email.$invalid">Ingrese e-mail válido</small>
          </div>
          <text-input v-model.trim="email" :class="{ 'is-invalid': $v.email.$error }" />
        </div>
        <div class="mb-3 col-md-6 col-xs-12">
          <div class="d-flex justify-content-between">
            <label>Contraseña</label>
            <small class="is-invalid" v-if="!$v.password.minLength || !$v.password.required"
              >Mínimo 8 caracteres</small
            >
          </div>
          <text-input
            v-model.trim="password"
            :class="{ 'is-invalid': $v.password.$error }"
            type="password"
          />
        </div>
        <div class="mb-3 col-md-6 col-xs-12">
          <div class="d-flex justify-content-between">
            <label>Repetir</label>
            <small class="is-invalid" style="text-align: right" v-if="!$v.password.sameAs"
              >Las contraseñas no coinciden</small
            >
          </div>
          <text-input
            v-model.trim="password1"
            :class="{ 'is-invalid': $v.password1.$error }"
            type="password"
          />
        </div>
        <div class="mb-3 col-md-6 col-xs-12">
          <div class="d-flex justify-content-between">
            <label>Nombre</label>
            <small class="is-invalid" v-if="$v.name.$invalid">Debe ingresar su nombre</small>
          </div>
          <text-input v-model.trim="name" :class="{ 'is-invalid': $v.name.$error }" type="text" />
        </div>
        <div class="mb-3 col-md-6 col-xs-12">
          <div class="d-flex justify-content-between">
            <label>Apellido</label>
            <small class="is-invalid" v-if="$v.lastname.$invalid">Debe ingresar su apellido</small>
          </div>
          <text-input
            v-model.trim="lastname"
            :class="{ 'is-invalid': $v.lastname.$error }"
            type="text"
          />
        </div>
        <div class="mb-3 col-md-12 col-xs-12">
          <div class="d-flex justify-content-between">
            <label>Dirección</label>
            <small class="is-invalid" v-if="$v.address.$invalid">Debe ingresar su dirección</small>
          </div>
          <text-input
            v-model.trim="address"
            :class="{ 'is-invalid': $v.address.$error }"
            type="text"
          />
        </div>
        <div class="mb-3 col-md-6 col-xs-12">
          <button v-on:click="register" type="button" class="btn btn-primary mb-3">
            Registrate
          </button>
        </div>
        <div class="">
          <span
            >¿Ya tenés cuenta?
            <router-link :to="{ name: 'Login' }">Iniciá sesión</router-link></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/helpers/axiosInterceptor";
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import TextInput from "../components/UI/TextInput.vue";
export default {
  components: { TextInput },
  mixins: [validationMixin],
  data() {
    return {
      username: "",
      password1: "",
      password: "",
      name: "",
      lastname: "",
      address: "",
      email: ""
    };
  },
  validations: {
    name: {
      required
    },
    lastname: {
      required
    },
    username: {
      required,
      minLength: minLength(8)
    },
    password: {
      required,
      minLength: minLength(8),
      sameAs: sameAs("password1")
    },
    password1: {
      required,
      minLength: minLength(8),
      sameAs: sameAs("password")
    },
    address: {
      required
    },
    email: {
      required,
      email
    }
  },
  computed: {
    user() {
      return {
        username: this.username,
        password: this.password,
        name: this.name,
        lastname: this.lastname,
        address: this.address,
        email: this.email
      };
    }
  },
  methods: {
    async register() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        axios
          .post("/api/users/register", this.user)
          .then(async resp => {
            await this.$store.dispatch("login", {
              username: this.username,
              password: this.password
            });
            this.$router.replace({ name: "Dashboard" });
          })
          .catch(error => {
            this.$toastr.e(error.response.data.message);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#login-container {
  padding: 50px;
}

@media (min-width: 1200px) {
  #login-container {
    width: 700px;
  }
  small.is-invalid {
    color: #dc3545;
  }
}
</style>
