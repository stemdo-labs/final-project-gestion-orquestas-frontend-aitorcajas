<template>
  <v-dialog :value="open" max-width="290">
    <v-card>
      <v-card-title class="text-h5"> Agregar canción </v-card-title>

      <v-card-text>
        <SongForm v-on:submit="confirm($event)" />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="close"> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import SongForm from "@/components/Forms/SongForm";
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SongForm,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm(song) {
      this.$emit("confirm", song);
    },
  },
};
</script>