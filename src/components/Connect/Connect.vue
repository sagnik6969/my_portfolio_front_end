<template>
  <div class="container">
    <div class="mt-28 mb-5 max-w-3xl">
      <h1 class="text-4xl mb-2 font-semibold text-slate-800">
        Connect with me
      </h1>
      <h1 class="text-xl text-slate-600 max-w-2xl">
        If you want to know more about me or my work, or if you would just like
        to say hello, send me a message. I'd love to hear from you.
      </h1>
    </div>
    <div class="flex flex-col-reverse md:flex-row md:space-x-28 text-gray-600">
      <form @submit.prevent="handleSubmit" class="flex-1">
        <div class="mb-5">
          <label>
            <h1 class="font-semibold mb-1">Email</h1>
            <input
              v-model="email"
              class="rounded-lg border-2 border-slate-400 duration-300 w-full"
              type="text"
              placeholder="Type your email . . . ."
            />
          </label>
          <div class="text-red-600" v-if="errors.sender_email">
            {{ errors.sender_email[0] }}
          </div>
        </div>

        <div class="mb-5">
          <label>
            <h1 class="font-semibold mb-1">Name</h1>
            <input
              v-model="name"
              class="rounded-lg border-2 border-slate-400 duration-300 w-full"
              type="text"
              placeholder="Type your name . . . ."
            />
          </label>
          <div class="text-red-600" v-if="errors.sender_name">
            {{ errors.sender_name[0] }}
          </div>
        </div>

        <div class="mb-5">
          <label>
            <h1 class="font-semibold mb-1">Message</h1>
            <textarea
              v-model="message"
              class="rounded-lg border-2 border-slate-400 duration-300 w-full h-36"
              placeholder="Type your message . . . ."
            ></textarea>
          </label>
          <div class="text-red-600" v-if="errors.message">
            {{ errors.message[0] }}
          </div>
        </div>

        <div class="mb-5">
          <button
            class="flex items-center space-x-1 rounded-md py-2 px-3 bg-slate-700 text-white hover:scale-110 duration-300"
          >
            <span> Send </span>
            <v-icon
              v-if="loading"
              class="animate-spin"
              icon="mdi-loading"
            ></v-icon>
            <v-icon v-else icon="mdi-send"></v-icon>
          </button>
        </div>
      </form>
      <div class="flex-1 mb-5 md:mb-0">
        <ul class="space-y-2">
          <li
            class="space-x-1 flex items-center hover:text-blue-600 duration-300"
          >
            <v-icon icon="mdi-email"></v-icon>
            <a href="mailto:sagnikjana2001@gmail.com"
              >sagnikjana2001@gmail.com</a
            >
          </li>
          <li
            class="space-x-1 flex items-center hover:text-blue-600 duration-300"
          >
            <v-icon icon="mdi-phone"></v-icon>
            <a href="tel:+919836033443">+919836033443</a>
          </li>
          <li
            class="space-x-1 flex items-center hover:text-blue-600 duration-300"
          >
            <v-icon icon="mdi-github"></v-icon>
            <a href="https://github.com/sagnik6969">sagnik6969</a>
          </li>
          <li
            class="space-x-1 flex items-center hover:text-blue-600 duration-300"
          >
            <v-icon icon="mdi-linkedin"></v-icon>
            <a href="https://www.linkedin.com/in/sagnik-jana-3452771ba/"
              >sagnik-jana-3452771ba</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const name = ref("");
const email = ref("");
const message = ref("");
const errors = ref({});
const loading = ref(false);

const handleSubmit = () => {
  errors.value = {};
  loading.value = true;

  axios
    .post("/api/message", {
      sender_name: name.value,
      sender_email: email.value,
      message: message.value,
    })
    .then((res) => {
      console.log(res);
      toast.success("Message sent successfully!!");
      loading.value = false;
    })
    .catch((err) => {
      console.log(err.response.data);

      if (err.response.data.errors) errors.value = err.response.data.errors;
      else toast.error("Something went wrong. Please try after some time.");
      loading.value = false;
    });
};
</script>
