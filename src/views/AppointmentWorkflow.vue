<template>
  <div class="container">
    <Header
      @btn-click="toggleAddAppointment"
      title="Appointments"
      :showAddAppointment="showAddAppointment"
      @filterChanged="fetchAppointmentsFiltered"
      @clearFilters="clearFilters"
    />

    <AddAppointment
      v-if="showAddAppointment"
      @add-appointment="addAppointment"
    />
    <Appointments
      @toggle-completed="toggleCompleted"
      @delete-appointment="deleteAppointment"
      :appointments="displayedAppointments"
    />
    <Footer />
  </div>
</template>

<script>
import Appointments from "../components/Appointments";
import AddAppointment from "../components/AddAppointment";
import Header from "../components/Header";
import Footer from "../components/Footer";
import moment from "moment";

// set useLocalAppointments to false and run 'npm run backend' to start json serve appointment data.
const useLocalAppointments = true;

export default {
  name: "Home",
  components: {
    Appointments,
    AddAppointment,
    Header,
    Footer,
  },
  data() {
    return {
      showAddAppointment: false,
      appointments: [],
      displayedAppointments: [],
      filter: {
        completed: null,
        pending: null,
        appointmentDay: null,
      },
      newId: 0,
    };
  },
  methods: {
    addAppointmentToast(appointment) {
      this.$toast.show(`Successfully added appointment ${appointment?.text}.`, {
        type: "success",
        position: "top-right",
        duration: 2000,
      });
    },
    deleteAppointmentToast(message) {
      this.$toast.show(message ?? `Successfully deleted appointment.`, {
        type: "success",
        position: "top-right",
        duration: 2000,
      });
    },
    toggleAddAppointment() {
      this.showAddAppointment = !this.showAddAppointment;
    },
    async addAppointment(appointment) {
      if (useLocalAppointments) {
        this.newId++;
        this.appointments = [
          ...this.appointments,
          { ...appointment, id: this.newId },
        ];
        this.displayedAppointments = [
          ...this.getFilteredAppointments(this.appointments),
        ];
        this.addAppointmentToast(appointment);
        return;
      }

      const res = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(appointment),
      });

      const data = await res.json();

      this.appointments = [...this.appointments, data];
      this.displayedAppointments = [
        ...this.getFilteredAppointments(this.appointments),
      ];
      this.addAppointmentToast(appointment);
    },
    async deleteAppointment(id) {
      if (confirm("Are you sure?")) {
        if (useLocalAppointments) {
          this.appointments = this.appointments.filter((t) => t.id !== id);
          this.displayedAppointments = [
            ...this.getFilteredAppointments(this.appointments),
          ];
          this.deleteAppointmentToast();
          return;
        }

        const res = await fetch(`http://localhost:5000/appointments/${id}`, {
          method: "DELETE",
        });

        res.status === 200
          ? (this.appointments = this.appointments.filter(
              (appointment) => appointment.id !== id
            ))
          : this.deleteAppointmentToast(
              `Server Error deleting appointment ${res.status}`
            );

        this.displayedAppointments = [
          ...this.getFilteredAppointments(this.appointments),
        ];
        this.deleteAppointmentToast();
      }
    },
    async toggleCompleted(id) {
      if (useLocalAppointments) {
        this.appointments = this.appointments.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
        this.displayedAppointments = [
          ...this.getFilteredAppointments(this.appointments),
        ];
        return;
      }

      const appointmentToToggle = await this.fetchAppointment(id);
      const updAppointment = {
        ...appointmentToToggle,
        completed: !appointmentToToggle.completed,
      };

      const res = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updAppointment),
      });

      const data = await res.json();

      this.appointments = this.appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, completed: data.completed }
          : appointment
      );
      this.displayedAppointments = [
        ...this.getFilteredAppointments(this.appointments),
      ];
    },
    clearFilters() {
      this.displayedAppointments = [...this.appointments];
    },
    async fetchAppointments() {
      if (useLocalAppointments) return this.appointments;

      const res = await fetch("http://localhost:5000/appointments");

      const data = await res.json();

      return data;
    },
    async fetchAppointment(id) {
      if (useLocalAppointments)
        return this.appointments.find((t) => t.id === id);

      const res = await fetch(`http://localhost:5000/appointments/${id}`);

      const data = await res.json();

      return data;
    },
    getFilteredAppointments(appointments) {
      if (!this.filter.filterEnabled) return [...this.appointments];

      if (this.filter.completed && this.filter.pending)
        return this.filter.appointmentDay
          ? appointments.filter((t) => this.inDateRange(t))
          : [...this.appointments];

      if (this.filter.completed) {
        return appointments.filter((t) => {
          return this.filter.appointmentDay
            ? t.completed && this.inDateRange(t)
            : t.completed;
        });
      }

      if (this.filter.pending) {
        return appointments.filter((t) => {
          return this.filter.appointmentDay
            ? !t.completed && this.inDateRange(t)
            : !t.completed;
        });
      }

      return [];
    },
    async fetchAppointmentsFiltered(filter) {
      this.filter = filter;

      if (useLocalAppointments) {
        this.displayedAppointments = this.getFilteredAppointments(
          this.appointments
        );
        return;
      }

      const res = await fetch(`http://localhost:5000/appointments`);

      const data = await res.json();

      this.displayedAppointments = this.getFilteredAppointments(data);
    },
    inDateRange(item) {
      return moment(item.timestamp) < this.filter.appointmentDay;
    },
  },
  async created() {
    if (useLocalAppointments) {
      this.appointments = [
        {
          id: "1",
          text: "Doctors Appointment",
          day: "Wed Dec 1 2021 07:59 pm",
          timestamp: "2021-12-02T02:59:00.000Z",
          completed: true,
        },
        {
          id: "2",
          text: "Meeting with boss",
          day: "Thu Dec 2 2021 07:59 pm",
          timestamp: "2021-12-03T02:59:00.000Z",
          completed: false,
        },
        {
          id: "3",
          text: "Food shopping",
          day: "Fri Dec 3 2021 08:00 pm",
          timestamp: "2021-12-04T03:00:00.000Z",
          completed: false,
        },
      ];
      this.displayedAppointments = [...this.appointments];
    } else {
      this.appointments = await this.fetchAppointments();
      this.displayedAppointments = [...this.appointments];
    }
  },
};
</script>

<style>
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 30px;
  border-radius: 5px;
  background-color: rgb(123, 177, 177);
}
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
