<template>
  <div class="panel">
    <ElButton type="success" icon="Upload" @click="createAlbum">
      {{ $t("createNewAlbum") }}
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import useDialogStore from "@/stores/dialogs";

const dialogs = useDialogStore();
const createAlbum = () => {
  dialogs.openCreateAlbumDialog();
};
</script>

<style scoped lang="css">
.panel {
  display: flex;
  justify-content: flex-end;
}
</style>
