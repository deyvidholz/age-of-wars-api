import axios from "axios";
import Vue from "vue";
import store from "../store/index";
import config from "../config/environment";

export const http = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Country-ID": `${localStorage.getItem("countryId")}`,
    "Game-ID": `${localStorage.getItem("gameId")}`,
    "Player-ID": `${localStorage.getItem("playerId")}`,
  },
});

http.interceptors.request.use((config) => {
  config.headers["Country-ID"] = localStorage.getItem("countryId");
  config.headers["Game-ID"] = localStorage.getItem("gameId");
  config.headers["Player-ID"] = localStorage.getItem("playerId");

  if (!store.state.isRequestingProvince) {
    store.state.isRequesting = true;
  }

  return config;
});

http.interceptors.response.use((config) => {
  store.state.isRequesting = false;
  return config;
});

Vue.prototype.http = http;
