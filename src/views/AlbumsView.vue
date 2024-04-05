<template>
  <div class="main-view">
    <AlbumListHeader
      :title="i18n.global.t('albumList')"
      :category="Number.parseInt(categoryId.toString())"
    />
    <AlbumListBody :albums="albums" />
  </div>
</template>

<script setup lang="ts">
import AlbumListHeader from "@/components/AlbumList/AlbumListHeader.vue";
import AlbumListBody from "@/components/AlbumList/AlbumListBody.vue";
import { onMounted, ref, watch } from "vue";
import { i18n } from "@/locales/i18n";
import getAlbums, { type AlbumDto } from "@/network/apis/album/GetAlbums";

const albums = ref<AlbumDto[]>([]);
const categoryId = ref(0);

watch(categoryId, async (newCategoryId) => {
  albums.value = await getAlbums(newCategoryId, 0);
});

onMounted(async () => {
  albums.value = await getAlbums(0, 0);
});
</script>

<style scoped lang="css">
.main-view {
  margin: 5px;
}
</style>
