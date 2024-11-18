<template>
    <form>
        <div class="mb-3 col-md-12 col-xs-12">
            <label>Nombre título</label>
            <text-input
                v-model.trim="aNew.title"
                :class="{ 'is-invalid': $v.aNew.title.$error }"
                type="text"
            />
        </div>
        <div class="mb-3 col-md-12 col-xs-12">
            <label>Cuerpo</label>
            <text-area-input
                v-model.trim="aNew.body"
                :class="{ 'is-invalid': $v.aNew.body.$error }"
            />
        </div>
        <!--div class="mb-3 col-md-6 col-xs-12">
            <label>Autor</label>
            <text-input
                v-model.trim="aNew.author"
                :class="{ 'is-invalid': $v.aNew.author.$error }"
                type="text"
            />
        </div-->
        <div class="mb-3 col-md-6 col-xs-12">
            <label>Autor</label>
            <select-input
                :class="{ 'is-invalid': $v.aNew.author.$error }"
                :options="users" v-model="aNew.author" label="username" option-key="id"></select-input>
        </div>
        <div class="mb-3 col-md-6 col-xs-12">
            <label>Fecha de publicación</label>
            <date-input
                v-model.trim="aNew.publicDate"
                :class="{ 'is-invalid': $v.aNew.publicDate.$error }"
            />
        </div>
        <div class="mb-3 col-md-6 col-xs-12">
            <input type="checkbox" id="enabled" v-model="aNew.enabled" />
            <label for="enabled">Habilitado</label>
        </div>
        <div class="mb-3 col-md-12 col-xs-12">
            <button class="btn btn-primary" type="button" v-on:click="submit">
                Guardar
            </button>
        </div>
    </form>
</template>
<script>
import moment from 'moment';

import { validationMixin } from 'vuelidate';
import {
  required,
} from 'vuelidate/lib/validators';
import axios from '@/helpers/axiosInterceptor';

import TextInput from '../UI/TextInput.vue';
import TextAreaInput from '../UI/TextAreaInput.vue';
import DateInput from '../UI/DateInput.vue';
import SelectInput from '../UI/SelectInput.vue';

export default {
  props: ['editNew', 'mode'],
  components: {
    TextInput, TextAreaInput, DateInput, SelectInput,
  },
  mixins: [validationMixin],
  watch: {
    editNew(newVal) {
      this.aNew = {
        ...newVal,
        publicDate: newVal.publicDate
          ? moment(newVal.publicDate).format('YYYY-MM-DD')
          : '',
      };
    },
  },
  data() {
    return {
      aNew: {
        title: '',
        body: '',
        author: '',
        enabled: true,
      },
      users: [],
    };
  },
  validations: {
    aNew: {
      title: {
        required,
      },
      body: {
        required,
      },
      author: {
        required,
      },
      publicDate: {
        required,
      },
    },
  },
  mounted() {
    const usersRequest = axios.get('/api/users');

    usersRequest.then((resp) => {
      this.users = resp.data;
    });
  },
  methods: {
    submit() {
      console.log(this.aNew);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('submit', this.aNew);
      }
    },
  },
};
</script>
