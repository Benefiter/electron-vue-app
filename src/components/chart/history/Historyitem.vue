<template>
  <div
    :style="getStyle"
    @dragstart="setDragStart"
    @dragend="setDragEnd"
    @dblclick="removeFromChart"
    :draggable="!isOnChart"
  >
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
    id: String,
    text: String,
    margin: String,
  },
  methods: {
    setDragStart() {
      this.dragging = true;
    },
    setDragEnd() {
      this.dragging = false;
    },
    removeFromChart() {
      this.$store.commit("removeFromChart", this.id);
    },
  },
  computed: {
    getStyle() {
      const style = {
        display: "inline-block",
        margin: this.margin,
        marginTop: this.margin,
        opacity: this.dragging || this.isOnChart ? "0.25" : "inherit",
      };
      return style;
    },
    isDragging() {
      return this.dragging ? "dragging" : "";
    },
    isOnChart() {
      return this.$store.state.droppedItems.includes(this.id.toString());
    },
  },
};
</script>

<style scoped>
.dragging {
  opacity: 0.25;
}
</style>
