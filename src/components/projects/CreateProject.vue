<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto mt-28 mb-28">
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-900 dark:text-white">
          <h1 class="text-lg mb-1">Title</h1>
          <input
            v-model="title"
            type="text"
            class="border-slate-300 border-2 rounded-lg w-full"
            :class="{ 'border-red-400': errors && errors.title }"
            placeholder="Enter project title . . ."
            required
          />
        </label>
        <div class="text-red-600" v-if="errors.title">
          {{ errors.title[0] }}
        </div>
      </div>
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-900 dark:text-white">
          <h1 class="text-lg mb-1">Description</h1>
          <textarea
            v-model="description"
            :class="{ 'border-red-400': errors.description }"
            class="border-slate-300 border-2 rounded-lg w-full"
            placeholder="Enter project Description . . ."
            rows="6"
            required
          ></textarea>
        </label>
        <div class="text-red-600" v-if="errors.description">
          {{ errors.description[0] }}
        </div>
      </div>
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-900 dark:text-white">
          <h1 class="text-lg mb-1">Github Link</h1>
          <input
            v-model="github_link"
            type="url"
            :class="{ 'border-red-400': errors.github_link }"
            class="border-slate-300 border-2 rounded-lg w-full"
            placeholder="Enter github link . . ."
            required
          />
        </label>
        <div class="text-red-600" v-if="errors.github_link">
          {{ errors.github_link[0] }}
        </div>
      </div>
      <div class="mb-5">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <h1 class="text-lg mb-1">Live Link</h1>
          <input
            v-model="live_link"
            type="url"
            :class="{ 'border-red-400': errors.live_link }"
            class="border-slate-300 border-2 rounded-lg w-full"
            placeholder="Enter live link . . ."
            required
          />
        </label>
        <div class="text-red-600" v-if="errors.live_link">
          {{ errors.live_link[0] }}
        </div>
      </div>

      <div class="mb-5">
        <h1 class="text-lg mb-1 font-medium text-gray-900">Skills</h1>
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div
          class="mb-2 text-gray-900 font-medium"
          v-for="skill in availableSkills"
        >
          <label class="flex items-center space-x-2">
            <input
              class="border-2"
              v-model="skills"
              :value="skill"
              type="checkbox"
            />
            <span class="font-normal">{{ skill }}</span>
          </label>
        </div>
        <div class="text-red-600" v-if="errors.skills">
          {{ errors.skills[0] }}
        </div>
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
          <v-icon v-else icon="mdi-plus-box"></v-icon>
          Add Project
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
// import { watch } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

const title = ref("");
const description = ref("");
const github_link = ref("");
const live_link = ref("");
const skills = ref([]);

const errors = ref({});
const loading = ref(false);

const availableSkills = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "VUE.JS",
  "PHP",
  "LARAVEL",
  "ALGORITHMS",
];

const handleSubmit = () => {
  loading.value = true;

  axios
    .post("/api/projects", {
      title: title.value,
      description: description.value,
      github_link: github_link.value,
      live_link: live_link.value,
      skills: skills.value,
    })
    .then((res) => {
      console.log(res);
      toast.success("Project added successfully!!");
      router.push("/projects");
      loading.value = false;
    })
    .catch((err) => {
      console.log(err.response.data);

      if (err.response.data.errors) errors.value = err.response.data.errors;
      loading.value = false;
    });
};

// watch(skills,(newVal)=>console.log(newVal));
</script>
