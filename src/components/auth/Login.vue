<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto mt-28 mb-28">
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-900 dark:text-white">
          <h1 class="text-lg mb-1">Email</h1>
          <input
            v-model="email"
            type="text"
            class="border-slate-300 border-2 rounded-lg w-full"
            :class="{ 'border-red-400': error }"
            placeholder="user@example.com"
            required
          />
        </label>
        <!-- <div class="text-red-600" v-if="errors.title">
          {{ errors.title[0] }}
        </div> -->
      </div>

      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-900 dark:text-white">
          <h1 class="text-lg mb-1">Password</h1>
          <input
            v-model="password"
            type="password"
            class="border-slate-300 border-2 rounded-lg w-full"
            :class="{ 'border-red-400': error }"
            required
          />
        </label>
        <!-- <div class="text-red-600" v-if="errors.title">
          {{ errors.title[0] }}
        </div> -->
      </div>

      <div class="mb-5">
        <button
          class="rounded-md py-2 px-3 bg-blue-600 text-white hover:scale-110 duration-300"
        >
          <v-icon
            class="animate-spin"
            v-if="loading"
            icon="mdi-loading"
          ></v-icon>
          <v-icon v-else icon="mdi-login"></v-icon>
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

const store = useStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");

const loading = ref(false);
const error = ref(null);

const redirectUrl = route.query.redirect || "/";

const handleSubmit = () => {
  loading.value = true;

  store
    .dispatch("login", {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      loading.value = false;
      toast.success(res);
      router.replace(redirectUrl);
    })
    .catch((err) => {
      loading.value = false;
      toast.error(err);
    });
};
</script>
