import { defineStore } from "pinia";
import { ref } from "vue";

const useDialogStore = defineStore("dialogs", () => {
  const uploadImageDialogStatus = ref(false);
  const createAlbumDialogStatus = ref(false);

  const openUploadImageDialog = () => (uploadImageDialogStatus.value = true);
  const openCreateAlbumDialog = () => (createAlbumDialogStatus.value = true);

  return {
    uploadImageDialogStatus,
    createAlbumDialogStatus,
    openUploadImageDialog,
    openCreateAlbumDialog,
  };
});

export default useDialogStore;
