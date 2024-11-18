<template>
    <select
        class="form-control"
        :value="value ? value[optionKey] : null"
        v-on:input="changed($event.target.value)"
    >
        <option :value="null">-- Seleccionar --</option>
        <option
            v-for="option in options"
            :key="option[optionKey]"
            :value="option[optionKey]"
        >
            {{ option[label] }}
        </option>
    </select>
</template>
<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        optionKey: {
            type: String,
            required: true,
        },
        value: {},
    },
    methods: {
        changed(selectedKey) {
            if (selectedKey === null) {
                this.$emit("input", null);
            }

            const selected = this.options.find(
                (opt) => opt[this.optionKey] == selectedKey
            );
            this.$emit("input", selected);
        },
    },
};
</script>