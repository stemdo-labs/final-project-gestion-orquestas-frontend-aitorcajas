<template>
  <div class="internal-container">
    <div class="row">
        <h1>
        Mis entradas
        </h1>
    </div>
    <template v-if="!loadingUserShows">
      <div v-for="show in ticketsByShow" :key="show.id" class="row">
          <h3>{{show.name}}</h3>
          <div v-for="ticket in show.userTickets" class="col-md-12 mb-5 ticket-card" style="background-color: white !important" :key="ticket.id">
              <h5>Ticket N° {{ ticket.id }}</h5>
              <qr-code :text="ticket.code"></qr-code>
          </div>
      </div>
      <div v-if="ticketsByShow.length === 0 && !errorOnLoad">
        <span>Usted no ha adquirido ningún ticket hasta el momento.</span>
      </div>
      <div v-else-if="errorOnLoad">
        <span>Ha ocurrido un error al cargar la página.</span>
      </div>
    </template>
    <template>

    </template>
  </div>
</template>
<script>
import axios from "../../helpers/axiosInterceptor";
export default {
  data() {
    return {
      tickets: [],
      ticketsByShow: [],
      loadingUserShows: false,
      errorOnLoad: false,
    };
  },
  async mounted() {
    const userId = this.$store.getters.currentUser.id;

    try {
      this.loadingUserShows = true;
      const response = await axios.get("/api/tickets", { params: { user_id: userId } });
      this.tickets = response.data;

        const shows = [];
        this.tickets.forEach((ticket) => {
          const found = shows.find(s => s.id === ticket.show.id);
            if (!found) {
                const newShow = ticket.show;
                newShow.userTickets = [];
                shows.push(newShow);
            }
        });

        this.tickets.forEach((ticket) => {
          const found = shows.find(s => s.id === ticket.show.id);
            found.userTickets.push({...ticket, show: null});
        });
        this.ticketsByShow = shows;
    } catch (error) {
      console.log(error.response)
      this.errorOnLoad = true;
    } finally {
      this.loadingUserShows = false;
    }
  }
};
</script>

<style scoped>
.ticket-card > * {
    color: black !important;
    background-color: white !important;
}
.ticket-card {
    padding: 10px;
    border-radius: 5px;
}
</style>