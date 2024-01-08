<template>
  <div class="bg-slate-50 shadow-md sticky top-0 left-0 w-full z-20">
    <div class="container py-4 flex justify-between items-center">
      <h1 class="text-4xl font-semibold text-blue-900">Sagnik Jana</h1>
      <ul
        class="flex items-center space-x-5 text-indigo-950 font-semibold text-lg"
      >
        <li><router-link class="nav-link" to="/home">Home</router-link></li>
        <li>
          <router-link class="nav-link" to="/projects">Projects</router-link>
        </li>
        <li>
          <router-link
            v-if="!$store.getters.isLoggedIn"
            to="/login"
            class="inline-block rounded-3xl bg-slate-300 py-1 px-4 shadow-sm ml-4 hover:scale-105 duration-300"
            >Login</router-link
          >
          <button
            v-else
            class="inline-block rounded-3xl bg-slate-300 py-1 px-4 shadow-sm ml-4 hover:scale-105 duration-300"
          >
            Logout
          </button>
        </li>
        <!-- <li>
          <router-link class="nav-link" to="/contact">Contact</router-link>
        </li>
        <li><router-link class="nav-link" to="/donate">Donate</router-link></li> -->
        <!-- <li><a class="nav-link" href="#">About</a></li>
        <li><a class="nav-link" href="#">Projects</a></li>
        <li><a class="nav-link" href="#">Contact</a></li>
        <li><a class="nav-link" href="#">Donate</a></li> -->
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isLoggedIn = computed(() => store.getters.isLoggedIn);
</script>

<style scoped>
.nav-link {
  display: inline-block;
  text-decoration: none;
}

.nav-link::after {
  content: "";
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 0;
  height: 2px;
  background: rgb(40, 60, 124);
  transition: width 0.3s;
}

.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
  transition: width 0.3s;
}
</style>
