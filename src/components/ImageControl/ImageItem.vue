<template>
  <div>
    <ElImage :src="src">
      <template #error>
        <img src="../../assets/default.png" />
      </template>
    </ElImage>
  </div>
</template>

<script setup lang="ts">
export interface Image {
  Id: number;
  Url: string;
  Title: string;
  Description: string;
  CategoryId: number;
  CreatedAt: any;
  AuthorId: number;
  Accessibility: number;
  Tags: string[];
}

const props = defineProps<{ src: string }>();
</script>
