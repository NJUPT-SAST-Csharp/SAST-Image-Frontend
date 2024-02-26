<template>
  <div>
    <ProfileHeader
      :src="content?.header ?? null"
      :isEditable="isEditable"
      @updated="content!.header = content!.header"
    />
    <div class="main-frame">
      <ProfileAvatar :src="content?.avatar!" :isEditable="isEditable" />
      <ProfileInfo v-if="content" :content="content" />
    </div>
    <ProfileTabs />
  </div>
</template>

<script lang="ts" setup>
import ProfileAvatar from "@/components/Profile/ProfileAvatar.vue"
import ProfileHeader from "@/components/Profile/ProfileHeader.vue"
import ProfileInfo from "@/components/Profile/ProfileInfo.vue"
import ProfileTabs from "@/components/Profile/ProfileTabs.vue"
import getProfile from "@/network/apis/profile/GetProfile"
import auth from "@/stores/auth"
import profile, { type ProfileContent } from "@/stores/profile"
import { onMounted, ref } from "vue"

const props = defineProps<{ username: string }>()

const content = ref<ProfileContent | null>(null)

const isEditable = ref<boolean>(false)

onMounted(async () => {
  content.value = (await getProfile(props.username, true).then((t) => t.data)) as ProfileContent
  if (content.value.username == auth.jwtDto.value?.username) {
    profile.setProfile(content.value)
    isEditable.value = true
  }
})
</script>

<style scoped lang="css">
.main-frame {
  position: relative;
  height: 240px;
  box-shadow: var(--el-box-shadow-lighter);
}
</style>
