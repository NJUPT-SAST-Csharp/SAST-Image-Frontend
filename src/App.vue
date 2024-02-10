<template>
  <el-container class="main-container">
    <el-aside v-if="media.isPC" width="100px"> Aside</el-aside>
    <el-header height="60px" v-else-if="display">
      <HeaderBar />
    </el-header>
    <el-main style="padding: 0%">
      <div id="placeholder">
        <img id="logo" src="./assets/logo.png" height="30" />
      </div>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue"
import media from "@/stores/media"
import HeaderBar from "./components/MenuBar/HeaderBar.vue"

const display = ref(true)
let scrollValue = 0
window.addEventListener("scroll", () => {
  const offset = document.documentElement.scrollTop - scrollValue
  if (offset > 5) display.value = false
  else if (offset < -5) display.value = true
  scrollValue = document.documentElement.scrollTop
})
</script>

<style scoped>
.main-container {
  font-family: Arial, Helvetica, sans-serif;
  height: 100%;
  width: 100%;
  padding: 0;
  top: 0;
}

.el-header {
  position: fixed;
  top: 0;
  z-index: 400;
  width: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  box-shadow: var(--el-box-shadow-light);
}

#placeholder {
  display: flex;
  height: 60px;
}

#logo {
  height: 30px;
  margin: auto;
}
</style>
