<template>
  <ElDialog
    class="text"
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
        <ElText size="large" tag="b">{{
          $t("profileView.edit.profile")
        }}</ElText>
      </div>
    </template>
    <ElForm label-position="top">
      <ElFormItem :label="i18n.global.t('profileView.profileItems.nickname')">
        <ElInput
          v-model="editContent.nickname"
          :maxlength="12"
          @keydown.enter.prevent
        />
      </ElFormItem>
      <ElFormItem :label="i18n.global.t('profileView.profileItems.biography')">
        <ElInput
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          v-model="editContent.biography"
          :maxlength="100"
        />
      </ElFormItem>
      <ElFormItem :label="i18n.global.t('profileView.profileItems.website')">
        <ElInput
          v-model="editContent.website"
          :maxlength="40"
          @keydown.enter.prevent
        />
      </ElFormItem>
      <ElFormItem :label="i18n.global.t('profileView.profileItems.birthday')">
        <ElInput
          v-model="editContent.birthday"
          :maxlength="40"
          @keydown.enter.prevent
        />
      </ElFormItem>
    </ElForm>
    <ElRow>
      <ElCol :span="3">
        <ElButton @click="save" plain type="primary">{{
          $t("action.save")
        }}</ElButton>
      </ElCol>
      <ElCol :span="3">
        <ElButton @click="isDialogOpen = false" plain type="warning">{{
          $t("action.cancel")
        }}</ElButton>
      </ElCol>
    </ElRow>
  </ElDialog>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n";
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
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
