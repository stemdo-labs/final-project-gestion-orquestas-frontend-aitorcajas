<template>
    <div>
        <social-form
            :mode="mode"
            :edit-social="social"
            v-on:submit="handleSubmission($event)"
        >
        </social-form>
    </div>
</template>
<script>
import SocialForm from '../../components/Forms/SocialForm.vue';
export default {
    components: {
        SocialForm,
    },
    data() {
        return {
            social: {
                id: null,
                social_network_name: '',
                url: '',
            },
            mode: 'add',
        }
    },
    mounted() {
        if (this.$route.params.hasOwnProperty("id")) {
            this.mode = "edit";
            const id = this.$route.params.id;
            const request = this.$store.dispatch("getSocial", id);
            request.then(({ data }) => {
                this.social = data;
                this.$route.meta.link_name = data.name;
            });
        }
    },
    methods: {
        handleSubmission(social) {
            // await axios.post("/api/socal", social);
            this.$router.replace({ name: "SocialList" });
        }
    }
}
</script>