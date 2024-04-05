<template>
  <div class="panel">
    <ElButton type="success" icon="Upload" @click="addImage">
      {{ $t("addNewImage") }}
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import useDialogStore from "@/stores/dialogs";

const dialogs = useDialogStore();
const addImage = () => {
  dialogs.openUploadImageDialog();
};
</script>

<style scoped lang="css">
.panel {
  display: flex;
  justify-content: flex-end;
  margin: 5px;
}
</style>
