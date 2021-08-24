import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import About from "../views/About.vue";
import CV from "../views/CV.vue";
import Blog from "../views/Blog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cv",
    name: "CV",
    component: CV,
  },
  {
    path: "/about",
    name: "About",
    //component: About,
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
