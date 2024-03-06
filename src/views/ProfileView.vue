<template>
  <div>
    <ProfileHeader
      :src="content?.header ?? ''"
      :isEditable="isEditable"
      @updated="fetchData"
    />
    <div class="main-frame">
      <ProfileAvatar
        :src="content?.avatar ?? null"
        :isEditable="isEditable"
        @updated="fetchData"
      />
      <ProfileInfo v-if="content" :content="content" />
    </div>
    <ProfileTabs />
  </div>
</template>

<script lang="ts" setup>
import ProfileAvatar from "@/components/Profile/ProfileAvatar.vue";
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";
import ProfileInfo from "@/components/Profile/ProfileInfo.vue";
import ProfileTabs from "@/components/Profile/ProfileTabs.vue";
import getProfile from "@/network/apis/profile/GetProfile";
import useAuthStore from "@/stores/auth";
import useProfileStore, { type ProfileContent } from "@/stores/profile";
import { ElBacktop } from "element-plus";
import { onMounted, ref } from "vue";

const profile = useProfileStore();
const auth = useAuthStore();

const props = defineProps<{ username: string }>();

const content = ref<ProfileContent | null>(null);
const isEditable = ref<boolean>(false);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  const result = await getProfile(props.username, true);
  content.value = result.data;
  if (content.value?.username == auth.username) {
    profile.setProfile(content.value);
    isEditable.value = true;
  }
};
</script>

<style scoped lang="css">
.main-frame {
  position: relative;
  height: 240px;
}
</style>
