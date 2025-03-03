import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../pages/Login.vue"),
    meta: {
      guest: true,
    },
  },
  {
    name: "Template",
    path: "/template/:id",
    component: () => import("../pages/CurrentTemplate/CurrentTemplate.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isGuest = to.matched.some((record) => record.meta.guest);
  const hasToken = !!localStorage.getItem("token");
  if (requiresAuth && !hasToken) {
    next({
      path: "/login",
    });
  } else if (isGuest && hasToken) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
