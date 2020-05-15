import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
import { authGuard } from "@bcwdev/auth0-vue";
// @ts-ignore
import CreateBook from "../Pages/CreateBook.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: "/books",
    name: "CreateBook",
    component: CreateBook,
    // beforeEnter: authGuard,
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  routes,
});

export default router;
