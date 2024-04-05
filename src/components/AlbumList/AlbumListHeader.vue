<template>
  <h1>{{ title }}</h1>
  <ElRadioGroup v-model="categoryId" size="large">
    <ElRadioButton value="0">All</ElRadioButton>
    <ElRadioButton
      v-for="category in categories"
      :key="category.id"
      :value="category.id"
    >
      {{ category.name }}
    </ElRadioButton>
  </ElRadioGroup>
</template>

<script setup lang="ts">
import type { Category } from "@/stores/category";
import getAllCategories from "@/network/apis/category/GetAllCategories";
import { ref, defineProps, onMounted } from "vue";

defineProps<{ title: string }>();
const categories = ref<Category[]>([]);
const categoryId = defineModel<number>("category", {
  default: 0,
});

onMounted(async () => {
  const response = await getAllCategories();
  if (response.status < 300) {
    categories.value = response.data;
  }
});
</script>
