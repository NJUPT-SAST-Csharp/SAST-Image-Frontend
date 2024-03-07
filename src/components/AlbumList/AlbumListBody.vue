<template>
  <div class="frame">
    <AlbumListItem v-for="album in albums" :key="album.id" :album="album" />
  </div>
</template>

<script setup lang="ts">
import type { AlbumItem } from "@/components/AlbumList/AlbumListItem.vue";
import AlbumListItem from "@/components/AlbumList/AlbumListItem.vue";

defineProps<{ albums: AlbumItem[] }>();
</script>

<style scoped lang="css">
.frame {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  column-gap: 10px;
  row-gap: 1em;
}
</style>
