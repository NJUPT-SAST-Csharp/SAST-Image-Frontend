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

      <MenuItemGroup />

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
import useAuthStore from "@/stores/auth";
import MenuItemGroup from "./MenuItemGroup.vue";

const auth = useAuthStore();

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
const toProfile = () => router.push({ path: "/@" + auth.username });
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
