import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About";
import AppointmentWorkflow from "../views/AppointmentWorkflow";
import Calculator from "../views/Calculator";

const routes = [
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/appointmentworkflow",
    name: "AppointmentWorkflow",
    component: AppointmentWorkflow,
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: Calculator,
  },
  {
    path: "/",
    name: "Home",
    component: AppointmentWorkflow,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
