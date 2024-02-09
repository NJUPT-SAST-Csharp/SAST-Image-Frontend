<template>
  <div class="main-frame">
    <el-skeleton style="height: 240px" animated :throttle="500" v-if="isLoading">
      <template #template>
        <el-skeleton-item variant="image" style="height: 240px" />
      </template>
    </el-skeleton>
    <el-image
      :style="{
        width: 100 + '%',
        height: isEmpty ? 80 + 'px' : 50 + 'vh',
        display: isLoading ? 'none' : 'block'
      }"
      :src="props.headerSrc ?? 'empty'"
      fit="cover"
      @error="loadFail"
      @load="isLoading = false"
    >
      <template #error>
        <div></div>
      </template>
    </el-image>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{ headerSrc: string | null }>()

const isLoading = ref(true)
const isEmpty = ref(false)

const loadFail = () => {
  isLoading.value = false
  isEmpty.value = true
}
</script>

<style scoped>
.main-frame {
  width: 100%;
  min-height: 80px;
}
</style>
