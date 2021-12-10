<template>
  <span class="date-title">Date: </span>
  <input
    @input="dateChanged"
    class="date-style"
    type="datetime-local"
    v-model="date"
    name="date"
    placeholder="Add Day & Time"
  />
</template>

<script>
export default {
  name: "DateFilter",
  data() {
    return {
      date: null,
    };
  },
  methods: {
    dateChanged(event) {
      console.log("dateChanged");
      console.log(this.date);
      this.date = event.target.value;
      this.$emit("date-filter-changed", this.date);
    },
  },
};
</script>

<style scoped>
.header {
  display: grid;
  justify-content: right;
  align-content: right;
  grid-template-columns: 1fr 2fr 2fr;
  grid-gap: 10px;
}

.date-style {
  background: none;
}

.date-style:hover {
  border-color: yellowgreen;
}

.date-title {
  padding-right: 10px;
}
</style>
