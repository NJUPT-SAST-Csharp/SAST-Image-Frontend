<template>
  <div style="display: flex">
    <AsideBar />
    <ElContainer>
      <HeaderBar id="header-bar" />
      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "./components/MenuBar/HeaderBar.vue";
import AsideBar from "./components/MenuBar/AsideBar.vue";
</script>

<style scoped>
.el-main {
  padding: 0%;
  margin-left: 0;
}

.el-container {
  font-family: Arial, Helvetica, sans-serif;
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
</style>
