<template>
  <div id="profile-div" @click="router.push(profileItemRouterPath)">
    <span id="avatar-span">
      <el-avatar :src="avatarSrc" fit="cover">
        <img src="../../assets/avatar.png" width="40" height="40" />
      </el-avatar>
    </span>
    <el-text id="username" truncated>
      {{ auth.isLoggedIn() ? auth.jwt()?.username : $t("loginView.login") }}
    </el-text>
  </div>
</template>

<script setup lang="ts">
import router from "@/router"
import auth from "@/stores/auth"
import getProfile from "@/network/apis/profile/GetProfile"
import { computed, onMounted, ref } from "vue"

const avatarSrc = ref("")
onMounted(async () => {
  if (auth.isLoggedIn()) {
    const content = await getProfile(auth.jwt()?.username!, false)
    if (content.status == 200) avatarSrc.value = content.data["avatar"]
  }
})

const profileItemRouterPath = computed(() => {
  if (auth.isLoggedIn()) return "/" + auth.jwt()?.username!
  else return "/login"
})
</script>

<style scoped>
#avatar-span {
  width: 40px;
  display: flex;
}

#profile-div {
  max-width: 200px;
  min-width: 100px;
  height: 36px;
  display: flex;
  float: left;
  border: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);
  border-radius: 20px;
  align-items: center;
  cursor: pointer;
}

#username {
  margin-left: auto;
  margin-right: auto;
  padding-left: 5px;
  padding-right: 10px;
}

@media (max-width: 48rem) {
  #profile-div {
    min-width: 40px;
    width: 0px;
    height: 36px;
  }
  #username {
    display: none;
  }
}
</style>
