<template>
  <div
    class="relative flex flex-col bg-white rounded-xl shadow-xl duration-300 w-full h-full overflow-hidden hover:scale-105"
  >
    <div
      v-if="$store.getters.isLoggedIn"
      class="absolute top-4 right-4 bg-slate-300 py-1 px-1 rounded-md space-x-2 text-slate-700 flex justify-center items-center"
    >
      <button
        @click="deleteProject(project.id)"
        class="hover:text-blue-600 hover:scale-105 duration-300 hover:first:inline-block"
      >
        <v-icon class="animate-spin" v-if="loading" icon="mdi-loading"></v-icon>
        <v-icon v-else icon="mdi-delete"></v-icon>
      </button>
      <button
        class="hover:text-blue-600 hover:scale-105 duration-300 hover:first:inline-block"
      >
        <v-icon icon="mdi-pencil"></v-icon>
      </button>
    </div>
    <img
      class="w-full h-52 object-cover"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsk-4Y13Pf9giRlQoIj43QrGPNEVgDW0roWa9KfHuKFA&s"
      alt="Project Image"
    />
    <div class="p-5 flex flex-col flex-auto">
      <div class="text-2xl font-semibold text-slate-800 mb-3">
        {{ project.title }}
      </div>
      <div class="flex flex-wrap mb-3 text-xs font-medium text-slate-700">
        <div
          v-for="skill in project.skills"
          :key="skill.id"
          class="mr-2 mb-2 py-1 px-2 bg-slate-300 rounded flex items-center justify-center space-x-1"
        >
          <v-icon :icon="'mdi-' + skill.icon_name"></v-icon>
          <span>{{ skill.title }}</span>
        </div>
      </div>
      <div class="mb-3 text-slate-600">
        {{ project.description }}
      </div>
      <div class="space-x-4 mt-6 font-semibold flex-auto flex items-end">
        <button
          @click="openLinkInANewWindow(project.github_link)"
          class="rounded-md py-2 px-3 bg-slate-700 text-white hover:scale-110 duration-300"
        >
          <v-icon icon="mdi-github"></v-icon>
          Source Code
        </button>
        <button
          @click="openLinkInANewWindow(project.live_link)"
          class="rounded-md py-2 px-3 bg-slate-300 text-blue-950 hover:scale-110 duration-300"
        >
          <v-icon icon="mdi-open-in-new"></v-icon>
          Live Link
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

const store = useStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const loading = ref(false);

defineProps({
  project: {
    required: true,
  },
});

const emit = defineEmits(["deleted"]);

const openLinkInANewWindow = (link) => window.open(link, "_blank").focus();

const deleteProject = (id) => {
  loading.value = true;
  const token = store.getters.getToken;

  axios
    .delete(`/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      loading.value = false;
      console.log(res);
      toast.success("project deleted successfully!!");
      emit("deleted");
    })
    .catch((err) => {
      loading.value = false;
      if (err.response.data.message == "Unauthenticated.") {
        toast.error("Please login to add a project");
        router.push(`/login?redirect=${route.fullPath}`);
      }
      console.log(err);
    });
};
</script>

<style scoped></style>
