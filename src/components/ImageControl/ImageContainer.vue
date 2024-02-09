<template>
  <div>
    <el-skeleton animated :throttle="500" :loading="isLoading">
      <template #template>
        <el-skeleton-item variant="image" />
      </template>
      <template #default>
        <el-empty v-if="isEmpty" />
        <div v-else class="main-frame" v-infinite-scroll="getImages">
          <div class="items" v-for="image in images" :key="image.Id">
            <ImageItem :src="image.Url" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ElMessage } from "element-plus"
import ImageItem, { type Image } from "./ImageItem.vue"
import getImagesApi from "@/network/apis/image/GetImages"
import router from "@/router"

const isLoading = ref(true)
const isEmpty = ref(true)
const images = ref<Image[]>()

onMounted(async () => {
  await getImages()
  isLoading.value = false
})

const getImages = async () => {
  const response = await getImagesApi(router.currentRoute.value.params["username"] as string, 1)
  if (response.status < 300) images.value = response.data["images"] as Image[]
  else ElMessage.error("Error!")
  if (images.value?.length == 0) isEmpty.value == true
}
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
