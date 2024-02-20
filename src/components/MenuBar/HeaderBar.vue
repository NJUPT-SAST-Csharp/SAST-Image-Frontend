<template>
  <el-header class="hidden-md-and-up" height="60px" v-if="display">
    <el-menu
      :default-active="currentView"
      mode="horizontal"
      menu-trigger="click"
      :ellipsis="false"
      unique-opened
    >
      <el-menu-item index="home" @click="toHome">
        <MainHomeDiv />
      </el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="explore">
        <template #title>
          <el-icon><Guide /></el-icon>
          <el-text class="hidden-xs-only" size="large">{{ $t("menuItem.explore") }}</el-text>
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
      <el-menu-item index="search" @click="toSearch">
        <el-icon><Search /></el-icon>
        <template #title>
          <el-text class="hidden-xs-only" size="large">{{ $t("menuItem.search") }}</el-text>
        </template>
      </el-menu-item>
      <el-menu-item index="upload">
        <el-icon><Upload /></el-icon>
        <template #title>
          <el-text class="hidden-xs-only" size="large">{{ $t("action.upload") }}</el-text>
        </template>
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="profile" @click="toProfile">
        <ProfileDiv />
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import ProfileDiv from "./ProfileDiv.vue"
import MainHomeDiv from "./MainHomeDiv.vue"
import router from "@/router"
import auth from "@/stores/auth"
// 图标定位控制
const currentView = computed(() => {
  var name = router.currentRoute.value.name
  return name
})

// 是否显示
const display = ref(true)
let scrollValue = 0
window.addEventListener("scroll", () => {
  const offset = document.documentElement.scrollTop - scrollValue
  if (offset > 5 && scrollValue > 500) display.value = false
  else if (offset < -5) display.value = true
  scrollValue = document.documentElement.scrollTop
})

// routers
const toHome = () => router.push({ path: "/" })
const toSearch = () => router.push({ name: "search" })
const toProfile = () => router.push({ path: "/" + auth.jwtDto.value?.username })
</script>

<style scoped lang="css">
.el-menu {
  padding: 0;
  width: 100%;
}

.flex-grow {
  flex-grow: 1;
}

div {
  background-color: #fff;
}

html.dark div {
  background-color: #000;
}
</style>
