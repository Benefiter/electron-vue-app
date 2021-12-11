<template>
  <div class="appointments-title">
    <label class="label">Appointments</label>
    <div class="legend-style">
      <label class="legend label">Legend:</label>
      <label class="label label-completed">Completed</label>
      <div class="appointment-completed" />
      <label class="label label-pending">Pending</label>
      <div class="appointment-pending" />
    </div>
  </div>
  <div class="appointments">
    <div :key="appointment.id" v-for="appointment in appointments">
      <Appointment
        @toggle-completed="$emit('toggle-completed', appointment.id)"
        @delete-appointment="$emit('delete-appointment', appointment.id)"
        :appointment="appointment"
      />
    </div>
  </div>
</template>

<script>
import Appointment from "./Appointment";
export default {
  name: "Appointments",
  props: {
    appointments: Array,
  },
  emits: ["toggle-completed", "delete-appointment"],
  components: {
    Appointment,
  },
};
</script>

<style scoped>
.appointments {
  overflow: auto;
  height: 310px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-width: 1px 1px;
  box-shadow: 10px 10px 8px #888888;
  padding: 10px 10px;
}

.appointments-title {
  margin-top: 40px;
  padding-left: 10px;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.appointment-completed {
  padding: 4px;
  border: 2px solid yellowgreen;
  background: yellowgreen;
  border-width: 2px 2px;
}

.appointment-pending {
  padding: 4px;
  border: 2px solid red;
  background: red;
  border-width: 2px 2px;
  margin-right: 10px;
}

.legend {
  padding-left: 10px;
  padding-right: 10px;
  margin: 2px;
}

.label-completed {
  padding-left: 10px;
  padding-right: 5px;
}

.label-pending {
  padding-left: 10px;
  padding-right: 5px;
}

.legend-style {
  display: flex;
  margin-left: auto;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-width: 1px 1px;
  align-items: center;
}
</style>
