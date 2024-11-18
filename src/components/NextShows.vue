<template>
    <div v-if="nextShows.length">
        <div>Próximos shows!</div>
        <ul>
            <li v-for="show in nextShows" :key="show.id">
                <router-link class="show-link" :to="{ name: 'ShowView', params: { id: show.id } }">
                    {{ show.place }} -
                    {{ show.date | date('DD/MM') }}
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        nextShows: {
            type: Array,
            required: true
        }
    }
}
</script>
<style scoped>
.show-link {
    font-weight: 900;
}
li {
    list-style: none;
}
</style>