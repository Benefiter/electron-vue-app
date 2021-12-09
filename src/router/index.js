import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About";
import Tasktracker from "../views/Tasktracker";
import Calculator from "../views/Calculator";

const routes = [
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/tasktracker",
    name: "Tasktracker",
    component: Tasktracker,
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: Calculator,
  },
  {
    path: "/",
    name: "Home",
    component: Tasktracker,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
