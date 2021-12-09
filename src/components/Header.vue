<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="tasktrackerPage"
      @btn-click="$emit('btn-click')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :color="showAddTask ? 'red' : 'green'"
    ></Button>
  </header>
</template>
<script>
import Button from "./Button";

export default {
  name: "Header",
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: { Button },
  computed: {
    tasktrackerPage() {
      return this.$route.path === "/tasktracker" ? true : false;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
