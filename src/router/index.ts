import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Login",
    path: "/login",
    component: ()=>import('../pages/Login.vue')
  },
  {
    name: "Template",
    path: "/template/:id",
    component: ()=>import('../pages/CurrentTemplate.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
