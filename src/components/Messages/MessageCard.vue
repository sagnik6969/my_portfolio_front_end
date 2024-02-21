<template>
  <div class="px-5 py-4 border-b-slate-300 border-b-2">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-medium text-slate-800">
        {{ message.sender_name }}
      </h1>
      <button
        @click="deleteMessage"
        class="text-slate-600 text-lg hover:text-blue-600 hover:scale-125 duration-300 hover:first:inline-block"
      >
        <v-icon
          class="animate-spin"
          v-if="isLoading"
          icon="mdi-loading"
        ></v-icon>
        <v-icon v-else icon="mdi-delete"></v-icon>
      </button>
    </div>
    <div class="flex justify-between items-center">
      <a
        class="text-slate-500 mt-1 hover:text-blue-600 duration-200"
        :href="message.sender_email"
      >
        Email: {{ message.sender_email }}
      </a>
      <p class="text-sm text-slate-500">{{ message.created_at }}</p>
    </div>

    <p class="text-slate-600 mt-3">
      {{ message.message }}
    </p>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const props = defineProps(["message"]);
const emit = defineEmits(["messageDeleted"]);
const isLoading = ref(false);

const deleteMessage = () => {
  isLoading.value = true;
  axios
    .delete(`/api/message/${props.message.id}`)
    .then(() => {
      emit("messageDeleted", props.message.id);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
