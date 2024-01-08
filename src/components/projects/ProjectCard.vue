<template>
  <div
    class="flex flex-col bg-white rounded-xl shadow-xl duration-300 w-full h-full overflow-hidden hover:scale-105"
  >
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
defineProps({
  project: {
    required: true,
  },
});

const openLinkInANewWindow = (link) => window.open(link, "_blank").focus();
</script>

<style scoped></style>
