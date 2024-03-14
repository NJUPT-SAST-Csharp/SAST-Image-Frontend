<template>
  <ElEmpty v-if="albums.length === 0" description="No albums." />
  <div class="frame" v-else>
    <UserAlbumListItem
      v-for="album in albums"
      :key="album.albumId.toString()"
      :album="album"
    />
  </div>
</template>

<script setup lang="ts">
import type { UserAlbumDto } from "@/network/apis/album/GetUserAlbums";
import UserAlbumListItem from "./UserAlbumListItem.vue";
import { onMounted, ref } from "vue";
import getUserAlbums from "@/network/apis/album/GetUserAlbums";

const props = defineProps<{ userId: number }>();

const albums = ref<UserAlbumDto[]>([]);

onMounted(async () => {
  const response = await getUserAlbums(props.userId);
  if (response.status < 300) {
    albums.value = response.data;
  }
});
</script>

<style scoped lang="css">
.frame {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  column-gap: 10px;
  row-gap: 1em;
}
</style>
