<template>
  <div class="shadow">
    <ElTabs class="tabs">
      <ElTabPane
        class="el-tab"
        :label="i18n.global.t('profileView.tabs.images')"
        lazy
      >
        <ImageContainer />
      </ElTabPane>
      <ElTabPane :label="i18n.global.t('profileView.tabs.albums')" lazy>
        <UserAlbumListHeader v-if="auth.id == userId" />
        <UserAlbumListBody :userId="userId" />
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n";
import ImageContainer from "../ImageControl/ImageContainer.vue";
import UserAlbumListBody from "../UserAlbumList/UserAlbumListBody.vue";
import UserAlbumListHeader from "../UserAlbumList/UserAlbumListHeader.vue";
import useAuthStore from "@/stores/auth";

const props = defineProps<{ userId: number }>();
const auth = useAuthStore();
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
