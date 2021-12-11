<template>
  <div :style="getStyle">
    <Icon :title="text" class="left" icon="history" color="black"></Icon>
  </div>
</template>

<script>
import Icon from "../../icon";

export default {
  name: "Chart",
  components: {
    Icon,
  },
  data() {
    return {
      dragging: false,
    };
  },
  props: {
    text: String,
    margin: String,
  },
  computed: {
    getStyle() {
      return {
        display: "inline-block",
        margin: this.margin,
        marginTop: this.margin,
        opacity: this.dragging ? "0.25" : "inherit",
      };
    },
    isDragging() {
      return this.dragging ? "dragging" : "";
    },
  },
};
</script>

<style scoped>
.dragging {
  opacity: 0.25;
}
</style>
