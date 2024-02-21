import { createStore } from "vuex";
import axios from "axios";
// import router from "../router";

const store = createStore({
  state() {
    return {
      user: null,
    };
  },

  getters: {
    isLoggedIn(state) {
      return state.user !== null;
    },
    // getToken(state) {
    //   return state.token;
    // },
    // getExpirationTime(state) {
    //   return state.expirationTime;
    // },
  },
  mutations: {
    // setToken(state, token) {
    //   state.token = token;
    // },
    // setExpirationTime(state, expirationTime) {
    //   state.expirationTime = expirationTime;
    // },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    tryLogIn(context) {
      return new Promise((resolve) => {
        axios
          .get("/api/user")
          .then((res) => {
            context.commit("setUser", res.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            resolve();
          });
      });
    },

    login(context, payload) {
      return new Promise((resolve, reject) => {
        const email = payload.email;
        const password = payload.password;

        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;

        axios
          .post("/api/login", {
            email: email,
            password: password,
          })
          .then((res) => {
            context.commit("setUser", res.data.user);
            resolve("logged in successfully!");
            // console.log(res.data);
            // context.commit("setToken", res.data.token);
            // context.commit("setExpirationTime", res.data.expiration_time);

            // localStorage.setItem("token", res.data.token);
            // localStorage.setItem("expiration_time", res.data.expiration_time);

            // const remainingTime =
            //   new Date(res.data.expiration_time).getTime() -
            //   new Date().getTime() -
            //   1000;

            // console.log(
            //   new Date(res.data.expiration_time).getTime(),
            //   new Date().getTime()
            // );

            // console.log(remainingTime);

            // setTimeout(() => {
            //   context.dispatch("logout");
            //   router.push("/login");
            // }, remainingTime);
          })
          .catch((err) => {
            // console.log(err);
            reject(err.response.data.message);
          });
      });
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/logout")
          .then(() => {
            context.commit("setUser", null);
            resolve("Logged out successfully");
          })
          .catch((err) => {
            console.log(err);
            reject("Unable to logout");
          });
      });
    },
  },
});

export default store;
