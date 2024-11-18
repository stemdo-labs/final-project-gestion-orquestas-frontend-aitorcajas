<template>
    <input type="text" :value="value" v-on:input="$emit('input', $event.target.value)" class="form-control" />
</template>
<script>
export default {
    props: ['value']
}
</script>