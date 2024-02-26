<template>
  <div class="avatar">
    <ElUpload
      v-if="isEditable"
      ref="avatarRef"
      name="avatarFile"
      method="put"
      action="/api/account/user/avatar"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :before-upload="beforeUpload"
      :headers="uploadHeaders"
      :show-file-list="false"
    >
      <ElAvatar :size="120" fit="cover" :src="props.src" class="edit-block">
        <img src="../../assets/avatar.png" />
      </ElAvatar>
      <ElIcon :size="30" color="#409EFC" class="edit-icon">
        <Edit />
      </ElIcon>
    </ElUpload>
    <div v-else>
      <ElAvatar :size="120" fit="cover" :src="props.src">
        <img src="../assets/avatar.png" />
      </ElAvatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n";
import auth from "@/stores/auth";
import { ElMessage, type UploadProps } from "element-plus";

const props = defineProps<{ src: string | null; isEditable: boolean }>();
const emit = defineEmits(["updated"]);

const uploadHeaders = {
  Authorization: "Bearer " + auth.getToken(),
};

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error(i18n.global.t("avatarFileExceed"));
    return false;
  } else if (!rawFile.type.startsWith("image")) {
    ElMessage.error(i18n.global.t("imageFormatError"));
    return false;
  }
  return true;
};

const uploadSuccess = () => {
  ElMessage.success(i18n.global.t("profileView.edit.upload.success"));
  emit("updated");
};

const uploadFail = () =>
  ElMessage.error(i18n.global.t("profileView.edit.upload.fail"));
</script>

<style scoped lang="css">
.avatar {
  position: absolute;
  top: -60px;
  left: 20px;
  width: min-content;
}

.edit-block {
  transition: 0.5s;
}

.edit-block:hover {
  filter: brightness(0.7);
}

.edit-block:hover ~ .edit-icon {
  opacity: 1;
}

.edit-icon {
  opacity: 0;
  position: absolute;
  left: calc(50% - 15px);
  top: calc(50% - 15px);
  pointer-events: none;
  transition: 0.5s;
}
</style>
