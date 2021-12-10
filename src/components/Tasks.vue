<template>
  <div class="tasks">
    <div :key="task.id" v-for="task in tasks">
      <Task
        @toggle-reminder="$emit('toggle-reminder', task.id)"
        @delete-task="$emit('delete-task', task.id)"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "Tasks",
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
};
</script>

<style scoped>
.tasks {
  overflow: auto;
  height: 400px;
  border: 1px solid black;
  border-width: 1px 1px;
  margin-top: 40px;
}
</style>
