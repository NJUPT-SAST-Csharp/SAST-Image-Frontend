<template>
  <ElDialog v-model="dialogs.createAlbumDialogStatus"> </ElDialog>
</template>

<script setup lang="ts">
import useDialogStore from "@/stores/dialogs";

const dialogs = useDialogStore();
</script>

<style lang="css" scoped></style>
@/stores/dialogs
