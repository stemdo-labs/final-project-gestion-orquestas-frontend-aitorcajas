<template>
    <div id="admin-layout" class="container-fluid h-100">
        <div class="">
            <admin-menu></admin-menu>
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

<table border="1">
<caption>
    Rental price
</caption>
<thead>
    <tr>
        <td></td>
        <th id="small" scope="col">
            Small car
        </th>
        <th id="big" scope="col">
            Big Car
        </th>
    </tr>
</thead>
<tbody>
    <tr>
        <th id="paris" class="span" colspan="3" scope="colgroup">
            Paris
        </th>
        </tr>
        <tr>
        <th headers="paris" id="day1">
            1 day
        </th>
        <td headers="paris day1 big"> <!-- Noncompliant, referencing the column "big" instead of "small" -->
            11 euros
        </td>
        <td headers="berlin day1 big"> <!-- Noncompliant, there is no header with id "berlin" -->
            50 euros
        </td>
        </tr>
    </tr>
</tbody>
</table>
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers

Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers

Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers

Table cells should reference their headers
Table cells should reference their headers
Table cells should reference their headers

<script>
import AdminMenu from "@/components/Menus/AdminMenu.vue";
import AccountMenu from "../components/Menus/AccountMenu.vue";

export default {
    components: {
        "admin-menu": AdminMenu,
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
#admin-layout > div > main > section {
    padding: 20px 80px;
}
#admin-layout > div > main > nav {
    padding: 30px 80px;
    border-bottom: 1px solid var(--light);
}

@media (max-width: 500px)  {
    #admin-layout nav {
        background-color: 'red';    
    }
}


</style>
