<template>
    <div>
        <div v-if="aNew">
            <h1>{{ aNew.title }}</h1>
            <h5><Calendar></Calendar> {{ aNew.publicDate | datetime }}</h5>
            <h5 v-if="authorName"><NoteEdit></NoteEdit> {{ authorName }}</h5>
            <p>{{ aNew.body }}</p>
        </div>
    </div>
</template>
<script>
import axios from "@/helpers/axiosInterceptor";
import Calendar from "vue-material-design-icons/Calendar.vue";
import NoteEdit from "vue-material-design-icons/NoteEdit.vue";


export default {
    components: {
        Calendar,
        NoteEdit,
    },
    data() {
        return {
            aNew: null
        }
    },
    computed: {
        authorName() {
            if (this.aNew.author) {
                const { author } = this.aNew;
                return author.lastname + ", " + author.name;
            }
            return "";
        }
    },
    async mounted() {
        const result = await axios.get('/api/news', { id: this.$route.params.id });
        this.aNew = result.data[0];
    }
}
</script>