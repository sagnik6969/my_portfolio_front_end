<template>
  <!-- <div
    v-if="isLoading"
    class="flex justify-center items-center text-slate-700 w-full h-screen"
  >
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </div> -->
  <!-- <template> -->
  <Header />
  <router-view></router-view>
  <!-- </template> -->
</template>

<script setup>
import Header from "./components/Header.vue";
// import { onBeforeMount, onMounted, ref } from "vue";
// import { useStore } from "vuex";

// const store = useStore();

// const isLoading = ref(true);

// onMounted(() => {
//   store.dispatch("tryLogIn").then(() => {
//     isLoading.value = false;
//   });
//   // console.log(store.getters.isLoggedIn);
// });
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
