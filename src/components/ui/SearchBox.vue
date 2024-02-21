<template>
  <div
    class="w-fit bg-white duration-300 border-slate-300 border-2 rounded-lg hover:scale-110 hover:border-slate-500"
    :class="{
      'scale-110': isInputOnFocus,
      'border-slate-500': isInputOnFocus,
    }"
  >
    <input
      class="h-full rounded-tl-xl rounded-bl-xl border-0 outline-0 bg-transparent focus:[box-shadow:none]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      type="text"
      @focus="isInputOnFocus = true"
      @blur="isInputOnFocus = false"
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
</template>

<script setup>
import { ref } from "vue";
const isInputOnFocus = ref(false);

defineProps(["modelValue", "placeholder"]);
defineEmits(["update:modelValue"]);
</script>
