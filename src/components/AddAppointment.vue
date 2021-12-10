<template>
  <div class="appointment-title">
    <label class="label">Add Appointment</label>
  </div>
  <div class="form-container">
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label>Appointment</label>
        <input
          type="text"
          v-model="text"
          name="text"
          placeholder="Add Appointment"
        />
      </div>
      <div class="form-control">
        <label>Day & Time</label>
        <input
          type="datetime-local"
          v-model="day"
          name="day"
          placeholder="Add Day & Time"
        />
      </div>
      <!-- <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div> -->

      <input type="submit" value="Save Appointment" class="btn" />
    </form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "AddAppointment",
  data() {
    return {
      text: "",
      day: "",
      completed: false,
    };
  },
  methods: {
    formatDate(date) {
      if (date == null) return null;

      return date.today() + date.timenow();
    },
    onSubmit(e) {
      e.preventDefault();

      if (!this.text) {
        alert("Please add an Appointment");
        return;
      }

      const newAppointment = {
        // id: Math.floor(Math.random() * 100000),
        text: this.text,
        day: moment(this.day).format(`ddd MMM D Y hh:mm a`),
        timestamp: moment(this.day),
        completed: this.completed,
      };

      this.$emit("add-appointment", newAppointment);

      this.text = "";
      this.day = "";
      this.completed = false;
    },
  },
};
</script>

<style scoped>
.appointment-title {
  padding-left: 10px;
  margin-top: 40px;
  text-align: left;
  margin-bottom: 5px;
}

.form-container {
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-width: 1px 1px;
  box-shadow: 10px 10px 8px #888888;
}

.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}

.btn:hover {
  outline: 2px solid yellowgreen;
}
</style>
