<template>
  <div class="flex px-7 py-5 justify-between items-center">
    <p class="text-slate-600">
      Showing
      <span class="font-medium text-slate-700">{{ pagination.from }}</span>
      to
      <span class="font-medium text-slate-700">{{ pagination.to }}</span>
      of
      <span class="font-medium text-slate-700">{{ pagination.total }}</span>
      results
    </p>
    <ul class="flex">
      <button
        class="bg-white py-1 px-3 border-2 border-slate-500 text-base text-slate-800 disabled:text-slate-500 disabled:hover:bg-white hover:bg-slate-200 duration-200"
        :class="[
          {
            'bg-slate-500 text-slate-100 hover:bg-slate-600': link.active,
            'rounded-l': idx == 0,
            'rounded-r': idx == filteredArray.length - 1,
            'border-l-0': idx != 0,
          },
        ]"
        v-for="(link, idx) in filteredArray"
        :key="idx"
        v-html="link.label"
        :disabled="!link.url"
        @click="$emit('loadPage', link.url)"
      ></button>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["pagination"]);
defineEmits(["loadPage"]);

const filteredArray = computed(() => {
  return props.pagination.links.filter((value, idx) => {
    return (
      idx == 0 ||
      idx == props.pagination.links.length - 1 ||
      Math.abs(idx - props.pagination.current_page) <= 2
    );
  });
});
</script>
