<template>
  <button class="button-icon" :title="text">
    <i :class="getIcon" :style="{ color: color }" />
  </button>
</template>

<script>
export default {
  name: "Icon",
  props: {
    text: String,
    color: String,
    icon: String,
  },
  computed: {
    getIcon() {
      switch (this.icon) {
        case "times":
          return "fas fa-times";

        case "divide":
          return "fas fa-divide";

        case "plus":
          return "fas fa-plus";

        case "minus":
          return "fas fa-minus";

        case "equals":
          return "fas fa-equals";

        case "collapse":
          return "fas fa-window-minimize";

        case "expand":
          return "fas fa-window-restore";

        case "clear":
          return "fas fa-eraser";

        case "save":
          return "fas fa-save";

        case "menu":
          return "fas fa-bars";

        case "leftarrow":
          return "fas fa-arrow-left";

        case "rightarrow":
          return "fas fa-arrow-right";

        case "history":
          return "fas fa-history";
      }
      return "fa faTimes";
    },
  },
};
</script>
<style scoped>
.button-icon {
  padding: 3px 5px;
  background-color: rgb(179, 236, 247);
  opacity: 80%;
  border-radius: 5px;
}

.button-icon:hover {
  opacity: 100%;
  cursor: pointer;
}
</style>
