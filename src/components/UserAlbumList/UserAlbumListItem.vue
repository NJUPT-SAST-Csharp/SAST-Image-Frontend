<template>
  <div class="item" @click="click">
    <ElCard
      shadow="hover"
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
      :body-style="{
        display: 'flex',
        padding: '10px',
        'aspect-ratio': '1000 / 618',
        'max-height': '180px',
        'justify-content': 'center',
        'align-items': 'center',
      }"
    >
      <div v-loading="loading">
        <ElImage
          class="image-div"
          :src="album.coverUrl ?? ''"
          fit="cover"
          loading="lazy"
          @load="done"
          @error="done"
        >
          <template #error>
            <div class="image-slot">
              <ElIcon><Picture /></ElIcon>
            </div>
          </template>
        </ElImage>
      </div>
      <template #footer>
        <ElText size="large">{{ album.title }}</ElText>
      </template>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import type { UserAlbumDto } from "@/network/apis/album/GetUserAlbums";
import { ref } from "vue";

defineProps<{ album: UserAlbumDto }>();

const loading = ref(true);

const done = () => {
  loading.value = false;
};
const click = () => {};
</script>

<style scoped lang="css">
.item {
  cursor: pointer;
  width: 100%;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.image-div {
  max-height: 180px;
  aspect-ratio: 1000 / 618;
}
</style>
