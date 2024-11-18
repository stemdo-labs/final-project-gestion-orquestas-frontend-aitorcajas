<template>
  <div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" style="margin-right: 5px;" v-on:click="save">Guardar</button>
      <button class="btn btn-secondary" v-on:click="goBack">Volver</button>
    </div>
    <div v-if="view != 'addingSong'" class="row">
      <div class="col-md-4">
        <label>Nombre</label>
        <text-input v-model="resource.name"></text-input>
      </div>
      <div class="col-md-4">
        <label>Canción</label>
        <multiselect 
          :options="songs" 
          label="title" 
          v-model="resource.song"
          :taggable="true"
          v-on:tag="addSongView"
          placeholder="Buscar o crear canción..."
          select-label="Enter para seleccionar"
        ></multiselect>
      </div>
      <div  class="row mt-4">
        <MusicalResourceTextContent
          v-if="resource.typeMusicalResource.systemName == 'texto'"
          :mode="mode"
          v-model="resource.content"
        ></MusicalResourceTextContent>
        <MusicalResourceImageContent
          v-if="resource.typeMusicalResource.systemName == 'imagen'"
          :mode="mode"
          v-model="resource.content"
        ></MusicalResourceImageContent>

        <MusicalResourceVideoContent
          v-if="resource.typeMusicalResource.systemName == 'video'"
          :mode="mode"
          v-model="resource.content"
        ></MusicalResourceVideoContent>
      </div>
    </div>
      <div v-else>
        <h1>Agregar canción</h1>
        <song-form id="add-song-form" v-on:submit="addSong($event)" :edit-song="proposedSong">
        </song-form>
      </div>
  </div>
</template>
<script>
import MusicalResourceTextContent from "@/components/MusicalResourceTextContent";
import MusicalResourceImageContent from "@/components/MusicalResourceImageContent";
import MusicalResourceVideoContent from "@/components/MusicalResourceVideoContent";
import TextInput from "@/components/UI/TextInput";
import AddSongModal from "@/components/Modals/AddSongModal";
import SongForm from '../components/Forms/SongForm.vue';

export default {
  components: {
    TextInput,
    MusicalResourceTextContent,
    MusicalResourceImageContent,
    MusicalResourceVideoContent,
    AddSongModal,
    SongForm,
  },
  data() {
    return {
      resource: {
        name: "",
        description: "",
        song: null,
        typeMusicalResource: {},
        content: "",
      },
      mode: "add",
      view: 'normal',
      openAddSongModal: false,
      proposedSong: {},
    };
  },
  mounted() {
    this.$store.dispatch("fetchSongs");
    this.$store.dispatch("fetchMusicalResourceTypes").then(() => {
      if (this.$route.params.hasOwnProperty("id")) {
        this.mode = "edit";
        const id = this.$route.params.id;
        const request = this.$store.dispatch("getResource", id);
        request.then(({ data }) => {
          this.resource = data;
          this.$route.meta.link_name = data.name;
        });
      }
      if (this.$route.params.hasOwnProperty("type")) {
        this.resource.typeMusicalResource = this.musicalResourceTypes.find(
          (type) => {
            if (this.$route.params.type == type.systemName) {
              return true;
            }
          }
        );
      }
    });
  },
  computed: {
    songs() {
      return this.$store.getters.songs;
    },
    musicalResourceTypes() {
      return this.$store.getters.musicalResourceTypes;
    },
  },
  methods: {
    async save() {
      if (this.validate()) {
        await this.$store.dispatch("addMusicalResource", this.resource);
        await this.$store.dispatch("fetchResources");
        this.$router.push({ name: "Recursos" });
      }
    },
    validate() {
      return true;
    },
    addSong(song) {
      const request = this.$store.dispatch("addSong", song);
      request.then((response) => {
        console.log(response);
        this.$store.dispatch("fetchSongs").then(() => {
          this.resource.song = response.data;
          this.openAddSongModal = false;
        });
      }).catch(e => console.log(e.response)).finally(() => this.view = 'normal');
    },
    addSongView(songName) {
      this.view = 'addingSong';
      this.proposedSong.title = songName;
    },
    goBack() {
      this.$router.replace({ name: 'Recursos' });
    },
  },
};
</script>
<style>
#add-song-form .v-application--wrap {
  height: 100px;
  min-height: 100px;
}
</style>