<template>
    <div id="docs-layout" class="container-fluid h-100">
        <div class="">
            <docs-menu></docs-menu>
            <main class="col">
                <nav class="d-flex justify-content-between">
                    <div>
                        <h1>{{ title }}</h1>
                    </div>
                    <account-menu></account-menu>
                </nav>
                <section>
                    <slot></slot>
                </section>
            </main>
        </div>
    </div>
</template>
<script>
import DocsMenu from "@/components/Menus/DocsMenu.vue";
import AccountMenu from "../components/Menus/AccountMenu.vue";

export default {
    components: {
        "docs-menu": DocsMenu,
        "account-menu": AccountMenu,
    },
    computed: {
        title() {
            return this.$route.meta.link_name;
        },
    },
};
</script>
<style lang="scss">
#docs-layout > div > main > section {
    padding: 20px 80px;
}
#docs-layout > div > main > nav {
    padding: 30px 80px;
    border-bottom: 1px solid var(--light);
}

@media (max-width: 500px)  {
    #docs-layout nav {
        background-color: 'red';    
    }
}


</style>
