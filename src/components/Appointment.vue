<template>
  <div
    @dblclick="$emit('toggle-completed', appointment.id)"
    :class="[appointment.completed ? 'completed' : '', 'pending']"
  >
    <h3>
      {{ appointment.text }}
      <div id="delete" @click="$emit('delete-appointment', appointment.id)">
        <i class="fas fa-times"></i>
      </div>
    </h3>
    <div class="appointment-day">{{ appointment.day }}</div>
  </div>
</template>

<script>
export default {
  name: "Appointment",
  props: {
    appointment: Object,
  },
};
</script>

<style scope>
.appointment-day {
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 700;
}

.fas {
  color: red;
}
.pending {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  outline: 2px solid red;
  margin-top: 10px;
  margin-bottom: 10px;
  user-select: none;
}

.completed {
  outline: 2px solid yellowgreen;
  margin-top: 10px;
  margin-bottom: 10px;
  user-select: none;
}
.pending h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
