<template>
  <form>
    <div class="mb-3 col-md-12 col-xs-12">
      <label>Nombre de Usuario</label>
      <text-input
        v-model.trim="user.username"
        :class="{ 'is-invalid': $v.user.username.$error }"
        type="text"
      />
    </div>
    <div class="mb-3 col-md-12 col-xs-12">
      <label>Email</label>
      <text-input
        v-model.trim="user.email"
        :class="{ 'is-invalid': $v.user.email.$error }"
      />
    </div>
    <div class="mb-3 col-md-6 col-xs-12">
      <label>Contraseña</label>
      <text-input
        v-model.trim="user.password"
        :class="{ 'is-invalid': $v.user.password.$error }"
        type="password"
      />
    </div>
    <div class="mb-3 col-md-6 col-xs-12">
      <label>Repetí la contraseña</label>
      <text-input
        v-model.trim="user.password1"
        :class="{ 'is-invalid': $v.user.password1.$error }"
        type="password"
      />
    </div>
    <div>Las contraseñas deben tener como mínimo 8 caracteres</div>
    <div class="mb-3 col-md-6 col-xs-12">
      <label>Nombre</label>
      <text-input
        v-model.trim="user.name"
        :class="{ 'is-invalid': $v.user.name.$error }"
        type="text"
      />
    </div>
    <div class="mb-3 col-md-6 col-xs-12">
      <label>Apellido</label>
      <text-input
        v-model.trim="user.lastname"
        :class="{ 'is-invalid': $v.user.lastname.$error }"
        type="text"
      />
    </div>
    <div class="mb-3 col-md-12 col-xs-12">
      <label>Dirección</label>
      <text-input
        v-model.trim="user.address"
        :class="{ 'is-invalid': $v.user.address.$error }"
        type="text"
      />
    </div>
    <div>
      <label>Roles</label>
      <div v-for="role in roles" :key="role.id">
        <input type="checkbox" v-model="user.rolesUser" :id="'role-' + role.id" :value="role" /> <label :for="'role-' + role.id"> {{ role.name }} </label>
      </div>
    </div>
    <div class="mb-3 col-md-12 col-xs-12">
      <button class="btn btn-primary" type="button" v-on:click="submit">
        Guardar
      </button>
    </div>
  </form>
</template>
<script>
import axios from '@/helpers/axiosInterceptor'

import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import TextInput from "../UI/TextInput.vue";
export default {
  props:['editUser', 'mode'],
  components: { TextInput },
  mixins: [validationMixin],
  watch: {
    editUser(newVal) {
      this.user = {...newVal};
    }
  },
  async mounted() {
    this.roles = (await axios.get('/api/roles')).data;
  },
  data() {
    return {
      user: {
        username: "",
        password1: "",
        password: "",
        name: "",
        lastname: "",
        address: "",
        email: "",
        rolesUser: []
      },
      roles: []
    };
  },
  validations: {
    user: {
      name: {
        required,
      },
      lastname: {
        required,
      },
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(8),
        sameAs: sameAs("password1"),
      },
      password1: {
        required,
        minLength: minLength(8),
        sameAs: sameAs("password"),
      },
      address: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("submit", this.user);
      }
    },
  },
};
</script>
