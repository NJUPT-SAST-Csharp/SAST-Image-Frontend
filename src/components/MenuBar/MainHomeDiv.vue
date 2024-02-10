<template>
  <div id="logo-div" @click="router.push({ path: '/' })">
    <img src="/favicon.ico" height="36" id="brief-logo" />
    <img src="../../assets/logo.png" height="20" id="detailed-logo" />
  </div>
</template>

<script setup lang="ts">
import router from "@/router"
</script>

<style scoped lang="css">
#logo-div {
  display: flex;
}

@media (max-width: 48rem) {
  #detailed-logo {
    display: none;
  }
  #brief-logo {
    display: inline;
  }
}
@media (min-width: 48rem) {
  #detailed-logo {
    display: inline;
  }
  #brief-logo {
    display: none;
  }
}
</style>
