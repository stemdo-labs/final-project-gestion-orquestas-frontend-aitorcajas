<template>
    <div data-app v-if="shows" class="col-md-12">
        <div class="d-flex flex-row-reverse">
            <router-link :to="{ name: 'CrearShow' }" class="btn btn-primary"
                ><Plus />Agregar</router-link
            >
        </div>
        <v-data-table :headers="tableHeaders" :items="shows">
            <template v-slot:item.place="{ item }">
                {{ item.place | preview(25) }}
            </template>
            <template v-slot:item.publicDate="{ item }">
                {{ item.publicDate | formatDate('DD/MM/YYYY HH:mm') }}
            </template>
            <template v-slot:item.date="{ item }">
                {{ item.date | formatDate('DD/MM/YYYY HH:mm') }}
            </template>
            <template v-slot:item.actions="{ item }">
                <router-link
                    class="btn btn-primary btn-sm"
                    :to="{ name: 'EditarShow', params: { id: item.id } }"
                    ><CommentEdit
                /></router-link>
                <button
                    class="btn btn-danger btn-sm"
                    v-on:click="deleteShow(item)"
                >
                    <Delete />
                </button>
            </template>
        </v-data-table>
        <div>
            <v-dialog v-model="isDeleting" max-width="290">
                <v-card v-if="showDeleting">
                    <v-card-title class="text-h5">
                        Eliminar show {{ showDeleting.name }}
                    </v-card-title>

                    <v-card-text>
                        ¿Está seguro que desea eliminar el show
                        {{ showDeleting.name }}? Esta acción no puede
                        deshacerse.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="isDeleting = false"
                        >
                            Cancelar
                        </v-btn>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="confirmShowDeletion()"
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
                    text: "Nombre",
                    align: "start",
                    sortable: true,
                    value: "name",
                },
                {
                    text: "Lugar",
                    align: "start",
                    sortable: true,
                    value: "place",
                },
                {
                    text: "Fecha",
                    align: "end",
                    sortable: false,
                    value: "date",
                },
                {
                    text: "Publicación",
                    align: "end",
                    sortable: false,
                    value: "publicDate",
                },
                {
                    text: "Tickets",
                    align: "end",
                    sortable: true,
                    value: "tickets",
                },
                {
                    text: "Acciones",
                    align: "end",
                    sortable: true,
                    value: "actions",
                },
            ],
            shows: [],
            showDeleting: null,
            isDeleting: false,
        };
    },
    mounted() {
        axios
            .get("/api/shows")
            .then((resp) => {
                this.shows = resp.data;
            })
            .catch((e) => {});
    },
    filters: {
        preview: function (text, max = 15) {
            return text.substring(0, max) + "...";
        },
        formatDate(stringDate, format = "DD/MM/YYYY") {
            return moment(stringDate).format(format);
        },
    },
    methods: {
        deleteShow(show) {
            this.showDeleting = show;
            this.isDeleting = true;
        },
        confirmShowDeletion() {
            this.$store.dispatch("deleteShow", this.showDeleting.id);
            this.isDeleting = false;

            const index = this.shows
                .map((n) => n.id)
                .indexOf(this.showDeleting.id);
            if (index > -1) {
                this.shows.splice(index, 1);
            }
        }
    }
};
</script>