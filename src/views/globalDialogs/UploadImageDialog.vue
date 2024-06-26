<template>
  <ElDialog
    class="text"
    append-to-body
    align-center
    draggable
    destroy-on-close
    v-model="dialogs.uploadImageDialogStatus"
  >
    <template #header>
      <ElText class="text" size="large">{{ $t("upload") }}</ElText>
    </template>
    <div>
      <ElUpload
        accept="image/avif,image/bmp,image/jpeg,image/tiff,image/webp,image/svg+xml,image/png,image/gif"
        action
        ref="uploadRef"
        :http-request="httpRequest"
        multiple
        list-type="picture-card"
        :auto-upload="false"
      >
        <ElIcon><Plus /></ElIcon>
      </ElUpload>
    </div>
    <ElButton @click="uploadRef.submit()">Submit</ElButton>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { i18n } from "../../locales/i18n";
import { type UploadRawFile, type UploadRequestOptions } from "element-plus";
import uploadImageApi from "../../network/apis/image/UploadImage";
import useAuthStore from "../../stores/auth";
import useDialogStore from "@/stores/dialogs";

const dialogs = useDialogStore();
const auth = useAuthStore();

const uploadRef = ref();

interface ImageData {
  imageFile: UploadRawFile;
  title: string;
  description: string;
  category_id: number;
  album_id: number;
  is_exif_enabled: boolean;
  tags: string[];
}

const httpRequest = async (options: UploadRequestOptions) => {
  var raw = options.file;
  const a = 12312n;
  var file: ImageData = {
    imageFile: raw,
    title: raw.uid.toString(),
    description: "",
    category_id: 0,
    album_id: 0,
    is_exif_enabled: false,
    tags: [""],
  };

  const response = await uploadImageApi(auth.username!, file);
  if (response.status < 300) {
    ElNotification.success({
      duration: 3000,
      message: i18n.global.t("uploadSuccess"),
    });
    options.onSuccess(response);
  } else {
    ElNotification.error({
      message: "Image " + file.title + " " + i18n.global.t("uploadFail"),
    });
    options.onError({
      name: file.title,
      status: response.status,
      method: "POST",
      url: "",
      message: response.data.title,
    });
  }
};
</script>

<style scoped>
.frame {
  width: 100%;
}
</style>
