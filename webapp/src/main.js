import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

/* Socket.io Extended */
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";

const socket = io("wss://aow.valkeon.com/api", {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  },
});

socket.on("connect", () => {
  console.log("WebSocket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.error("WebSocket disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("WebSocket connection error:", error);
});

Vue.use(VueSocketIOExt, socket, { store });

import "./helpers/helpers";
import "./plugins/axios";
import "./assets/css/style.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
