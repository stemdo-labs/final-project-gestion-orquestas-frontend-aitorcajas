<template>
  <div>
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card v-if="resourceDeleting">
        <v-card-title class="text-h5">
          Eliminar red {{ resourceDeleting.social_network_name }}
        </v-card-title>

        <v-card-text>
          ¿Está seguro que desea eliminar la red
          {{ resourceDeleting.social_network_name }}?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Cancelar
          </v-btn>

          <v-btn color="green darken-1" text @click="confirmResourceDeletion">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="col-md-12">
      <div class="d-flex justify-content-between">
        <h2>Listado</h2>
        <router-link :to="{ name: 'addSocial' }" class="btn btn-primary"
          ><Plus />Agregar</router-link
        >
      </div>
    </div>
    <div class="col-md-12">
      <v-data-table :headers="tableheaders" :items="socialNetworks">
        <template v-slot:item.actions="{ item }">
          <router-link
            class="btn btn-primary btn-sm"
            :to="{ name: 'EditSocial', params: { id: item.id } }"
          >
            <ApplicationEdit />
          </router-link>
          <button
            class="btn btn-danger btn-sm"
            v-on:click="
              resourceDeleting = item;
              deleteDialog = true;
            "
          >
            <Delete />
          </button>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import Plus from "vue-material-design-icons/Plus.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import ApplicationEdit from "vue-material-design-icons/ApplicationEdit.vue";

export default {
  components: {
    Plus,
    Delete,
    ApplicationEdit,
  },
  data() {
    return {
      deleteDialog: false,
      resourceDeleting: null,
      socialNetworks: [],
      tableheaders: [
        {
          text: "Red",
          align: "start",
          sortable: true,
          value: "social_network_name"
        },
        {
          text: "URL",
          align: "start",
          sortable: true,
          value: "url"
        },
        {
          text: "Acciones",
          align: "center",
          sortable: true,
          value: "actions"
        }
      ]
    };
  },
  mounted() {
    this.fetchNetworks();
  },
  methods: {
    async fetchNetworks() {
      this.socialNetworks = [
        { id: 1, social_network_name: "Instagram", url: "https://instagram/leomessi" }
      ];
    },
    deleteNetwork() {}
  }
};
</script>
