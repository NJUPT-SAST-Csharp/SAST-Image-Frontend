<template>
  <el-dialog
    width="600px"
    align-center
    v-model="value"
    draggable
    destroy-on-close
    append-to-body
    :show-close="false"
  >
    <template #header>
      <el-text size="large" tag="b">{{ $t("profileView.edit.profile") }}</el-text>
    </template>
    <div class="image-upload">
      <el-row>
        <el-col :span="6">
          <el-upload
            accept="image/avif,image/bmp,image/jpeg,image/tiff,image/webp,image/svg+xml,image/png,image/gif"
            name="avatar"
            action="/api/Profile/Avatar"
            :on-success="uploadSuccess"
            :on-error="uploadFail"
            :before-upload="beforeUpload"
            :headers="uploadHeaders"
            :show-file-list="false"
          >
            <el-button icon="User" plain type="primary">
              {{ $t("profileView.edit.avatar") }}
            </el-button>
          </el-upload>
        </el-col>
        <el-col :span="6">
          <el-upload
            name="header"
            action="/api/Profile/Header"
            :on-success="uploadSuccess"
            :on-error="uploadFail"
            :before-upload="beforeUpload"
            :headers="uploadHeaders"
            :show-file-list="false"
          >
            <el-button icon="Picture" plain type="primary">
              {{ $t("profileView.edit.header") }}
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <el-form label-position="top">
      <el-form-item :label="i18n.global.t('profileView.profileItems.nickname')">
        <el-input v-model="editContent.nickname" :maxlength="12" @keydown.enter.prevent />
      </el-form-item>
      <el-form-item :label="i18n.global.t('profileView.profileItems.biography')">
        <el-input
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          v-model="editContent.biography"
          :maxlength="100"
        />
      </el-form-item>
      <el-form-item :label="i18n.global.t('profileView.profileItems.website')">
        <el-input v-model="editContent.website" :maxlength="40" @keydown.enter.prevent />
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="3">
        <el-button @click="save" plain type="primary">{{ $t("action.save") }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="value = false" plain type="warning">{{ $t("action.cancel") }}</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup lang="ts">
import { type ProfileContent } from "@/views/ProfileView.vue"
import { i18n } from "@/locales/i18n"
import { computed, ref } from "vue"
import { ElMessage, type UploadProps } from "element-plus"
import auth from "@/stores/auth"
import updateProfile from "@/network/apis/profile/UpdateProfile"
import router from "@/router"

const props = defineProps<{ modelValue: boolean; content: ProfileContent }>()
const emit = defineEmits(["update:modelValue"])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  }
})
const editContent = ref({
  nickname: props.content.nickname,
  biography: props.content.biography,
  website: props.content.website
})

const uploadHeaders = {
  Authorization: "Bearer " + auth.token()
}

const save = async () => {
  if (
    editContent.value.nickname == props.content.nickname &&
    editContent.value.biography == props.content.biography &&
    editContent.value.website == props.content.website
  ) {
    value.value = false
    return
  }
  const response = await updateProfile(
    editContent.value.nickname,
    editContent.value.biography,
    editContent.value.website
  )
  if (response.status < 300) {
    uploadSuccess()
    location.reload()
  } else uploadFail()
}

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.error(i18n.global.t("profileView.edit.upload.exceed"))
    return false
  } else if (!rawFile.type.startsWith("image")) {
    ElMessage.error(i18n.global.t("profileView.edit.upload.formatError"))
    return false
  }
  return true
}

const uploadSuccess = () => ElMessage.success(i18n.global.t("profileView.edit.upload.success"))

const uploadFail = () => ElMessage.error(i18n.global.t("profileView.edit.upload.fail"))
</script>

<style scoped>
.image-upload {
  margin-top: -20px;
  width: 100%;
  height: 50px;
}
</style>
