import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Projects from "./components/projects/Projects.vue";
import CreateProject from "./components/projects/CreateProject.vue";
import Login from "./components/auth/Login.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/projects", component: Projects },
    { path: "/projects/create", component: CreateProject },
    { path: "/login", component: Login },
  ],
});

export default router;
