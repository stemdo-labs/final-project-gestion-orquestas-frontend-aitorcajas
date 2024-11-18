<template>
    <div data-app v-if="news" class="col-md-12">
        <div class="d-flex flex-row-reverse">
            <router-link :to="{ name: 'CrearNoticia' }" class="btn btn-primary"
                ><Plus />Agregar</router-link
            >
        </div>
        <v-data-table :headers="tableHeaders" :items="news">
            <template v-slot:item.body="{ item }">
                {{ item.body | preview }}
            </template>
            <template v-slot:item.author="{ item }">
                {{ item.author.username }}
            </template>
            <template v-slot:item.createdDate="{ item }">
                {{ item.createdDate | formatDate }}
            </template>
            <template v-slot:item.publicDate="{ item }">
                {{ item.publicDate | formatDate }}
            </template>
            <template v-slot:item.enabled="{ item }">
                {{ item.enabled ? 'Sí': 'No' }}
            </template>
            <template v-slot:item.actions="{ item }">
                <router-link
                    class="btn btn-primary btn-sm"
                    :to="{ name: 'EditarNoticia', params: { id: item.id } }"
                    ><CommentEdit
                /></router-link>
                <button
                    class="btn btn-danger btn-sm"
                    v-on:click="deleteNew(item)"
                >
                    <Delete />
                </button>
            </template>
        </v-data-table>
        <div>
            <v-dialog v-model="deleteDialog" max-width="290">
                <v-card v-if="newDeleting">
                    <v-card-title class="text-h5">
                        Eliminar noticia {{ newDeleting.title }}
                    </v-card-title>

                    <v-card-text>
                        ¿Está seguro que desea eliminar la noticia
                        {{ newDeleting.title }}? Esta acción no puede
                        deshacerse.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="deleteDialog = false"
                        >
                            Cancelar
                        </v-btn>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="confirmNewDeletion()"
                        >
                            Eliminar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>
<script>
import Plus from "vue-material-design-icons/Plus.vue";
import CommentEdit from "vue-material-design-icons/CommentEdit.vue";
import Delete from "vue-material-design-icons/Delete.vue";

import moment from "moment";
import axios from "@/helpers/axiosInterceptor";
export default {
    components: {
        Plus,
        Delete,
        CommentEdit,
    },
    data() {
        return {
            tableHeaders: [
                {
                    text: "Título",
                    align: "start",
                    sortable: true,
                    value: "title",
                },
                {
                    text: "Cuerpo",
                    align: "start",
                    sortable: false,
                    value: "body",
                },
                {
                    text: "Autor",
                    align: "start",
                    sortable: false,
                    value: "author",
                },
                {
                    text: "Creado",
                    align: "start",
                    sortable: false,
                    value: "createdDate",
                },
                {
                    text: "Publicado",
                    align: "start",
                    sortable: false,
                    value: "publicDate",
                },
                {
                    text: "Habilitado",
                    align: "start",
                    sortable: false,
                    value: "enabled",
                },
                {
                    text: "Acciones",
                    align: "start",
                    sortable: false,
                    value: "actions",
                },
            ],
            news: [],
            newDeleting: null,
            deleteDialog: false,
        };
    },
    mounted() {
        axios
            .get("/api/news")
            .then((resp) => {
                this.news = resp.data;
            })
            .catch((e) => {});
    },
    filters: {
        preview: function (text) {
            return text.substring(0, 15) + "...";
        },
        formatDate(stringDate, format = "DD/MM/YYYY") {
            return moment(stringDate).format(format);
        },
    },
    methods: {
        deleteNew(item) {
            this.newDeleting = item;
            this.deleteDialog = true;
        },
        confirmNewDeletion() {
            this.$store.dispatch("deleteNew", this.newDeleting.id);
            this.deleteDialog = false;

            const index = this.news
                .map((n) => n.id)
                .indexOf(this.newDeleting.id);
            if (index > -1) {
                this.news.splice(index, 1);
            }
        },
    },
};
</script>