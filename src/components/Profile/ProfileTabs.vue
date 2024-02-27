<template>
  <div class="shadow">
    <ElTabs class="tabs">
      <ElTabPane
        class="el-tab"
        :label="i18n.global.t('profileView.tabs.images')"
      >
        <ImageContainer />
      </ElTabPane>
      <ElTabPane :label="i18n.global.t('profileView.tabs.albums')" lazy
        >Albums
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n";
import ImageContainer from "../ImageControl/ImageContainer.vue";
</script>

<style scoped>
.tabs {
  height: calc(100vh);
  padding: 30px;
}

.shadow {
  box-shadow: var(--el-box-shadow-lighter);
}
</style>
