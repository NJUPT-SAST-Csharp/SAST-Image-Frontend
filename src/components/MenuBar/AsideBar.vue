<template>
  <div
    class="placeholder hidden-sm-and-down"
    :style="{ 'min-width': width + 'px' }"
  />
  <div id="menu" class="hidden-sm-and-down" :style="{ width: width + 'px' }">
    <el-menu
      :default-active="currentView"
      :collapse="collapsed"
      :ellipsis="false"
      :collapse-transition="false"
      unique-opened
      close-on-click-outside
      :style="{ 'min-width': width + 'px' }"
    >
      <el-menu-item
        index="switch"
        style="padding: 0%"
        @click="collapsed = !collapsed"
      >
        <MainHomeDiv manual :collapse="collapsed" />
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
        <ProfileDiv manual :collapse="collapsed" />
      </el-menu-item>
      <li class="placeholder" :style="{ 'min-width': width + 'px' }"></li>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import ProfileDiv from "./ProfileDiv.vue";
import MainHomeDiv from "./MainHomeDiv.vue";
import router from "@/router";
import { computed, ref, watch } from "vue";
import auth from "@/stores/auth";
import "element-plus/theme-chalk/display.css";

const collapsed = ref(true);

const width = ref<number>(64);

watch(collapsed, (newVal) => {
  setTimeout(() => {
    width.value = newVal ? 65 : 180;
  }, 0);
});

// icon locate
const currentView = computed(() => {
  var name = router.currentRoute.value.name;
  return name;
});

// routers
const toHome = () => router.push({ path: "/" });
const toSearch = () => router.push({ name: "search" });
const toProfile = () =>
  router.push({ path: "/" + auth.jwtDto.value?.username });
</script>

<style scoped lang="css">
#menu {
  position: fixed;
  height: 100%;
  display: flex;
  overflow: hidden;
  transition:
    width 1s ease,
    min-width 1s ease;
}

.el-menu {
  transition: min-width 1s ease;
}

.el-menu--collapse {
  transition: min-width 1s ease;
}

.placeholder {
  transition: min-width 1s ease;
  height: 100%;
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
</style>
