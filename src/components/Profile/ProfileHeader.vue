<template>
  <div class="header-frame">
    <ElSkeleton style="height: 240px" animated :throttle="500" v-if="isLoading">
      <template #template>
        <ElSkeletonItem variant="image" style="height: 240px" />
      </template>
    </ElSkeleton>
    <ElImage
      :style="{
        width: 100 + '%',
        height: isEmpty ? 80 + 'px' : 50 + 'vh',
        display: isLoading ? 'none' : 'block',
      }"
      :src="props.src + '?' + refreshHook"
      fit="cover"
      @error="loadFail"
      @load="loadSuccess"
    >
      <template #error>
        <div></div>
      </template>
    </ElImage>
    <ElUpload
      ref="headerRef"
      class="edit-block"
      name="headerFile"
      method="put"
      action="/api/profile/header"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :before-upload="beforeUpload"
      :headers="uploadHeaders"
      :show-file-list="false"
    >
      <div class="edit-button" v-if="props.isEditable">
        {{ $t("updateHeader") }}
      </div>
    </ElUpload>
  </div>
</template>

<script setup lang="ts">
import App from "@/App.vue";
import { i18n } from "@/locales/i18n";
import { type UploadProps, type UploadInstance, ElMessage } from "element-plus";
import { ref } from "vue";
import useAuthStore from "@/stores/auth";

const auth = useAuthStore();

const props = defineProps<{ src: string | null; isEditable: boolean }>();
const emit = defineEmits(["updated"]);

const isLoading = ref(true);
const isEmpty = ref(false);
const refreshHook = ref<number>(Date.now());

const loadFail = () => {
  isLoading.value = false;
  isEmpty.value = true;
};

const loadSuccess = () => {
  isLoading.value = false;
  isEmpty.value = false;
};

const headerRef = ref<UploadInstance>();

const uploadHeaders = {
  Authorization: "Bearer " + auth.getToken(),
};

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error(i18n.global.t("headerFileExceed"));
    return false;
  } else if (!rawFile.type.startsWith("image")) {
    ElMessage.error(i18n.global.t("imageFormatError"));
    return false;
  }
  return true;
};

const uploadSuccess = () => {
  ElMessage.success(i18n.global.t("uploadSuccess"));
  emit("updated");
  refreshHook.value = Date.now();
};

const uploadFail = () => ElMessage.error(i18n.global.t("uploadFail"));
</script>

<style scoped>
.header-frame {
  width: 100%;
  min-height: 80px;
  position: relative;
}

.edit-block {
  position: absolute;
  right: 80px;
  bottom: 30px;
}

.edit-button {
  font-size: small;
  white-space: nowrap;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 0, 0, 0);
  border-radius: 5px;
  color: #f1f1f1;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: 0.5s ease;
}

.edit-button:hover {
  background: rgba(0, 0, 0, 0.6);
}
</style>
