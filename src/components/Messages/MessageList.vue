<template>
  <div class="container">
    <div class="max-w-2xl mx-auto">
      <div class="mt-16 mb-5 max-w-3xl">
        <h1 class="text-4xl mb-2 font-semibold text-slate-800">Messages</h1>
        <search-box
          placeholder="Search Messages...."
          class="mt-5 h-9"
        ></search-box>
        <hr class="h-px my-8 bg-slate-400 border-0 dark:bg-gray-700" />
        <div class="flex justify-center py-10 text-slate-700" v-if="isLoading">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <div v-else class="mt-5 bg-slate-50 shadow rounded-md">
          <transition-group tag="div" name="message-list">
            <message-card
              v-for="message in messages"
              :message="message"
              :key="message.id"
              @messageDeleted="deleteMessage"
            ></message-card>
          </transition-group>
          <paginator :pagination="paginator" @loadPage="loadPage"></paginator>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBox from "@/components/ui/SearchBox.vue";
import Paginator from "@/components/ui/Paginator.vue";
import MessageCard from "./MessageCard.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const messages = ref([]);
const paginator = ref({});

const loadPage = (url) => {
  isLoading.value = true;
  const [, paramString] = url.split("?");
  let pageNo = new URLSearchParams(paramString).get("page");
  if (!pageNo) pageNo = 1;
  router.push(`/connect/admin?page=${pageNo}`);
  axios
    .get(url)
    .then((res) => {
      messages.value = res.data.data;
      paginator.value = res.data.meta;
      console.log(res.data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      isLoading.value = false;
    });
};

onMounted(() => {
  const pageNumber = route.query.page ? route.query.page : 1;
  loadPage(`/api/message?page=${pageNumber}`);
});

const deleteMessage = (id) => {
  messages.value = messages.value.filter((message) => {
    return message.id != id;
  });
};
</script>

<style scoped>
.message-list-leave-from {
  /* opacity: 0%; */
  position: absolute;
}

.message-list-move {
  transition: transform 500ms ease-out;
}
</style>
