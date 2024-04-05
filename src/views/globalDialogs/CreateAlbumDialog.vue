<template>
  <ElDialog
    class="dialog text"
    v-model="dialogs.createAlbumDialogStatus"
    append-to-body
    align-center
    :close-on-click-modal="false"
    draggable
    destroy-on-close
  >
    <ElFormItem label="Title">
      <ElInput v-model="newAlbum.title" class="input" />
    </ElFormItem>
    <ElFormItem label="Category">
      <ElInput v-model="newAlbum.categoryId" class="input" />
    </ElFormItem>
    <ElFormItem>
      <el-select
        v-model="newAlbum.accessibility"
        placeholder="Accessibility"
        style="width: 240px"
      >
        <el-option
          class="text"
          v-for="item in accessibilities"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </ElFormItem>
    <ElFormItem label="Description">
      <ElInput
        autosize
        type="textarea"
        v-model="newAlbum.description"
        class="input"
      />
    </ElFormItem>
    <template #header>
      <ElText size="large" class="text">{{ $t("createNewAlbum") }}</ElText>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n";
import type { CreateAlbumRequest } from "@/network/apis/album/CreateAlbum";
import useDialogStore from "@/stores/dialogs";
import { ref } from "vue";
const dialogs = useDialogStore();

const accessibilities = [
  { label: i18n.global.t("public"), value: 0 },
  { label: i18n.global.t("auth"), value: 1 },
  { label: i18n.global.t("private"), value: 2 },
];

const newAlbum = ref<CreateAlbumRequest>({
  title: "",
  description: "",
  categoryId: 0,
  accessibility: 0,
});
</script>

<style lang="css" scoped>
.input {
  align-self: flex-end;
  width: 70%;
  padding: 0;
  margin-left: auto;
}

.dialog .el-input {
  max-width: 300px;
}
</style>
