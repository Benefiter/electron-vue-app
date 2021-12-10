<template>
  <div class="container">
    <Header
      @btn-click="toggleAddTask"
      title="Appointments"
      :showAddTask="showAddTask"
      @filterChanged="fetchTasksFiltered"
      @clearFilters="clearFilters"
    />

    <AddTask v-show="showAddTask" @add-task="addTask" />
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="displayedTasks"
    />
    <Footer />
  </div>
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";
import Header from "../components/Header";
import Footer from "../components/Footer";
import moment from "moment";

// set useLocalTasks to false and run 'npm run backend' to start json serve task data.
const useLocalTasks = true;

export default {
  name: "Home",
  components: {
    Tasks,
    AddTask,
    Header,
    Footer,
  },
  data() {
    return {
      showAddTask: Boolean,
      tasks: [],
      displayedTasks: [],
      filter: {
        withReminders: null,
        appointmentDay: null,
      },
      newId: 0,
    };
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    async addTask(task) {
      if (useLocalTasks) {
        this.newId++;
        this.tasks = [...this.tasks, { ...task, id: this.newId }];
        // this.displayedTasks = [...this.getFilteredTasks(this.tasks)];
        this.displayedTasks = [...this.tasks]
        console.log('addTask');
        console.log(this.tasks)
        return;
      }

      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      this.tasks = [...this.tasks, data];
      // this.displayedTasks = [...this.getFilteredTasks(this.tasks)];
      this.displayedTasks = [...this.tasks]
    },
    async deleteTask(id) {
      if (confirm("Are you sure?")) {
        if (useLocalTasks) {
          console.log("deleteTask");
          console.log(id);
          this.tasks = this.tasks.filter((t) => t.id !== id);
          this.displayedTasks = [...this.tasks];
          return;
        }

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        });

        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Error deleting task");

        this.displayedTasks = [...this.tasks];
      }
    },
    async toggleReminder(id) {
      if (useLocalTasks) {
        this.tasks = this.tasks.map((t) =>
          t.id === id ? { ...t, reminder: !t.reminder } : t
        );
        this.displayedTasks = [...this.tasks];
        return;
      }

      const taskToToggle = await this.fetchTask(id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });

      const data = await res.json();

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      );
      this.displayedTasks = [...this.tasks];
    },
    clearFilters() {
      this.displayedTasks = [...this.tasks]
    },
    async fetchTasks() {
      if (useLocalTasks) return this.tasks;

      const res = await fetch("http://localhost:5000/tasks");

      const data = await res.json();

      return data;
    },
    async fetchTask(id) {
      if (useLocalTasks) return this.tasks.find((t) => t.id === id);

      const res = await fetch(`http://localhost:5000/tasks/${id}`);

      const data = await res.json();

      return data;
    },
    getFilteredTasks(tasks) {
      if (!this.filter.filterEnabled) return [...this.tasks]
      
      return tasks.filter((t) => {
        return this.filter.appointmentDay
          ? t.reminder === this.filter.withReminders && this.inDateRange(t)
          : t.reminder == this.filter.withReminders;
      });
    },
    async fetchTasksFiltered(filter) {
      this.filter = filter;

      console.log("filter");
      console.log(this.filter);
      if (useLocalTasks) {
        this.displayedTasks = this.getFilteredTasks(this.tasks);
        return;
      }

      const res = await fetch(`http://localhost:5000/tasks`);

      console.log("fetchTasksFitered");
      console.log(filter);

      const data = await res.json();

      console.log("data");
      console.log(data);

      this.displayedTasks = this.getFilteredTasks(data)
    },
    inDateRange(item) {
      console.log(`inDateRange ${this.filter} ${item}`);

      return moment(item.timestamp) < this.filter.appointmentDay;
    },
  },
  async created() {
    if (useLocalTasks) {
      this.tasks = [
        {
          id: "1",
          text: "Doctors Appointment",
          day: "Wed Dec 1 2021 07:59 pm",
          timestamp: "2021-12-02T02:59:00.000Z",
          reminder: true,
        },
        {
          id: "2",
          text: "Meeting with boss",
          day: "Thu Dec 2 2021 07:59 pm",
          timestamp: "2021-12-03T02:59:00.000Z",
          reminder: false,
        },
        {
          id: "3",
          text: "Food shopping",
          day: "Fri Dec 3 2021 08:00 pm",
          timestamp: "2021-12-04T03:00:00.000Z",
          reminder: false,
        },
      ];
      this.displayedTasks = [...this.tasks];
    } else {
      this.tasks = await this.fetchTasks();
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
  border: 1px solid steelblue;
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
