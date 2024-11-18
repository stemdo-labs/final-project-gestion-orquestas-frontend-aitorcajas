<template>
    <form>
        <div class="mb-3 col-md-12 col-xs-12">
            <label>Título</label>
            <text-input
                v-model.trim="show.name"
                :class="{ 'is-invalid': $v.show.name.$error }"
                type="text"
            />
        </div>
        <div class="mb-3 col-md-12 col-xs-12">
            <label>Lugar</label>
            <text-input
                v-model.trim="show.place"
                :class="{ 'is-invalid': $v.show.place.$error }"
                type="text"
            />
        </div>
        <div class="mb-3 col-md-12 col-xs-12">
            <label>Fecha del show</label>
            <date-input
                v-model.trim="show.date"
                :class="{ 'is-invalid': $v.show.date.$error }"
                type="datetime-local"
            />
        </div>
        <div class="mb-3 col-md-12 col-xs-12">
            <label>Fecha de publicación</label>
            <date-input
                v-model.trim="show.publicDate"
                :class="{ 'is-invalid': $v.show.publicDate.$error }"
                type="datetime-local"
            />
        </div>
        <div class="mb-3 col-md-12 col-xs-12">
            <label>Cantidad de entradas disponibles</label>
            <text-input
                v-model.trim="show.tickets"
                :class="{ 'is-invalid': $v.show.tickets.$error }"
                type="number"
            />
        </div>
        <div class="mb-3 col-md-12 col-xs-12">
            <label>Precio</label>
            <text-input
                v-model="show.price"
                :class="{ 'is-invalid': $v.show.price.$error }"
                type="number"
            />
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
import { required, integer, minValue } from 'vuelidate/lib/validators';
import afterCurrentDateValidator from '@/helpers/vuelidate/afterCurrentDateValidator.js';

import TextInput from '../UI/TextInput.vue';
import TextAreaInput from '../UI/TextAreaInput.vue';
import DateInput from '../UI/DateInput.vue';
import CheckInput from '../UI/CheckInput.vue';
import SelectInput from '../UI/SelectInput.vue';

export default {
  props: ['editShow', 'mode'],
  components: {
    TextInput,
    TextAreaInput,
    DateInput,
    CheckInput,
    SelectInput,
  },
  mixins: [validationMixin],
  watch: {
    editShow(newVal) {
      this.show = {
        ...newVal,
        publicDate: newVal.publicDate
          ? moment(newVal.publicDate).format('YYYY-MM-DDTHH:mm:ss')
          : '',
        date: newVal.date
          ? moment(newVal.date).format('YYYY-MM-DDTHH:mm:ss')
          : '',
      };
    },
  },
  data() {
    return {
      show: {
        name: '',
        place: '',
        date: '',
        publicDate: '',
        tickets: null,
      },
    };
  },
  validations: {
    show: {
      name: {
        required,
      },
      place: {
        required,
      },
      tickets: {
        required,
        integer,
      },
      publicDate: {
        required,
      },
      date: {
        required,
        afterCurrentDateValidator,
      },
      price: {
        required,
        integer,
        minValue: minValue(0),
      },
    },
  },
  methods: {
    submit() {
      console.log(this.show);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('submit', this.show);
      }
    },
  },
};
</script>
