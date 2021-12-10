<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="tasktrackerPage"
      @btn-click="$emit('btn-click')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :color="showAddTask ? 'black' : 'green'"
    ></Button>
  </header>
  <AppointmentsFilter
    class="appointment-filter"
    @filterChanged="handleFilterChanged"
    :initWithReminders="false"
    :initWithNoReminders="false"
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
    showAddTask: Boolean,
  },
  components: { Button, AppointmentsFilter },
  computed: {
    tasktrackerPage() {
      return ["/tasktracker", "/"].includes(this.$route.path) ? true : false;
    },
  },
  methods: {
    handleFilterChanged(value) {
      {this.$emit('filterChanged', value)}
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.appointment-filter {
  margin-bottom: 20px;
}
</style>
