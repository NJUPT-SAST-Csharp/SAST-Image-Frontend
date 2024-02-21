<template>
  <div>
    <ProfileHeader v-if="content" :headerSrc="content.header" />
    <ProfileMain v-if="content" :content="content" />
    <ProfileTabs />
  </div>
</template>

<script lang="ts" setup>
import ProfileHeader from "@/components/Profile/ProfileHeader.vue"
import ProfileMain from "@/components/Profile/ProfileMain.vue"
import ProfileTabs from "@/components/Profile/ProfileTabs.vue"
import getProfile from "@/network/apis/profile/GetProfile"
import auth from "@/stores/auth"
import profile, { type ProfileDto } from "@/stores/profile"
import { onMounted, ref } from "vue"
import { onBeforeRouteUpdate } from "vue-router"

const props = defineProps<{ username: string }>()

const content = ref<ProfileContent>()

export interface ProfileContent {
  username: string
  nickname: string
  biography: string
  avatar: string | null
  header: string | null
  website: string | null
  birthday: string | null
}

onMounted(async () => {
  const response = await getProfile(props.username, true)
  content.value = response.data as ProfileContent
})

onBeforeRouteUpdate(async (to, from) => {
  // 当 username 更改时获取用户
  if (to.params.username !== from.params.username) {
    console.log(to.params.username)
    const response = await getProfile(to.params.username as string, true)
    if (response.status < 300) content.value = response.data as ProfileContent
  }
})
</script>

<style>
.avatar {
  width: min-content;
  position: absolute;
  top: 250px;
  left: 20px;
}
</style>
