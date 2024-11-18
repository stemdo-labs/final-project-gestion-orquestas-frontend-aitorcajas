<template>
  <div class="w-50">
    <h2>Editar mi perfil</h2>
    <div>
      <div style="display: flex; justify-content: space-between;">
        <label>Email</label>
        <small class="is-invalid" v-if="$v.email.$invalid">Ingrese e-mail válido</small>
      </div>
      <text-input v-model="email" type="email" />
    </div>
    <div class="row">
      <div class="mt-3 w-50">
        <div style="display: flex; justify-content: space-between;">
          <label>Nombre</label>
          <small class="is-invalid" v-if="$v.name.$invalid">Ingrese nombre</small>
        </div>
        <text-input v-model="name" type="text" />
      </div>
      <div class="mt-3 w-50">
        <div style="display: flex; justify-content: space-between;">
          <label>Apellido</label>
          <small class="is-invalid" v-if="$v.lastname.$invalid">Ingrese apellido</small>
        </div>
        <text-input v-model="lastname" type="text" />
      </div>
    </div>
    <div class="mt-3">
      <div style="display: flex; justify-content: space-between;">
        <label>Dirección</label>
        <small class="is-invalid" v-if="$v.address.$invalid">Ingrese dirección</small>
      </div>
      <text-input v-model="address" type="text" />
    </div>
    <div class="mt-3" style="display: flex; justify-content: flex-end; color: white;">
      <button class="btn btn-primary btn-md" @click="confirm" type="button">Confirmar</button>
    </div>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import TextInput from '../UI/TextInput.vue';

export default {
  components: {
    TextInput,
  },
  mixins: [validationMixin],
  data() {
    return {
      email: '',
      name: '',
      lastname: '',
      address: '',
    };
  },
  watch: {
    user() {
      this.email = this.user.email;
      this.name = this.user.name;
      this.lastname = this.user.lastname;
      this.address = this.user.address;
    },
  },
  props: ['user'],
  mounted() {
    this.email = this.user.email;
    this.name = this.user.name;
    this.lastname = this.user.lastname;
    this.address = this.user.address;
    console.log(this.user);
  },
  validations: {
    name: {
      required,
    },
    lastname: {
      required,
    },
    email: {
      required,
      email,
    },
    address: {
      required,
    },
  },
  methods: {
    confirm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('completed', {
          email: this.email,
          username: this.username,
          name: this.name,
          lastname: this.lastname,
          address: this.address,
        });
      }
    },
  },
};
</script>
