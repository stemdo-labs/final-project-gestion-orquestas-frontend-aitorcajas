<template>
    <div>
        <b-button class="toggler" v-b-toggle.sidebar-menu
            ><Menu></Menu
        ></b-button>
        <b-sidebar id="sidebar-menu" title="Administración" shadow>
            <div class="px-3 py-2">
                <ul
                    class="
                        flex-column
                        navbar-nav
                        w-100
                        justify-content-between
                    "
                >
                    <li
                        class="nav-item"
                    >
                        <router-link
                            class="nav-link pl-0"
                            :to="{name: 'Home'}"
                        >
                            Home
                        </router-link>
                    </li>
                    <li v-for="link in links" :key="link.name" class="nav-item">
                        <router-link
                            class="nav-link pl-0"
                            :to="{ name: link.name }"
                            >{{ link.meta.link_name }}</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link pl-0"
                            :to="{ name: 'IndiceDocs' }"
                            >Ayuda</router-link
                        >
                    </li>
                </ul>
            </div>
        </b-sidebar>
    </div>
</template>
<script>
import Menu from "vue-material-design-icons/Menu.vue";

export default {
    components: {
        Menu,
    },
    data() {
        return {
            links: [],
        };
    },
    mounted() {
        this.links = this.$router.options.routes.filter(
            (route) => route.meta.is_admin == 1
        );
    },
};
</script>
<style lang="scss" scoped>
#sidebar-menu {
    color: var(--bs-body-color);
}
.toggler {
    background-color: inherit;
    border: 0;
    &:focus,
    &:active,
    &:hover {
        background-color: inherit;
        border: 0;
    }
}
</style>