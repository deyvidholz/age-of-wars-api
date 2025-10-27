import Vue from "vue";
import VueRouter from "vue-router";
import Game from "../views/Game.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import MainMenu from "../views/MainMenu.vue";

Vue.use(VueRouter);

const redirectUnauthenticated = (to, from, next) => {
  if (!localStorage.getItem("token")) {
    return next({ name: "SignIn" });
  }

  next();
};

const routes = [
  {
    path: "/",
    name: "Game",
    component: Game,
    beforeEnter: redirectUnauthenticated,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/main-menu",
    name: "MainMenu",
    component: MainMenu,
    beforeEnter: redirectUnauthenticated,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
