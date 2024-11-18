<template>
    <div id="home-container">
        <div id="carousel-container">
            <carousel :autoplay="true" :per-page="1">
                <slide>
                    <div>
                        <img
                            style="width: 100%"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Dublin_Philharmonic_Orchestra_performing_Tchaikovsky%27s_Symphony_No_4_in_Charlotte%2C_North_Carolina.jpg/800px-Dublin_Philharmonic_Orchestra_performing_Tchaikovsky%27s_Symphony_No_4_in_Charlotte%2C_North_Carolina.jpg"
                        />
                    </div>
                </slide>
                <slide>
                    <div>
                        <img
                            style="width: 100%; object-fit: cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Dublin_Philharmonic_Orchestra_performing_Tchaikovsky%27s_Symphony_No_4_in_Charlotte%2C_North_Carolina.jpg/800px-Dublin_Philharmonic_Orchestra_performing_Tchaikovsky%27s_Symphony_No_4_in_Charlotte%2C_North_Carolina.jpg"
                        />
                    </div>
                </slide>
            </carousel>
        </div>
        <div class="content">
            <aside>
                <next-shows :next-shows="nextShows"></next-shows>
            </aside>
            <section>
                <article>
                    <div>
                        <h1>Charagua</h1>
                        <h2>Suena la orilla</h2>
                    </div>
                    <div>
                        <h3>Últimas noticias</h3>
                        <div id="news-container">
                            <new-card
                                v-for="aNew in latestNews"
                                :key="aNew.id"
                                :a-new="aNew"
                            >
                            </new-card>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    </div>
</template>
<script>
import axios from "@/helpers/axiosInterceptor";
import NewCard from "@/components/News/NewCard.vue";
import { Carousel, Slide } from "vue-carousel";
import NextShows from '../components/NextShows.vue';
import moment from 'moment';

export default {
    components: {
        NewCard,
        Carousel,
        Slide,
        NextShows,
    },
    data() {
        return {
            latestNews: [],
            nextShows: [],
        };
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },
    },
    mounted() {
        axios
        .get("/api/news")
        .then((response) => {
            this.latestNews = response.data.sort((aNew, bNew) => {
                if (moment(aNew.publicDate).isBefore(moment(bNew.publicDate))) {
                    return 1;
                } else {
                    return -1;
                }
            });
        });
        axios
        .get("/api/shows")
        .then((response) => {
            this.nextShows = response.data;
        });
    },
};
</script>
<style scoped>
#news-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

#news-container > .card {
    flex: 1;
    margin: 5px;
}

#news-container > .card:first-child {
    margin-left: 0px;
}
#carousel-container {
    width: 100%;
}

#home-container {
    width: 100%;
}
.content {
    display: grid;
    grid-template-columns: 1fr 2fr;
}
@media (max-width: 902px) {
    #news-container {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media(max-width: 768px) {
    .content {
        grid-template-columns: 1fr;
    }
    #news-container {
        grid-template-columns: 1fr;

    }
}
</style>