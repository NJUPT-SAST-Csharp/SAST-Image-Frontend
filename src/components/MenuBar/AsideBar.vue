<template>
  <div id="aside-placeholder" :class="{ detailed: !maincollapsed, brief: maincollapsed }" />
  <div id="menu">
    <el-menu
      :default-active="currentView"
      :collapse="menuCollapsed"
      :ellipsis="false"
      unique-opened
      close-on-click-outside
    >
      <el-menu-item index="switch" style="padding: 0%" @click="maincollapsed = !maincollapsed">
        <MainHomeDiv manual :collapse="maincollapsed" />
      </el-menu-item>
      <el-menu-item index="home" @click="toHome">
        <el-icon><House /></el-icon>
        <template #title>
          <el-text size="large">{{ $t("menuItem.home") }}</el-text>
        </template>
      </el-menu-item>
      <el-sub-menu index="explore">
        <template #title>
          <el-icon><Guide /></el-icon>
          <el-text size="large">{{ $t("menuItem.explore") }}</el-text>
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
          <el-text size="large">{{ $t("menuItem.search") }}</el-text>
        </template>
      </el-menu-item>
      <el-menu-item index="upload">
        <el-icon><Upload /></el-icon>
        <template #title>
          <el-text size="large">{{ $t("action.upload") }}</el-text>
        </template>
      </el-menu-item>
      <el-menu-item index="profile" style="padding: 0%" @click="toProfile">
        <ProfileDiv manual :collapse="maincollapsed" />
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import ProfileDiv from "./ProfileDiv.vue"
import MainHomeDiv from "./MainHomeDiv.vue"
import router from "@/router"
import { computed, ref, watch } from "vue"
import auth from "@/stores/auth"
import "element-plus/theme-chalk/display.css"

const maincollapsed = ref(true)
const menuCollapsed = ref(true)

watch(maincollapsed, (newVal) => {
  if (newVal)
    setTimeout(() => {
      menuCollapsed.value = newVal
    }, 0)
  else menuCollapsed.value = false
})

// icon locate
const currentView = computed(() => {
  var name = router.currentRoute.value.name
  return name
})

// routers
const toHome = () => router.push({ path: "/" })
const toSearch = () => router.push({ name: "search" })
const toProfile = () => router.push({ path: "/" + auth.jwtDto.value?.username })
</script>

<style scoped lang="css">
#menu {
  flex-grow: 1;
  max-width: 180px;
  width: fit-content;
  position: fixed;
  height: 100%;
  display: flex;
}

#aside-placeholder {
  flex-grow: 1;
  transition: width 0.5s ease;
}

@media screen and (max-width: 62rem) {
  #menu {
    display: none;
  }
  #aside-placeholder {
    display: none;
  }
}

@media screen and (max-width: 75rem) and(min-width: 62rem) {
  #aside-placeholder {
    width: 72px;
  }
}

.flex-grow {
  flex-grow: 1;
}
.icon {
  margin: auto;
}

.detailed {
  width: 200px;
}

.brief {
  width: 72px;
}
</style>
