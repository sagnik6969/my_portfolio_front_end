<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <router-view></router-view>
</template>

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
