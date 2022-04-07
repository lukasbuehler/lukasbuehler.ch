import Vue from "vue";
import VueRouter from "vue-router";
import UnderConstruction from "../views/UnderConstruction.vue";
//import Home from "../views/Home.vue";
//import About from "../views/About.vue";
//import CV from "../views/CV.vue";
//import Blog from "../views/Blog.vue";

Vue.use(VueRouter);

const routes = [
  /*
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  */
  {
    path: "/",
    name: "Under construction",
    component: UnderConstruction,
  },
  /*
  {
    path: "/cv",
    name: "CV",
    component: CV,
  },
  {
    path: "/about",
    name: "About",
    //component: About,
    component: () => import( "../views/About.vue"), // webpackChunkName: "about" 
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  */
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
