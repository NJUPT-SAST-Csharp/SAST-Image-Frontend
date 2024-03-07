<template>
  <div class="item">
    <ElCard
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      "
      shadow="hover"
      body-style="aspect-ratio: 1000 / 618; padding: 10px; max-height: 200px; display: flex; justify-content: center; align-items: center;"
    >
      <ElImage
        :src="album.cover ?? ''"
        fit="cover"
        loading="lazy"
        style="max-height: 200px; aspect-ratio: 1000 / 618"
      >
        <template #error>
          <div class="image-slot">
            <ElIcon><Picture /></ElIcon>
          </div>
        </template>
      </ElImage>
      <template #footer>
        <ElText size="large">{{ album.title }}</ElText>
      </template>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineProps<{ album: AlbumItem }>();

export interface AlbumItem {
  id: number;
  title: string;
  cover: string | null;
}
</script>

<style scoped lang="css">
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
</style>
