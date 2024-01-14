import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Projects from "./components/projects/Projects.vue";
import CreateProject from "./components/projects/CreateProject.vue";
import Login from "./components/auth/Login.vue";
import Connect from "./components/Connect/COnnect.vue";

import store from "./store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/projects", component: Projects },
    {
      path: "/projects/create",
      meta: { requireLogin: true },
      component: CreateProject,
    },
    { path: "/login", component: Login },
    { path: "/connect", component: Connect },
  ],
});

router.beforeEach((to) => {
  if (to.meta.requireLogin) {
    if (!store.getters.isLoggedIn) return `/login?redirect=${to.fullPath}`;
  }
});

export default router;
