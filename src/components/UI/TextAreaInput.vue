<template>
    <textarea class="form-control" :value="value" :rows="rows" v-on:input="$emit('input', $event.target.value)"></textarea>
</template>
<script>
export default {
    props: {
        value: {},
        rows: {
            default: 5,
            type: Number
        }
    }
}
</script>