<template>
  <el-dialog
    width="600px"
    align-center
    v-model="isDialogOpen"
    draggable
    destroy-on-close
    append-to-body
    :show-close="false"
  >
    <template #header>
      <div style="height: 20px">
        <el-text size="large" tag="b">{{
          $t("profileView.edit.profile")
        }}</el-text>
      </div>
    </template>
    <div class="image-upload">
      <el-upload
        ref="avatarRef"
        accept="image/avif,image/bmp,image/jpeg,image/tiff,image/webp,image/svg+xml,image/png,image/gif"
        name="avatarFile"
        method="put"
        action="/api/account/user/avatar"
        :on-success="uploadSuccess"
        :on-error="uploadFail"
        :auto-upload="false"
        :before-upload="beforeUpload"
        :headers="uploadHeaders"
        :show-file-list="false"
      >
        <el-button icon="User" plain type="primary">
          {{ $t("profileView.edit.avatar") }}
        </el-button>
      </el-upload>
    </div>
    <el-form label-position="top">
      <el-form-item :label="i18n.global.t('profileView.profileItems.nickname')">
        <el-input
          v-model="editContent.nickname"
          :maxlength="12"
          @keydown.enter.prevent
        />
      </el-form-item>
      <el-form-item
        :label="i18n.global.t('profileView.profileItems.biography')"
      >
        <el-input
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          v-model="editContent.biography"
          :maxlength="100"
        />
      </el-form-item>
      <el-form-item :label="i18n.global.t('profileView.profileItems.website')">
        <el-input
          v-model="editContent.website"
          :maxlength="40"
          @keydown.enter.prevent
        />
      </el-form-item>
      <el-form-item :label="i18n.global.t('profileView.profileItems.birthday')">
        <el-input
          v-model="editContent.birthday"
          :maxlength="40"
          @keydown.enter.prevent
        />
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="3">
        <el-button @click="save" plain type="primary">{{
          $t("action.save")
        }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="isDialogOpen = false" plain type="warning">{{
          $t("action.cancel")
        }}</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n";
import { computed, ref } from "vue";
import { ElMessage, type UploadProps } from "element-plus";
import auth from "@/stores/auth";
import updateProfile from "@/network/apis/profile/UpdateProfile";
import type { ProfileContent } from "@/stores/profile";

const props = defineProps<{ modelValue: boolean; content: ProfileContent }>();
const emit = defineEmits(["update:modelValue"]);

const isDialogOpen = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const editContent = ref({
  nickname: props.content.nickname,
  biography: props.content.biography,
  website: props.content.website,
  birthday: props.content.birthday,
});

const uploadHeaders = {
  Authorization: "Bearer " + auth.getToken(),
};

const save = async () => {
  const response = await updateProfile({
    nickname: editContent.value.nickname,
    biography: editContent.value.biography,
    website: editContent.value.website,
    birthday: editContent.value.birthday,
  });
  if (response.status < 300) {
    uploadSuccess();
    location.reload();
  } else {
    uploadFail();
  }
};

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.error(i18n.global.t("profileView.edit.upload.exceed"));
    return false;
  } else if (!rawFile.type.startsWith("image")) {
    ElMessage.error(i18n.global.t("profileView.edit.upload.formatError"));
    return false;
  }
  return true;
};

const uploadSuccess = () =>
  ElMessage.success(i18n.global.t("profileView.edit.upload.success"));

const uploadFail = () =>
  ElMessage.error(i18n.global.t("profileView.edit.upload.fail"));
</script>

<style scoped>
.image-upload {
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
  gap: 16px;
}
</style>
