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
      class="side-menu"
      :default-active="activeIndex"
      :collapse="collapsed"
      :ellipsis="false"
      :collapse-transition="false"
      unique-opened
      close-on-click-outside
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

      <MenuItemGroup />

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
import MenuItemGroup from "./MenuItemGroup.vue";

const auth = useAuthStore();

const collapsed = ref(true);
const width = ref<number>(64);
const activeIndex = ref(router.currentRoute.value.name?.toString());

watch(collapsed, (newVal) => {
  setTimeout(() => {
    width.value = newVal ? 65 : 180;
  }, 0);
});
// routers
const toHome = () => router.push({ path: "/" });
const toProfile = () => router.push({ path: "/" + auth.username });
</script>

<style scoped lang="css">
#menu-div {
  position: fixed;
  display: flex;
  overflow: hidden;
  height: 100%;
  box-shadow: var(--el-box-shadow-lighter);

  transition: 0.75s;
}

.side-menu {
  transition: 0.75s;
}

.placeholder {
  margin-top: auto;
  height: 100px;
  bottom: 0;
  transition: 0.75s;
}

@media screen and (max-width: 62rem) {
  #menu-div {
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
