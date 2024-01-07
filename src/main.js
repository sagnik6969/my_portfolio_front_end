import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
// Vuetify
// import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
});

import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/home", component: Home }],
});

createApp(App).use(vuetify).use(router).mount("#app");
