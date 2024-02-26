<template>
  <div class="edit-button">
    <div v-if="auth.jwtDto.value?.username == content.username">
      <ElButton
        class="button"
        icon="Edit"
        @click="isEditDialogOpen = !isEditDialogOpen"
      >
        {{ $t("profileView.edit.profile") }}
      </ElButton>
      <ElButton
        class="button"
        icon="CircleCloseFilled"
        type="danger"
        @click="logout"
      >
        {{ $t("profileView.logout.description") }}
      </ElButton>
    </div>
    <ProfileEditDialog
      v-if="auth.jwtDto.value?.username == content.username"
      v-model="isEditDialogOpen"
      :content="content"
    />
  </div>
  <div class="text">
    <ElSpace direction="vertical" alignment="normal" wrap size="large">
      <ElSpace direction="vertical" alignment="normal" wrap>
        <ElText size="large" tag="b">{{ content.nickname }} </ElText>
        <ElText>{{ "@" + content.username }} </ElText>
      </ElSpace>
      <ElText v-if="content.biography">{{ content.biography }}</ElText>
      <span v-if="content.website && content.website.trim() != ''">
        <ElIcon><Position /></ElIcon><ElText>{{ content.website }} </ElText>
      </span>
    </ElSpace>
  </div>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n";
import { ref } from "vue";
import ProfileEditDialog from "@/components/Profile/ProfileEditDialog.vue";
import auth from "@/stores/auth";
import router from "@/router";
import { ElMessage } from "element-plus";
import type { ProfileContent } from "@/stores/profile";

defineProps<{ content: ProfileContent }>();

const isEditDialogOpen = ref(false);

const logout = () => {
  auth.setToken(null);
  router.push({ name: "login" });
  ElMessage.success(i18n.global.t("profileView.logout.success"));
};
</script>

<style scoped>
.button {
  margin-top: 10%;
}

.edit-button {
  align-items: center;
  height: 60px;
  margin-left: auto;
  margin-right: 20px;
  padding-top: 20px;
  width: min-content;
}

.text {
  margin-bottom: 50px;
  margin-left: 30px;
  width: 40%;
}
.el-text--large {
  font-size: 24px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
