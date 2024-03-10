<template>
  <div>
    <ElSkeleton animated :throttle="500" :loading="isLoading">
      <template #template>
        <ElSkeletonItem variant="image" />
      </template>
      <template #default>
        <ElEmpty v-if="isEmpty" />
        <div v-else class="main-frame" v-infinite-scroll="getImages">
          <div class="items" v-for="image in images" :key="image.Id">
            <ImageItem :src="image.Url" />
          </div>
        </div>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ImageItem, { type Image } from "./ImageItem.vue";

const isLoading = ref(true);
const isEmpty = ref(true);
const images = ref<Image[]>();

onMounted(async () => {
  await getImages();
  isLoading.value = false;
});

const getImages = async () => {};
</script>

<style scoped>
.main-frame {
  height: 100%;
  overflow: auto;
  margin: 10px;
  column-count: 3;
  column-gap: 10px;
}
.items {
  margin-bottom: 10px;
}
</style>
