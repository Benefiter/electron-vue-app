<template>
  <div class="filter-title">
    <span>
      <label class="label">Filters</label>
      <Checkbox
        :checked="filter.filterEnabled"
        @cbChanged="updateFilterEnabled"
      />
    </span>
  </div>
  <div class="filter-container" v-show="filter.filterEnabled">
    <span>
      <label class="label">Reminders</label>
      <Checkbox
        :checked="this.filter.withReminders"
        @cbChanged="updateFilterReminder"
      />
    </span>
    <span>
      <label class="label">No Reminders</label>
      <Checkbox
        :checked="this.filter.withNoReminders"
        @cbChanged="updateFilterNoReminder"
      />
    </span>
    <div class="filter-padding">
      <DateFilter
        :initDate="this.filter.appointmentDay"
        @date-filter-changed="updateDateChanged"
      />
    </div>
    <div class="buttons-container">
      <button class="button" @click="applyFilters">Apply</button>
      <button class="button" @click="resetFilters">Clear</button>
    </div>
  </div>
</template>

<script>
import DateFilter from "./DateFilter";
import Checkbox from "./Checkbox";
import moment from "moment";

export default {
  name: "AppointmentFilter",
  components: {
    DateFilter,
    Checkbox,
  },
  props: {
    initWithNoReminders: Boolean,
    initWithReminders: Boolean,
    initFilterEnabled: Boolean,
    initAppointmentDay: Date,
  },
  data() {
    return {
      filter: {
        filterEnabled: this.initFilterEnabled,
        withReminders: this.initWithReminders,
        withNoReminders: this.initWithNoReminders,
        appointmentDay: this.initAppointmentDay,
      },
    };
  },
  methods: {
    updateFilterEnabled(value) {
      this.filter.filterEnabled = value;
      this.$emit("filterChanged", this.filter);
    },
    applyFilters() {
      this.$emit("filterChanged", this.filter);
    },
    updateFilterReminder(value) {
      this.filter.withReminders = value;
    },
    updateFilterNoReminder(value) {
      this.filter.withNoReminders = value;
    },
    updateDateChanged(date) {
      this.filter.appointmentDay = moment(date);
    },
    resetFilters() {
      this.$emit("clearFilters");
    },
  },
};
</script>

<style scoped>
.filter-container {
  border: solid #000;
  border-width: 1px 1px;
  padding: 10px 10px;
  text-align: left;
}

.filter-padding {
  margin-top: 10px;
  padding-left: 10px;
}

.filter-title {
  margin-bottom: 5px;
  text-align: left;
}

.label {
  padding-right: 10px;
  padding-left: 10px;
}

.button {
  padding: 5px;
  margin-left: 5px;
  background-color: burlywood;
}

.button:hover {
  outline: 2px solid yellowgreen;
}

.buttons-container {
  margin: 5px;
  text-align: right;
}
</style>
