<template>
  <div class="appointments-title">
    <label class="label">Appointments</label>
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
  components: {
    Appointment,
  },
};
</script>

<style scoped>
.appointments {
  overflow: auto;
  height: 320px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-width: 1px 1px;
  box-shadow: 10px 10px 8px #888888;
  padding: 10px 10px;
}

.appointments-title {
  margin-top: 40px;
  padding-left: 10px;
  text-align: left;
  margin-bottom: 5px;
}
</style>
