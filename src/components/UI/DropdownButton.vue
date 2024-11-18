<template>
  <b-dropdown id="dropdown-1" :text="title" class="m-md-2">
    <b-dropdown-item
      class="dropdown-item"
      v-for="item in items"
      :key="item[label]"
      v-on:click="clicked(item)"
      >{{ item[label] }}</b-dropdown-item
    >
  </b-dropdown>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
    items: {
      required: true,
      type: Array,
    },
    label: {
      default: "text",
      type: String,
    },
  },
  methods: {
    clicked(item) {
        console.log(item);
      this.$emit("selected", item);
    },
  },
};
</script>