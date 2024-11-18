<template>
  <form>
    <div class="mb-3 col-md-12 col-xs-12">
      <label>Red</label>
      <select-input
        :options="socialNetworks"
        optionKey="name"
        label="name"
        v-model="social.social_network_name"
        :class="{ 'is-invalid': $v.social.social_network_name.$error }"
      />
    </div>
    <div class="mb-3 col-md-12 col-xs-12">
        <label>URL</label>
        <text-input 
            v-model.trim="social.url"  
            :class="{ 'is-invalid': $v.social.url.$error }"
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
import { validationMixin } from "vuelidate";
import { required, url } from "vuelidate/lib/validators";

import TextInput from "../UI/TextInput.vue";
import TextAreaInput from "../UI/TextAreaInput.vue";
import DateInput from "../UI/DateInput.vue";
import CheckInput from "../UI/CheckInput.vue";
import SelectInput from "../UI/SelectInput.vue";

export default {
  props: ["editSocial", "mode"],
  components: {
    TextInput,
    TextAreaInput,
    DateInput,
    CheckInput,
    SelectInput
  },
  mixins: [validationMixin],
  watch: {
    editSocial(newVal) {
      this.social = {
        ...newVal
      };
    }
  },
  data() {
    return {
      socialNetworks: [{ name: "Instagram" }, { name: "Facebook" }, { name: "Twitter" }],
      social: {
        id: null,
        social_network_name: "",
        url: ""
      }
    };
  },
  validations: {
    social: {
      url: {
        required,
        url
      },
      social_network_name: {
        required
      }
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("submit", this.social);
      }
    }
  }
};
</script>
