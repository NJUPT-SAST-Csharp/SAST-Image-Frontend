<template>
  <div class="text">
    <CreateAlbumDialog />
    <UploadImageDialog />
    <CreateTopicDialog />
    <div style="display: flex">
      <AsideBar />
      <ElContainer>
        <HeaderBar id="header-bar" />
        <ElMain>
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <KeepAlive :max="10">
                <component :is="Component" :key="$route.path" />
              </KeepAlive>
            </Transition>
          </RouterView>
        </ElMain>
      </ElContainer>
      <ElBacktop :bottom="100" :visibility-height="600" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "./components/MenuBar/HeaderBar.vue";
import AsideBar from "./components/MenuBar/AsideBar.vue";
import useAuthStore from "./stores/auth";
import useProfileStore from "./stores/profile";
import CreateAlbumDialog from "./views/globalDialogs/CreateAlbumDialog.vue";
import UploadImageDialog from "./views/globalDialogs/UploadImageDialog.vue";
import CreateTopicDialog from "./views/globalDialogs/CreateTopicDialog.vue";

const auth = useAuthStore();
const profile = useProfileStore();

if (auth.isLoggedIn == false) {
  profile.setProfile(null);
  auth.setToken(null);
}
</script>

<style lang="css">
.el-main {
  padding: 0%;
  margin-left: 0;
}

.text {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
}

.el-container {
  height: 100%;
  width: 100%;
  padding: 0;
  top: 0;
}

.header-placeholder {
  display: flex;
  height: 60px;
}

@media screen and (max-width: 62rem) {
  .el-main {
    margin-top: 60px;
  }
}

#header-bar {
  position: fixed;
  top: 0;
  z-index: 400;
  width: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  box-shadow: var(--el-box-shadow-light);
}

#logo {
  height: 30px;
  margin: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
