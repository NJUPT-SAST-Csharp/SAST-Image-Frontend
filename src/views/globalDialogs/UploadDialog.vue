<template>
  <ElDialog
    append-to-body
    align-center
    draggable
    destroy-on-close
    width="664px"
    v-model="value"
  >
    <template #header>
      <ElText size="large">{{ $t("action.upload") }}</ElText>
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
import { computed, ref } from "vue";
import { i18n } from "../../locales/i18n";
import { type UploadRawFile, type UploadRequestOptions } from "element-plus";
import uploadImageApi from "../../network/apis/image/UploadImage";
import useAuthStore from "../../stores/auth";

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
  var file: ImageData = {
    imageFile: raw,
    title: raw.uid.toString(),
    description: "",
    category_id: 1,
    album_id: 0,
    is_exif_enabled: false,
    tags: [""],
  };

  const response = await uploadImageApi(auth.username!, file);
  if (response.status < 300) {
    ElNotification.success({
      duration: 3000,
      message: i18n.global.t("uploadView.success"),
    });
    options.onSuccess(response);
  } else {
    ElNotification.error({
      message: "Image " + file.title + " " + i18n.global.t("uploadView.fail"),
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

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style scoped>
.frame {
  width: 100%;
}
</style>
