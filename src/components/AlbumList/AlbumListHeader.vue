<template>
  <h1>{{ title }}</h1>
  <ElRadioGroup v-model="categoryId" size="large">
    <ElRadioButton label="All" value="0"> </ElRadioButton>
    <ElRadioButton
      v-for="category in categories"
      :key="category.categoryId"
      :label="category.name"
      :value="category.categoryId"
    >
      {{ category.name }}
    </ElRadioButton>
  </ElRadioGroup>
</template>

<script setup lang="ts">
import type { CategoryDto } from "@/network/apis/category/GetAllCategories";
import getAllCategories from "@/network/apis/category/GetAllCategories";
import { ref, defineProps, onMounted } from "vue";

defineProps<{ title: string }>();
const categories = ref<CategoryDto[]>([]);
const categoryId = defineModel("category", {
  type: Number,
  default: 0,
});

onMounted(async () => {
  const response = await getAllCategories();
  if (response.status < 300) {
    categories.value = response.data;
  }
});
</script>
