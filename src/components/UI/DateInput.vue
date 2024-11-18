<template>
    <input class="form-control" type="date" v-on:input="$emit('input', $event.target.value)" :value="value" />
</template>
<script>
export default {
    props: {
        value: {}
    }
}
</script>