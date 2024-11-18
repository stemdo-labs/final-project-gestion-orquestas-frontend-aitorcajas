<template>
  <div>
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card v-if="resourceDeleting">
        <v-card-title class="text-h5">
          Eliminar recurso {{ resourceDeleting.name }}
        </v-card-title>

        <v-card-text>
          ¿Está seguro que desea eliminar el recurso
          {{ resourceDeleting.username }}? Esta acción no puede deshacerse.
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
        <DropdownButton
          title="Agregar"
          :items="musicalResourceTypes"
          label="label"
          v-on:selected="selectedAddType($event)"
        ></DropdownButton>
        <!--router-link :to="{ name: 'CrearRecurso' }" class="btn btn-primary"
          ><Plus />Agregar</router-link-->
      </div>
    </div>
    <div class="col-md-12">
      <v-data-table :headers="tableheaders" :items="musicalResources">
        <template v-slot:item.name="{ item }">
          <router-link :to="{ name: 'VerRecurso', params: { id: item.id } }">{{
            item.name
          }}</router-link>
        </template>
        <template v-slot:item.actions="{ item }">
          <router-link
            class="btn btn-primary btn-sm"
            :to="{ name: 'EditarRecurso', params: { id: item.id } }"
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

import DropdownButton from "@/components/UI/DropdownButton.vue";

export default {
  data() {
    return {
      deleteDialog: false,
      resourceDeleting: null,
      musicalResourceTypes: [
        {
          id: "texto",
          label: "Texto",
        },
        {
          id: "imagen",
          label: "Imagen",
        },
        {
          id: "video",
          label: "Video",
        },
      ],
      tableheaders: [
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Canción",
          align: "start",
          sortable: true,
          value: "song.title",
        },
        {
          text: "Tipo",
          align: "start",
          sortable: true,
          value: "typeMusicalResource.name",
        },
        {
          text: "Acciones",
          align: "center",
          sortable: true,
          value: "actions",
        },
      ],
    };
  },
  components: {
    Plus,
    Delete,
    ApplicationEdit,
    DropdownButton,
  },
  mounted() {
    this.fetchMusicalResouces();
  },
  methods: {
    fetchMusicalResouces() {
      const req = this.$store.dispatch("fetchResources");
      req.then(r => console.log(r.data))
    },
    confirmResourceDeletion() {
      this.$store.dispatch("deleteResource", this.resourceDeleting.id);
      this.deleteDialog = false;
    },
    selectedAddType(type) {
      this.$router.push({ name: "CrearRecurso", params: {type: type.id} });
    },
  },
  computed: {
    musicalResources() {
      return this.$store.getters.resources;
    },
  },
};
</script>