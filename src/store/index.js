import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

const store = createStore({
  state() {
    return {
      token: null,
      expirationTime: null,
    };
  },

  getters: {
    isLoggedIn(state) {
      return state.token !== null;
    },
    getToken(state) {
      return state.token;
    },
    getExpirationTime(state) {
      return state.expirationTime;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setExpirationTime(state, expirationTime) {
      state.expirationTime = expirationTime;
    },
  },
  actions: {
    tryLogIn(context) {
      const token = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("expiration_time");

      if (!token || !expirationTime || new Date(expirationTime) < new Date()) {
        localStorage.clear();
        return;
      }

      context.commit("setToken", token);
      context.commit("setExpirationTime", expirationTime);
    },

    login(context, payload) {
      return new Promise((resolve, reject) => {
        const email = payload.email;
        const password = payload.password;

        axios
          .post("/api/login", {
            email: email,
            password: password,
          })
          .then((res) => {
            // console.log(res.data);
            context.commit("setToken", res.data.token);
            context.commit("setExpirationTime", res.data.expiration_time);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("expiration_time", res.data.expiration_time);

            const remainingTime =
              new Date(res.data.expiration_time).getTime() -
              new Date().getTime() -
              1000;

            // console.log(
            //   new Date(res.data.expiration_time).getTime(),
            //   new Date().getTime()
            // );

            // console.log(remainingTime);

            setTimeout(() => {
              context.dispatch("logout");
              router.push("/login");
            }, remainingTime);

            resolve("logged in successfully!");
          })
          .catch((err) => {
            // console.log(err);
            reject(err.response.data.message);
          });
      });
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        const token = context.getters.getToken;

        if (!token) reject("You are not logged in");

        axios
          .post(
            "/api/logout",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(() => {
            localStorage.clear();
            context.commit("setToken", null);
            context.commit("setExpirationTime", null);
            resolve("Logged out successfully");
          })
          .catch((err) => {
            console.log(err);
            localStorage.clear();
            context.commit("setToken", null);
            context.commit("setExpirationTime", null);
            resolve("Logged out successfully");
          });
      });
    },
  },
});

export default store;
