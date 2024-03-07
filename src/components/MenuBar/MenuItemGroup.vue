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
</template>

<script setup lang="ts">
import router from "@/router";

const toSearch = () => router.push({ name: "search" });
const toAlbums = () => router.push({ name: "albums" });
</script>

<style lang="css">
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
.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title {
  color: #303133;
  border-bottom-color: #404143;
}
.el-sub-menu.is-active .el-sub-menu__title {
  color: #303133;
  border-bottom-color: #303133;
}
</style>
