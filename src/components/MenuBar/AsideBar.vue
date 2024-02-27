<template>
  <div
    class="placeholder hidden-sm-and-down"
    :style="{ 'min-width': width + 'px' }"
  />
  <div
    id="menu-div"
    class="hidden-sm-and-down"
    :style="{ width: width + 'px' }"
  >
    <ElMenu
      class="menu"
      :default-active="currentView"
      :collapse="collapsed"
      :ellipsis="false"
      :collapse-transition="false"
      unique-opened
      close-on-click-outside
      :style="{ 'min-width': width + 'px' }"
    >
      <ElMenuItem
        index="switch"
        style="padding: 0%"
        @click="collapsed = !collapsed"
      >
        <MainHomeDiv manual :collapse="collapsed" />
      </ElMenuItem>
      <ElMenuItem index="home" @click="toHome">
        <ElIcon><House /></ElIcon>
        <template #title>
          <ElText size="large">{{ $t("menuItem.home") }}</ElText>
        </template>
      </ElMenuItem>
      <ElSubMenu index="explore">
        <template #title>
          <ElIcon><Guide /></ElIcon>
          <ElText size="large">{{ $t("menuItem.explore") }}</ElText>
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
          <ElText size="large">{{ $t("menuItem.search") }}</ElText>
        </template>
      </ElMenuItem>
      <ElMenuItem index="upload">
        <ElIcon><Upload /></ElIcon>
        <template #title>
          <ElText size="large">{{ $t("action.upload") }}</ElText>
        </template>
      </ElMenuItem>
      <ElMenuItem index="profile" style="padding: 0%" @click="toProfile">
        <ProfileDiv manual :collapse="collapsed" />
      </ElMenuItem>
      <li class="placeholder" :style="{ 'min-width': width + 'px' }"></li>
    </ElMenu>
  </div>
</template>

<script setup lang="ts">
import ProfileDiv from "./ProfileDiv.vue";
import MainHomeDiv from "./MainHomeDiv.vue";
import router from "@/router";
import { computed, ref, watch } from "vue";
import useAuthStore from "@/stores/auth";
import "element-plus/theme-chalk/display.css";

const auth = useAuthStore();

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
const toProfile = () => router.push({ path: "/" + auth.username });
</script>

<style scoped lang="css">
#menu-div {
  position: fixed;
  height: 100%;
  display: flex;
  overflow: hidden;
  transition:
    width 1s ease,
    min-width 1s ease;
}

.menu {
  transition: min-width 0.75s;
}

.placeholder {
  transition: min-width 0.75s;
  height: 100%;
}

@media screen and (max-width: 62rem) {
  #menu-div {
    display: none;
  }
}
</style>
