<template>
  <div class="container">
    <Header
      @btn-click="toggleAddTask"
      title="Task Tracker"
      :showAddTask="showAddTask"
    />

    <AddTask v-show="showAddTask" @add-task="addTask" />
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="tasks"
    />
    <Footer />
  </div>
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    };
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    async addTask(task) {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      this.tasks = [...this.tasks, data];
    },
    async deleteTask(id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        });

        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Error deleting task");
      }
    },
    async toggleReminder(id) {
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
    },
    async fetchTasks() {
      const res = await fetch("http://localhost:5000/tasks");

      const data = await res.json();

      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);

      const data = await res.json();

      return data;
    },
  },
  async created() {
    if (useLocalTasks) {
      this.tasks = [
        {
          id: "1",
          text: "Doctors Appointment",
          day: "March 5th at 2:30pm",
          reminder: true,
        },
        {
          id: "2",
          text: "Meeting with boss",
          day: "March 6th at 1:30pm",
          reminder: false,
        },
        {
          id: "3",
          text: "Food shopping",
          day: "March 7th at 2:00pm",
          reminder: false,
        },
      ];
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

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
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
