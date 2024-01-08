import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      token: null,
    };
  },

  getters: {
    isLoggedIn(state) {
      return state.token !== null;
    },
    token(state) {
      return state.token;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    tryLogIn(context) {
      const token = localStorage.getItem("token");
      if (token) context.commit("setToken", token);
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
            console.log(res.data);
            context.commit("setToken", res.data.token);
            localStorage.setItem("token", res.data.token);
            resolve("logged in successfully!");
          })
          .catch((err) => {
            console.log(err);
            reject(err.response.data.message);
          });
      });
    },
  },
});

export default store;
