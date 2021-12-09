<template>
  <div
    @dblclick="$emit('toggle-reminder', task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <h3>
      {{ task.text }}
      <div @click="$emit('delete-task', task.id)">
        <i class="fas fa-times"></i>
      </div>
    </h3>
    <div class="task-day">{{ task.day }}</div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
};
</script>

<style scope>
.task-day {
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 700;
}

.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
