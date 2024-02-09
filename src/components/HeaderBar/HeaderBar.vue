<template>
  <el-header>
    <el-row>
      <el-col>
        <el-menu :default-active="currentView" mode="horizontal">
          <el-menu-item index="1" id="logo-item">
            <div id="logo-div" @click="router.push({ path: '/' })">
              <img src="/favicon.ico" height="30" />
            </div>
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
          <el-menu-item index="search" @click="router.push({ name: 'search' })">
            <el-icon><Search /></el-icon>
            <template #title>
              <el-text size="large">{{ $t("menuItem.search") }}</el-text>
            </template>
          </el-menu-item>
          <el-menu-item index="upload" @click="isUpload = true">
            <el-icon><Upload /></el-icon>
            <template #title>
              <el-text size="large">{{ $t("action.upload") }}</el-text>
            </template>
          </el-menu-item>
          <el-menu-item id="profile-item" index="profile">
            <div id="profile-div">
              <ProfileDiv style="margin: auto" />
            </div>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
  <div style="height: 60px"></div>
  <UploadDialog v-model="isUpload" />
</template>

<script lang="ts" setup>
import { useDark } from "@vueuse/core"
import { computed, ref } from "vue"
import { i18n } from "@/locales/i18n"
import ProfileDiv from "./ProfileDiv.vue"
import UploadDialog from "../UploadDialog.vue"
import router from "@/router"
import auth from "@/stores/auth"

const isDark = useDark()
const toggleLights = () => {
  isDark.value = !isDark.value
}

// 图标定位控制
const currentView = computed(() => {
  var name = router.currentRoute.value.name
  return name
})

const isUpload = ref(false)
</script>

<style scoped lang="css">
.el-header {
  position: fixed;
  top: 0;
  z-index: 400;
  width: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  box-shadow: var(--el-box-shadow-light);
}
.el-col {
  width: 100%;
  align-items: center;
}
.el-row {
  height: 100%;
  width: 100%;
  align-items: center;
}

.el-menu-item {
  padding-left: 5px;
  padding-right: 10px;
}

.el-sub-menu__title {
  padding-right: 0px;
}

#logo-item {
  padding: 0;
}

#logo-div {
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#profile-item {
  padding: 0;
  margin-left: auto;
}

#profile-div {
  width: 60px;

  display: flex;
  height: 100%;
}

div {
  background-color: #fff;
}

html.dark div {
  background-color: #000;
}
</style>
