import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Studies from "../views/Studies";
//import Dev from ""
import Blog from "../views/Blog.vue";
import CV from "../views/CV.vue";
//import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/studies",
    name: "Studies",
    component: Studies,
  },
  {
    path: "/dev",
    name: "Dev",
    //component: Blog,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
