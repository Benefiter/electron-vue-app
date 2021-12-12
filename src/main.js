import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@fortawesome/fontawesome-free/js/all";
import Toaster from "@meforma/vue-toaster";

createApp(App)
  .use(store)
  .use(router)
  .use(Toaster, {
    position: "top-right",
    dismissable: true,
    duration: 5000,
  })
  .mount("#app");
