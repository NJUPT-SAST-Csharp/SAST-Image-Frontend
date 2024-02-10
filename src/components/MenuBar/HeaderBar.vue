<template>
  <el-menu
    :default-active="currentView"
    menu-trigger="click"
    mode="horizontal"
    :ellipsis="false"
    unique-opened="true"
  >
    <el-menu-item index="home">
      <MainHomeDiv />
    </el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="explore">
      <template #title>
        <el-icon><Guide /></el-icon>
        <el-text class="detailed-display" size="large">{{ $t("menuItem.explore") }}</el-text>
      </template>
      <el-menu-item index="2-1">
        <template #title>
          <el-icon><Clock /></el-icon>
          <el-text>{{ $t("menuItem.exploreSubItem.recent") }}</el-text>
        </template>
      </el-menu-item>
      <el-menu-item index="2-2">
        <template #title>
          <el-icon><Collection /></el-icon>
          <el-text>{{ $t("menuItem.exploreSubItem.following") }}</el-text>
        </template>
      </el-menu-item>
      <el-menu-item index="2-3">
        <template #title>
          <el-icon><Orange /></el-icon>
          <el-text>{{ $t("menuItem.exploreSubItem.popular") }}</el-text>
        </template>
      </el-menu-item>
      <el-menu-item index="2-4">
        <template #title>
          <el-icon><Star /></el-icon>
          <el-text>{{ $t("menuItem.exploreSubItem.likes") }}</el-text>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="search" @click="router.push({ name: 'search' })">
      <el-icon><Search /></el-icon>
      <template #title>
        <el-text class="detailed-display" size="large">{{ $t("menuItem.search") }}</el-text>
      </template>
    </el-menu-item>
    <el-menu-item index="upload">
      <el-icon><Upload /></el-icon>
      <template #title>
        <el-text class="detailed-display" size="large">{{ $t("action.upload") }}</el-text>
      </template>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="profile">
      <ProfileDiv />
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import media from "@/stores/media"
import ProfileDiv from "./ProfileDiv.vue"
import MainHomeDiv from "./MainHomeDiv.vue"
import router from "@/router"

// 图标定位控制
const currentView = computed(() => {
  var name = router.currentRoute.value.name
  return name
})
</script>

<style scoped lang="css">
.el-menu {
  width: 100%;
}

.flex-grow {
  flex-grow: 1;
}

@media (max-width: 36rem) {
  .detailed-display {
    display: none;
  }
}

div {
  background-color: #fff;
}

html.dark div {
  background-color: #000;
}
</style>
