<template>
    <div>
        <div class="col-md-12">
            <div class="d-flex justify-content-between">
                <h2>Listado de Usuarios</h2>
                <router-link
                    :to="{ name: 'CrearUsuario' }"
                    class="btn btn-primary"
                    ><AccountPlus />Agregar</router-link
                >
            </div>
        </div>
        <div class="col-md-12">
            <v-data-table :headers="tableheaders" :items="users">
                <template v-slot:item.actions="{ item }">
                    <router-link
                        class="btn btn-primary btn-sm"
                        :to="{ name: 'EditarUsuario', params: { id: item.id } }"
                        ><AccountEdit
                    /></router-link>
                    <button
                        class="btn btn-danger btn-sm"
                        v-on:click="deleteUser(item)"
                    >
                        <Delete />
                    </button>
                </template>
            </v-data-table>
        </div>
        <v-dialog v-model="deleteDialog" max-width="290">
            <v-card v-if="userDeleting">
                <v-card-title class="text-h5">
                    Eliminar usuario {{ userDeleting.username }}
                </v-card-title>

                <v-card-text>
                    ¿Está seguro que desea eliminar el usuario
                    {{ userDeleting.username }}? Esta acción no puede
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
                        @click="confirmUserDeletion"
                    >
                        Eliminar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import AccountEdit from "vue-material-design-icons/AccountEdit.vue";
import AccountPlus from "vue-material-design-icons/AccountPlus.vue";
import Delete from "vue-material-design-icons/Delete.vue";

export default {
    components: {
        AccountEdit,
        Delete,
        AccountPlus,
    },
    data() {
        return {
            userDeleting: null,
            deleteDialog: false,
            tableheaders: [
                {
                    text: "ID",
                    align: "start",
                    sortable: true,
                    value: "id",
                },
                {
                    text: "Nombre de Usuario",
                    align: "start",
                    sortable: true,
                    value: "username",
                },
                {
                    text: "Nombre",
                    align: "start",
                    sortable: true,
                    value: "name",
                },
                {
                    text: "Apellido",
                    align: "start",
                    sortable: true,
                    value: "lastname",
                },
                {
                    text: "Email",
                    align: "start",
                    sortable: true,
                    value: "email",
                },
                {
                    text: "Dirección",
                    align: "start",
                    sortable: true,
                    value: "address",
                },
                {
                    text: "Acciones",
                    align: "start",
                    sortable: false,
                    value: "actions",
                },
            ],
        };
    },
    mounted() {
        this.$store.dispatch("getUsers");
    },
    computed: {
        users() {
            return this.$store.getters.users;
        },
    },
    methods: {
        deleteUser(user) {
            this.userDeleting = user;
            this.deleteDialog = true;
        },
        confirmUserDeletion() {
            this.$store.dispatch("deleteUser", this.userDeleting.id);
            this.deleteDialog = false;
        },
    },
};
</script>
