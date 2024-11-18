<template>
  <div>
    <VideoInput
      v-if="editable"
      :value="value"
      v-on:input="handleChange"
    />
    <YoutubeVue
      v-if="videoId"
      :videoid="videoId"
      :width="480"
      :height="320"
      ref="youtube"
    ></YoutubeVue>
  </div>
</template>
<script>
import VideoInput from "@/components/UI/VideoInput";
import { YoutubeVue } from "youtube-vue";
export default {
  components: {
    YoutubeVue,
    VideoInput,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    mode: {
      default: "view",
    },
  },
  computed: {
    videoId() {
      var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = this.value.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    },

    editable() {
      return ["add", "edit"].includes(this.mode);
    },
  },
  methods: {
    handleChange(video) {
      this.$emit("input", video);
    },
  },
};
</script>