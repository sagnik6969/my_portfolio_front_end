<script setup>
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
</script>

<template>
  <Header />
  <!-- <Home /> -->
  <router-view></router-view>
</template>

<style>
.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

body {
  background-color: #fae7f3;
}
</style>
