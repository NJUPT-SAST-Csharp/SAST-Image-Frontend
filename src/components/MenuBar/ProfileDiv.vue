<template>
  <div class="profile-div" @click="router.push(profileItemRouterPath)">
    <el-avatar :src="avatarSrc" fit="cover">
      <img src="../../assets/avatar.png" />
    </el-avatar>
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
.profile-div {
  display: flex;
  border: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-lighter);
  border-radius: 20px;
  align-items: center;
  cursor: pointer;
}
@media (max-width: 48rem) {
  .profile-div {
    width: 40px;
    height: 36px;
  }
}

@media (min-width: 48rem) {
  .profile-div {
    width: 120px;
    height: 36px;
  }
}
</style>
