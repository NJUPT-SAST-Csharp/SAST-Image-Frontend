<template>
  <ElHeader
    height="60px"
    class="hidden-md-and-up header"
    :class="{ invisible: !display }"
  >
    <ElMenu
      class="menu"
      :default-active="currentView"
      mode="horizontal"
      menu-trigger="click"
      :ellipsis="false"
      unique-opened
    >
      <ElMenuItem index="home" @click="toHome">
        <MainHomeDiv />
      </ElMenuItem>
      <div class="flex-grow" />
      <ElSubMenu index="explore">
        <template #title>
          <ElIcon><Guide /></ElIcon>
          <ElText class="hidden-xs-only" size="large">{{
            $t("menuItem.explore")
          }}</ElText>
        </template>
        <ElMenuItem index="2-1">
          <template #title>
            <ElIcon><Clock /></ElIcon>
            <ElText>{{ $t("menuItem.exploreSubItem.recent") }}</ElText>
          </template>
        </ElMenuItem>
        <ElMenuItem index="2-2">
          <template #title>
            <ElIcon><Collection /></ElIcon>
            <ElText>{{ $t("menuItem.exploreSubItem.following") }}</ElText>
          </template>
        </ElMenuItem>
        <ElMenuItem index="2-3">
          <template #title>
            <ElIcon><Orange /></ElIcon>
            <ElText>{{ $t("menuItem.exploreSubItem.popular") }}</ElText>
          </template>
        </ElMenuItem>
        <ElMenuItem index="2-4">
          <template #title>
            <ElIcon><Star /></ElIcon>
            <ElText>{{ $t("menuItem.exploreSubItem.likes") }}</ElText>
          </template>
        </ElMenuItem>
      </ElSubMenu>
      <ElMenuItem index="search" @click="toSearch">
        <ElIcon><Search /></ElIcon>
        <template #title>
          <ElText class="hidden-xs-only" size="large">{{
            $t("menuItem.search")
          }}</ElText>
        </template>
      </ElMenuItem>
      <ElMenuItem index="upload">
        <ElIcon><Upload /></ElIcon>
        <template #title>
          <ElText class="hidden-xs-only" size="large">{{
            $t("action.upload")
          }}</ElText>
        </template>
      </ElMenuItem>
      <div class="flex-grow" />
      <ElMenuItem index="profile" @click="toProfile">
        <ProfileDiv />
      </ElMenuItem>
    </ElMenu>
  </ElHeader>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import ProfileDiv from "./ProfileDiv.vue";
import MainHomeDiv from "./MainHomeDiv.vue";
import router from "@/router";
import auth from "@/stores/auth";
// 图标定位控制
const currentView = computed(() => {
  var name = router.currentRoute.value.name;
  return name;
});

// 是否显示
const display = ref(true);
let scrollValue = 0;
window.addEventListener("scroll", () => {
  const offset = document.documentElement.scrollTop - scrollValue;
  if (offset > 5 && scrollValue > 600) display.value = false;
  else if (offset < -5) display.value = true;
  scrollValue = document.documentElement.scrollTop;
});

// routers
const toHome = () => router.push({ path: "/" });
const toSearch = () => router.push({ name: "search" });
const toProfile = () =>
  router.push({ path: "/" + auth.jwtDto.value?.username });
</script>

<style scoped lang="css">
.menu {
  padding: 0;
  width: 100%;
}

.flex-grow {
  flex-grow: 1;
}

.header {
  transition: 0.5s ease;
}

.invisible {
  pointer-events: none;
  opacity: 0;
}

div {
  background-color: #fff;
}

html.dark div {
  background-color: #000;
}
</style>
