import { defineStore } from "pinia";
import { ref } from "vue";

const useDialogStore = defineStore("dialogs", () => {
  const uploadImageDialogStatus = ref(false);
  const createAlbumDialogStatus = ref(false);
  const createTopicDialogStatus = ref(false);

  const openUploadImageDialog = () => (uploadImageDialogStatus.value = true);
  const openCreateAlbumDialog = () => (createAlbumDialogStatus.value = true);
  const openCreateTopicDialog = () => (createTopicDialogStatus.value = true);

  return {
    uploadImageDialogStatus,
    createAlbumDialogStatus,
    createTopicDialogStatus,
    openUploadImageDialog,
    openCreateAlbumDialog,
    openCreateTopicDialog,
  };
});

export default useDialogStore;
