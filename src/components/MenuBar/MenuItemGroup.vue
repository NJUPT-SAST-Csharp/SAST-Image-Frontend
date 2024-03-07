<template>
  <ElSubMenu teleported index="explore">
    <template #title>
      <ElIcon><Guide /></ElIcon>
      <ElText class="text" size="large">{{ $t("explore") }}</ElText>
    </template>
    <ElMenuItem index="albums" @click="toAlbums">
      <template #title>
        <ElIcon><Collection /></ElIcon>
        <ElText>{{ $t("albums") }}</ElText>
      </template>
    </ElMenuItem>
    <ElMenuItem index="images">
      <template #title>
        <ElIcon><Picture /></ElIcon>
        <ElText>{{ $t("images") }}</ElText>
      </template>
    </ElMenuItem>
  </ElSubMenu>
  <ElMenuItem index="search" @click="toSearch">
    <ElIcon><Search /></ElIcon>
    <template #title>
      <ElText class="text" size="large">{{ $t("search") }}</ElText>
    </template>
  </ElMenuItem>
  <ElMenuItem index="upload">
    <ElIcon><Upload /></ElIcon>
    <template #title>
      <ElText class="text" size="large">{{ $t("action.upload") }}</ElText>
    </template>
  </ElMenuItem>
</template>

<script setup lang="ts">
import router from "@/router";

const toSearch = () => router.push({ name: "search" });
const toAlbums = () => router.push({ name: "albums" });
</script>

<style scoped lang="css">
.text {
  display: block;
}

@media screen and (max-width: 48em) {
  .text {
    display: none;
  }
}
.el-menu-item.is-active {
  color: #303133;
}
</style>
