<template>
  <div class="filter-title">
    <span>
      <label class="label">{{
        filter.filterEnabled ? "Filters (Enabled)" : "Filters (Disabled)"
      }}</label>
      <Checkbox
        :checked="filter.filterEnabled"
        @cbChanged="updateFilterEnabled"
      />
    </span>
  </div>
  <div class="filter-container" v-show="filter.filterEnabled">
    <span>
      <label class="label completed-outline">Completed</label>
      <Checkbox
        class="cb-padding"
        :checked="this.filter.completed"
        @cbChanged="updateFilterCompleted"
      />
    </span>
    <span>
      <label class="label pending-outline">Pending</label>
      <Checkbox
        class="cb-padding"
        :checked="this.filter.pending"
        @cbChanged="updateFilterPending"
      />
    </span>
    <div class="flex">
      <div class="filter-padding">
        <DateFilter
          :initDate="this.filter.appointmentDay"
          @date-filter-changed="updateDateChanged"
        />
      </div>
      <div class="buttons-container">
        <button class="button" @click="applyFilters">Apply</button>
        <!-- <button class="button" @click="resetFilters">Clear</button> -->
      </div>
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
    initPending: Boolean,
    initCompleted: Boolean,
    initFilterEnabled: Boolean,
    initAppointmentDay: Date,
  },
  emits: ["filterChanged", "clearFilters"],
  data() {
    return {
      filter: {
        filterEnabled: this.initFilterEnabled,
        completed: this.initCompleted,
        pending: this.initPending,
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
    updateFilterCompleted(value) {
      this.filter.completed = value;
    },
    updateFilterPending(value) {
      this.filter.pending = value;
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
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-width: 1px 1px;
  padding: 20px 20px;
  text-align: left;
  box-shadow: 10px 10px 8px #888888;
}

.filter-padding {
  margin-top: 20px;
}

.filter-title {
  margin-bottom: 5px;
  text-align: left;
}

.label {
  padding-right: 10px;
  padding-left: 10px;
}

.cb-padding {
  padding-left: 5px;
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
  margin-top: 20px;
}

.completed-outline {
  border: 1px solid yellowgreen;
  border-width: 2px;
}

.pending-outline {
  border: 1px solid red;
  border-width: 2px;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
