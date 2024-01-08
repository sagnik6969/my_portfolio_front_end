<template>
  <Header />
  <router-view></router-view>
</template>

<script setup>
import Header from "./components/Header.vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore();

onBeforeMount(() => {
  store.dispatch("tryLogIn");
  // console.log(store.getters.isLoggedIn);
});
</script>
<style>
.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

body {
  background-color: #fae7f3;
}
</style>
