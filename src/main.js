import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
// Vuetify
// import "vuetify/styles";
// import { createVuetify } from "vuetify";
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import store from "./store/index.js";

import router from "./router";
import vuetify from "./vuetify";

createApp(App).use(store).use(vuetify).use(router).use(Toast).mount("#app");
