<template>
  <ElEmpty v-if="albums.length === 0" description="No albums." />
  <div class="frame" v-else>
    <AlbumListItem
      v-for="album in albums"
      :key="album.albumId"
      :album="album"
    />
  </div>
</template>

<script setup lang="ts">
import AlbumListItem from "@/components/AlbumList/AlbumListItem.vue";
import type { AlbumDto } from "@/network/apis/album/GetAlbums";

defineProps<{ albums: AlbumDto[] }>();
</script>

<style scoped lang="css">
.frame {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  column-gap: 10px;
  row-gap: 1em;
}
</style>
