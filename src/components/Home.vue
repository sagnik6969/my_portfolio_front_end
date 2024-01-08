<template>
  <div class="container py-28 text-slate-800">
    <div class="text-3xl mb-2">Hello! 👋 I am</div>
    <div class="text-8xl font-semibold pb-5 mb-5 text-blue-900">
      Sagnik Jana
    </div>
    <div class="mb-8 text-4xl font-semibold w-2/3 text-slate-600">
      I am a <span class="text-blue-600">{{ typedTextSpan }}</span
      ><span class="ml-2" :class="{ cursor: true, typing: typing }">
        &nbsp;</span
      >
    </div>
    <div class="text-2xl w-2/3 text-slate-700">
      I am a Front-End / Full-Stack Developer. I am currently working at Recruit
      CRM as an Intern.
    </div>
    <div class="mt-6 space-x-2 text-xl text-slate-600">
      <a href="https://github.com/sagnik6969" target="_blank">
        <v-icon
          class="hover:text-blue-700 duration-300 hover:scale-125"
          icon="mdi-github"
        ></v-icon>
      </a>
      <a
        href="https://www.linkedin.com/in/sagnik-jana-3452771ba/"
        target="_blank"
      >
        <v-icon
          class="hover:text-blue-700 duration-300 hover:scale-125"
          icon="mdi-linkedin"
        ></v-icon>
      </a>
      <a href="https://leetcode.com/sagnikjana2001/" target="_blank">
        <v-icon
          class="hover:text-blue-700 duration-300 hover:scale-125"
          icon="mdi-code-tags"
        ></v-icon>
      </a>
      <a href="https://twitter.com/sagnikjana2001" target="_blank">
        <v-icon
          class="hover:text-blue-700 duration-300 hover:scale-125"
          icon="mdi-twitter"
        ></v-icon>
      </a>
    </div>
    <div class="space-x-4 mt-6 font-semibold">
      <button
        @click="openMailLink"
        class="rounded-md py-2 px-3 bg-slate-700 text-white hover:scale-110 duration-300"
      >
        <v-icon icon="mdi-email"></v-icon>
        Connect
      </button>
      <button
        @click="openResumeLink"
        class="rounded-md py-2 px-3 bg-slate-300 text-blue-950 hover:scale-110 duration-300"
      >
        <v-icon icon="mdi-tray-arrow-down"></v-icon>
        Resume
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const typedTextSpan = ref("");
const typing = ref(false);

const textArray = ["Programmer", "Full-Stack Developer"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;
async function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typing.value = true;
    typedTextSpan.value += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    typing.value = false;
    setTimeout(erase, newTextDelay);
  }
}

async function erase() {
  if (charIndex > 0) {
    typing.value = true;
    typedTextSpan.value = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    typing.value = false;
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

onMounted(() => {
  type();
});

const openResumeLink = () => {
  window
    .open(
      "https://drive.google.com/file/d/18bcKadCL7Cnudg02wJgt57U2_2gXycy2/view?usp=sharing",
      "_blank"
    )
    .focus();
};

const openMailLink = () => {
  window.open("mailto:sagnikjana2001@gmail.com", "_blank").focus();
};
</script>

<style scoped>
.cursor {
  display: inline-block;
  background-color: #e4ce24;
  width: 4px;
  animation: blink 1s infinite;
}
.cursor.typing {
  animation: none;
}
@keyframes blink {
  0% {
    background-color: transparent;
  }
  49% {
    background-color: transparent;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: #e4ce24;
  }
  100% {
    background-color: #e4ce24;
  }
}
</style>
