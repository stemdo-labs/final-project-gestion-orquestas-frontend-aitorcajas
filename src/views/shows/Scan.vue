<template>
    <div>
        <div>
            <label>Show</label>
            <multiselect 
                :options="shows"
                v-model="selectedShow"
                placeholder="Seleccione el show"
                label="name"
            ></multiselect>
        </div>
        <div v-if="selectedShow">
            <div v-if="checkinResult === null">
                <div id="qr-reader-container">
                    <qrcode-stream v-show="!fetchingTicket" @decode="onDecode" />
                </div>
                <div v-if="fetchingTicket">Leyendo el ticket...</div>
            </div>
            <div v-else>
                <div v-if="checkinResult">
                    Entrada leída correctamente
                </div>
                <div v-else-if="alreadyUsedTicket">
                    Ticket ya utilizado
                </div>
                <div v-else>
                    Error al leer el ticket
                </div>
                <button v-on:click="reset">Leer nueva</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../helpers/axiosInterceptor';
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default {
    components: {
        QrcodeStream, QrcodeDropZone, QrcodeCapture
    },
    data() {
        return {
            shows: [],
            fetchingTicket: false,
            checkinResult: null,
            selectedShow: null,
        }
    },
    mounted() {
        axios.get("/api/shows").then((response) => {
            this.shows = response.data;
        });
    },
    methods: {
        onDecode(code) {
            this.fetchingTicket = true;
            const request = axios.post("/api/tickets/checkin", null, { params: { code }});
            request.then(resp => {
                console.log(resp);
                this.checkinResult = true;
            });
            request.catch((error) => {
                console.log(Object.keys(error));
                this.checkinResult = false;

                const status = error.response.status;
                if (status === 403) {
                    this.alreadyUsedTicket = true;
                } 

            });
            request.finally(() => {
                this.fetchingTicket = false;
            });
        },
        reset() {
            this.fetchingTicket = false;
            this.checkinResult = null;
            this.alreadyUsedTicket = null;
        }
    }
}
</script>
<style scoped>
#qr-reader-container {
    height: 600px;
    width: 600px;
}
</style>