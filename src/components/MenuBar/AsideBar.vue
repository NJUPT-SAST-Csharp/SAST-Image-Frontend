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
      :default-active="activeIndex"
      :collapse="collapsed"
      :ellipsis="false"
      :collapse-transition="false"
      unique-opened
      close-on-click-outside
      @select="menuEvent"
      :style="{ 'min-width': width + 'px' }"
    >
      <ElMenuItem
        index="home"
        style="padding: 0%; display: flex"
        @click="toHome"
      >
        <MainHomeDiv manual :collapse="collapsed" />
      </ElMenuItem>
      <ElMenuItem index="switch" @click="collapsed = !collapsed">
        <ElIcon v-if="collapsed"><Expand /></ElIcon>
        <ElIcon v-else><Fold /></ElIcon>
        <template #title>
          <ElText size="large">{{ $t("collapse") }}</ElText>
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
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu, ElText } from "element-plus";

const auth = useAuthStore();

const collapsed = ref(true);
const width = ref<number>(64);
const activeIndex = ref(router.currentRoute.value.name?.toString());

watch(collapsed, (newVal) => {
  setTimeout(() => {
    width.value = newVal ? 65 : 180;
  }, 0);
});

const menuEvent = () => {
  const newVal = router.currentRoute.value.name?.toString() ?? null;
  setTimeout(() => {
    activeIndex.value = "";
    setTimeout(() => {
      activeIndex.value = newVal;
    }, 0);
  }, 0);
};

// routers
const toHome = () => router.push({ path: "/" });
const toSearch = () => router.push({ name: "search" });
const toProfile = () => router.push({ path: "/" + auth.username });
</script>

<style scoped lang="css">
#menu-div {
  position: fixed;
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
  margin-top: auto; /* 将最后一个 li 的上外边距设为 auto，使其在垂直方向上占据剩余空间 */
  height: 100px; /* 限制最后一个 li 的高度为100px */
  bottom: 0;
  transition: min-width 0.75s;
}

@media screen and (max-width: 62rem) {
  #menu-div {
    display: none;
  }
}
</style>
