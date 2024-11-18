<template>
    <div>
        <div class="form-group">
            <label>Nombre</label>
            <input type="text" v-model="song.title" class="form-control" />
        </div>
        <div class="form-group">
            <label>Autor</label>
            <v-app>
              <multiselect 
                v-model="song.author" 
                :options="composers"
                label="name" 
                :taggable="true"
                tag-placeholder="Agregar compositor inexistente"
                :loading="loadingComposers"
                v-on:tag="createComposer"
                :searchable="true"
                placeholder="Buscar o crear autor..."
                select-label="Enter para seleccionar"
              ></multiselect>
            </v-app>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="submit">
                Confirmar
            </button>
        </div>
    </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import axiosInterceptor from "../../helpers/axiosInterceptor";

export default {
    props: ["editSong", "mode"],
    async mounted() {
        try {
            this.song = { ...this.editSong };
            this.loadingComposers = true;
            this.composers = (
                await axiosInterceptor.get("/api/composers")
            ).data;
            console.log(this.composers)
        } catch (error) {
        } finally {
            this.loadingComposers = false;
        }
    },
    data() {
        return {
            loadingComposers: false,
            composers: [{name: 'Pablo'}],
            song: {
                title: "",
                author: null,
            },
        };
    },
    validations: {
        song: {
            title: {
                required,
            },
            author: {
                required,
            },
        },
    },
    watch: {
        editSong(newVal) {
            this.song = { ...newVal };
        },
    },
    methods: {
        submit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.$emit("submit", this.song);
            }
        },
        async createComposer(composerName) {
          if (composerName.trim()) {
            const composer = (await axiosInterceptor.post('/api/composers', { name: composerName })).data;
            this.composers.push(composer);
            this.song.author = composer;
          }
        }
    },
};
</script>