<template>
  <el-tabs>
    <el-tab-pane class="el-tab" :label="i18n.global.t('profileView.tabs.images')"
      ><ImageContainer
    /></el-tab-pane>
    <el-tab-pane :label="i18n.global.t('profileView.tabs.albums')" lazy>Albums</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n"
import ImageContainer from "../ImageControl/ImageContainer.vue"
</script>

<style scoped>
.el-tabs {
  height: calc(100vh);
  padding: 30px;
}
</style>
