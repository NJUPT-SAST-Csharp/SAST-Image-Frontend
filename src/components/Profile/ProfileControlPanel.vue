<template>
  <div class="panel">
    <ElButton
      class="edit-button"
      icon="Edit"
      @click="isEditDialogOpen = !isEditDialogOpen"
    >
      {{ $t("profileView.edit.profile") }}
    </ElButton>
    <ElButton
      class="logout-button"
      icon="CircleCloseFilled"
      type="danger"
      @click="logout"
    >
      {{ $t("profileView.logout.description") }}
    </ElButton>
  </div>
  <ProfileEditDialog
    v-if="auth.username == content.username"
    v-model="isEditDialogOpen"
    :content="content"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useAuthStore from "@/stores/auth";
import useProfileStore, { type ProfileContent } from "@/stores/profile";
import router from "@/router";
import { ElMessage } from "element-plus";
import { i18n } from "@/locales/i18n";

defineProps<{ content: ProfileContent }>();

const auth = useAuthStore();
const profile = useProfileStore();
const isEditDialogOpen = ref(false);

const logout = () => {
  auth.setToken(null);
  profile.setProfile(null);
  router.push({ name: "login" });
  ElMessage.success(i18n.global.t("profileView.logout.success"));
};
</script>

<style scoped>
.panel {
  display: flex;
}

.edit-button {
  margin-top: 5%;
}

.logout-button {
  margin-top: 5%;
}
</style>
