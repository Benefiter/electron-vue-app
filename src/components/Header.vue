<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      class="button"
      v-show="appointmentworkflowPage"
      @btn-click="$emit('btn-click')"
      :text="showAddAppointment ? 'Close' : 'Add Appointment'"
      :color="showAddAppointment ? 'black' : 'green'"
    ></Button>
  </header>
  <AppointmentsFilter
    @filterChanged="handleFilterChanged"
    :initCompleted="false"
    :initPending="false"
    :initFilterEnabled="true"
    :initAppointmentDay="null"
    @clearFilters="$emit('clearFilters')"
  />
</template>
<script>
import Button from "./Button";
import AppointmentsFilter from "../components/Filters/Appointments/AppointmentsFilter";

export default {
  name: "Header",
  props: {
    title: String,
    showAddAppointment: Boolean,
  },
  emits: ["filterChanged", "clearFilters", "btn-click"],
  components: { Button, AppointmentsFilter },
  computed: {
    appointmentworkflowPage() {
      return ["/appointmentworkflow", "/"].includes(this.$route.path)
        ? true
        : false;
    },
  },
  methods: {
    handleFilterChanged(value) {
      {
        this.$emit("filterChanged", value);
      }
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

.button:hover {
  outline: 2px solid yellowgreen;
}
</style>
