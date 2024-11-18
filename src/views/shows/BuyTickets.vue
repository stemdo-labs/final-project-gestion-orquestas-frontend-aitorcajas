<template>
  <div class="container">
    <div class="row">
      <h1>{{ show.name }}</h1>
    </div>
    <div class="row" style="margin-bottom: 20px;">
      <div class="col-md-6">
        <img
          style="max-height:100%; max-width:100%;"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Dublin_Philharmonic_Orchestra_performing_Tchaikovsky%27s_Symphony_No_4_in_Charlotte%2C_North_Carolina.jpg/800px-Dublin_Philharmonic_Orchestra_performing_Tchaikovsky%27s_Symphony_No_4_in_Charlotte%2C_North_Carolina.jpg"
        />
      </div>
      <div class="col-md-6">
      <h4><Calendar></Calendar> {{ show.date | datetime }}</h4>
      <h4><Pin></Pin>{{ show.place }}</h4>
      <h5>{{ show.price | money }}</h5>
      <div v-if="true">
        <div style="margin-bottom: 20px;">
          <label>Cantidad</label>
          <input class="form-control" type="number" v-model="quantity" />
        </div>
        <button class="grm-link-button" v-on:click="buyTickets" style="margin-bottom: 20px;">
          Confirmar
        </button>
        <!--template>{{ mpResponse }}</template-->
      </div>
      <!-- Mensaje de procesamiento -->
      <div v-if="processing" class="alert alert-info">
        Su compra está siendo procesada...
      </div>
      <div v-else>
        <div style="margin-bottom: 20px;">
          <label>Cantidad: {{ quantity }}</label>
        </div>
      </div>
      <!-- <div id="button-checkout" class="grm-link-button"></div> -->
    </div>
  </div>
</div>
</template>
<script>
import axios from "@/helpers/axiosInterceptor";

export default {
  data() {
    return {
      quantity: 1,
      show: null,
      processing: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  filters: {
    money(number) {
      return "$" + number;
    }
  },
  mounted() {
    const showId = this.$route.params.id;
    axios.get("/api/shows", { params: { id: showId } }).then((resp) => {
      this.show = resp.data;
      this.loading = false;
      this.processing =false;
    });
  },
  methods: {
    buyTickets() {
      this.processing = true; // Mostrar el mensaje de procesamiento
      axios.post("/api/tickets/saveTicket", {
        user_id: this.currentUser.id,
        quantity: this.quantity,
        show_id: this.show.id
      })
      .then(async response => {
        // Aquí puedes agregar alguna lógica si necesitas realizar alguna acción después de guardar el ticket
        console.log("Ticket guardado exitosamente:", response.data);
        this.$router.push({ path: "/tickets" });
      })
      .catch(error => {
        console.error("Error al guardar el ticket:", error);
      })
      .finally(() => {
        this.processing = false; // Ocultar el mensaje de procesamiento cuando termine
      });
    }
  }
};
</script>

<style scoped>
.mercadopago-button {
  background-color: var(--primary);
}
</style>
