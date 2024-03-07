<template>
  <div class="main-view">
    <AlbumListHeader />
    <AlbumListBody :albums="albums" />
  </div>
</template>

<script setup lang="ts">
import AlbumListHeader from "@/components/AlbumList/AlbumListHeader.vue";
import AlbumListBody from "@/components/AlbumList/AlbumListBody.vue";
import { ref } from "vue";
import type { AlbumItem } from "@/components/AlbumList/AlbumListItem.vue";

const albums = ref<AlbumItem[]>([
  {
    id: 1,
    title: "Album 1",
    cover: "https://picsum.photos/500/300",
  },
  {
    id: 2,
    title: "Album 2",
    cover: "https://picsum.photos/200/301",
  },
  {
    id: 3,
    title: "Album 3",
    cover: "https://picsum.photos/500/102",
  },
  {
    id: 4,
    title: "Album 4",
    cover: null,
  },
  {
    id: 5,
    title: "Album 5",
    cover: "https://picsum.photos/900/104",
  },
]);
</script>

<style scoped lang="css">
.main-view {
  margin: 5px;
}
</style>
