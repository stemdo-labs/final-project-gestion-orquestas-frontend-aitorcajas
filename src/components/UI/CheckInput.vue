<template>
    <input type="checkbox" :value="value" v-on:input="$emit('input', $event.target.value)" />
</template>
<script>
export default {
    props: ['value']
}
</script>