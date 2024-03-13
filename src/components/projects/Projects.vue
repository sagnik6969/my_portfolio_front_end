<template>
  <div class="container">
    <div class="text-5xl font-semibold text-slate-800 mt-20">Projects</div>
    <div class="text-2xl text-slate-600 mt-5">
      I love building projects and practice my engineering skills, here's an
      archive of things that I've worked on.
    </div>
    <div
      class="mt-5 h-9 w-fit bg-white duration-300 border-slate-300 border-2 rounded-lg hover:scale-110 hover:border-slate-500"
      :class="{
        'scale-110': isInputOnFocus,
        'border-slate-500': isInputOnFocus,
      }"
    >
      <input
        class="h-full rounded-tl-xl rounded-bl-xl border-0 outline-0 bg-transparent"
        v-model="searchText"
        placeholder="Search projects"
        type="text"
        @focus="toggleIsInputOnFocus"
        @blur="toggleIsInputOnFocus"
      />
      <button
        class="px-2 h-full text-lg text-slate-500 bg-transparent rounded-tr-xl rounded-br-xl"
      >
        <v-icon
          :class="{
            'text-slate-700': isInputOnFocus,
            'scale-110': isInputOnFocus,
          }"
          class="duration-300"
          icon="mdi-magnify"
        ></v-icon>
      </button>
    </div>
    <hr class="h-px my-8 bg-slate-400 border-0 dark:bg-gray-700" />
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-5">
      <div v-for="project in filteredProjects" :key="project.id">
        <project-card
          class="max-w-96 mx-auto"
          :project="project"
        ></project-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import ProjectCard from "./ProjectCard.vue";
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const isInputOnFocus = ref(false);
// const isLoading = ref(false);
const projects = ref([
  {
    id: 1,
    title: "Task Scheduler",
    description: `Developed a task scheduler web application using Vue.js for frontend, Laravel for backend, and MySQL for database management. Implemented functionalities for task creation, update, deletion, progress tracking, marking tasks as completed and sorting the tasks by priority, deadline etc. Implemented lazy loading to reduce the initial loading time. Implemented appropriate user authentication and authorization features to ensure secure access to the application.`,
    github_link: "https://github.com/sagnik6969/task_scheduler_backend/",
    live_link: null,
    image_link: "/task_schedular.png",
    skills: [
      {
        id: 1,
        title: "VUE.JS",
        icon_name: "vuejs",
      },
      {
        id: 2,
        title: "LARAVEL",
        icon_name: "laravel",
      },
      {
        id: 3,
        title: "HTML",
        icon_name: "language-html5",
      },
      {
        id: 4,
        title: "CSS",
        icon_name: "language-css3",
      },
      {
        id: 5,
        title: "Javascript",
        icon_name: "language-javascript",
      },
      {
        id: 6,
        title: "PHP",
        icon_name: "language-php",
      },
    ],
  },
]);
const searchText = ref("");

const filteredProjects = computed(() => {
  return projects.value.filter((value) => {
    return (
      value.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
      value.description
        .toLowerCase()
        .includes(searchText.value.toLowerCase()) ||
      value.skills.reduce(
        (prev, curr) =>
          prev ||
          curr.title.toLowerCase().includes(searchText.value.toLowerCase()),
        false
      )
    );
  });
});

const toggleIsInputOnFocus = () =>
  (isInputOnFocus.value = !isInputOnFocus.value);

// const loadProjects = async () => {
//   isLoading.value = true;
//   // console.log(route.query);
//   // console.log(route.query.search);
//   axios
//     .get("/api/projects")
//     .then((res) => {
//       // console.log(res);
//       projects.value = res.data;
//       filterProjects(searchText.value);
//       isLoading.value = false;
//     })
//     .catch((err) => {
//       console.log(err);
//       isLoading.value = false;
//     });
// };

onMounted(() => {
  if (route.query.search) searchText.value = route.query.search;
});

// const filterProjects = (text) => {
//   filteredProjects.value = projects.value.filter((value) => {
//     return (
//       value.title.toLowerCase().includes(text.toLowerCase()) ||
//       value.description.toLowerCase().includes(text.toLowerCase()) ||
//       value.skills.reduce(
//         (prev, curr) =>
//           prev || curr.title.toLowerCase().includes(text.toLowerCase()),
//         false
//       )
//     );
//   });
// };

watch(searchText, (newVal) => {
  router.push(`projects?search=${newVal}`);
  // filterProjects(newVal);
});
</script>
<style scoped>
input:focus {
  box-shadow: none;
}
btn {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
