<template>
  <ElDialog
    v-model="dialogs.createAlbumDialogStatus"
    append-to-body
    align-center
    draggable
    destroy-on-close
  >
  </ElDialog>
</template>

<script setup lang="ts">
import useDialogStore from "@/stores/dialogs";

const dialogs = useDialogStore();
</script>

<style lang="css" scoped></style>
