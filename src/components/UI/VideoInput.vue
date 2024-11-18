<template>
    <div class="form-group">
        <label>Video</label>
        <input class="form-control" type="text" :value="value" v-on:input="handleChange" />
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleChange(event) {  
            this.$emit('input', event.target.value); 
        }
    }
}
</script>