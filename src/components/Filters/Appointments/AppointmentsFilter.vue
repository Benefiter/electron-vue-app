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
      <label class="label">With Reminders</label>
      <Checkbox
        :checked="filter.withReminders"
        @cbChanged="updateFilterReminder"
      />
    </span>
    <div class="filter-padding">
      <DateFilter @date-filter-changed="updateDateChanged" />
    </div>
    <div class="buttons-container">
      <button class="button" @click="applyFilters">Apply</button>
      <button class="button" @click="$emit('clearFilters')">Clear</button>
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
    initWithReminders: Boolean,
    initFilterEnabled: Boolean
  },
  data() {
    return {
      filter: {
        filterEnabled: this.initFilterEnabled,
        withReminders: this.initWithReminders,
        appointmentDay: null,
      },
    };
  },
  methods: {
    updateFilterEnabled(value){
      this.filter.filterEnabled = value
      this.$emit("filterChanged", this.filter)
    },
    applyFilters() {
      console.log("applyFilters");
      console.log(this.withReminders);
      console.log(this.appointmentDay);
      this.$emit("filterChanged", this.filter);
    },
    updateFilterReminder(value) {
      this.filter.withReminders = value;
    },
    updateDateChanged(date) {
      console.log("updateDateChanged called");
      console.log(date);
      this.filter.appointmentDay = moment(date);
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
}

.filter-title {
  margin-bottom: 5px;
  text-align: left;
}

.label {
  padding-right: 10px;
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
