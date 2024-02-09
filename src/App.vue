<script setup lang="ts">
import HeaderBar from "./components/HeaderBar/HeaderBar.vue"
</script>

<template>
  <el-container class="main-container" direction="vertical">
    <div class="header-container">
      <HeaderBar />
    </div>
    <el-main style="padding: 0%">
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.main-container {
  font-family: Arial, Helvetica, sans-serif;
  height: 100%;
  width: 100%;
  padding: 0;
  top: 0;
}

.header-container{
  display: flex;
  height: 60px;
}
</style>
