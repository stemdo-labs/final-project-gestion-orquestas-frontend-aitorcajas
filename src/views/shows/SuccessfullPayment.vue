<template>
    <div class="d-flex flex-column">
        <p>
            Realizaste tu pago correctamente! En breve recibirás tus entradas por mail
        </p>
        <router-link :to="{name: 'Home'}">Volver al Inicio</router-link>
        <router-link :to="{name: 'MyTickets'}">Ver mis entradas</router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>