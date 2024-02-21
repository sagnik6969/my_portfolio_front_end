<template>
  <div class="px-5 py-4 border-b-slate-300 border-b-2">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-medium text-slate-800">
        {{ message.sender_name }}
      </h1>
      <button
        class="text-slate-600 text-lg hover:text-blue-600 hover:scale-125 duration-300 hover:first:inline-block"
      >
        <!-- <v-icon
                  class="animate-spin"
                  v-if="loading"
                  icon="mdi-loading"
                ></v-icon> -->
        <v-icon icon="mdi-delete"></v-icon>
      </button>
    </div>
    <div class="flex justify-between items-center">
      <a
        class="text-slate-500 mt-1 hover:text-blue-600 duration-200"
        href="mailto:sagnikjana2001@gmail.com"
      >
        Email: sagnikjana2001@gmail.com
      </a>
      <p class="text-sm text-slate-500">3 hours ago</p>
    </div>

    <p class="text-slate-600 mt-3">
      {{ message.message }}
    </p>
  </div>
</template>

<script setup>
defineProps(["message"]);
</script>
