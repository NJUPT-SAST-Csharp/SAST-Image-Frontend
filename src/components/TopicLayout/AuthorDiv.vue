<template>
  <div class="profile-div" @click="$router.push('/@' + profile?.username)">
    <span class="avatar-span">
      <ElAvatar :src="profile?.avatar" fit="cover">
        <img src="../../assets/avatar.png" width="40" height="40" />
      </ElAvatar>
    </span>
    <ElText class="username" truncated>
      {{ profile?.nickname }}
    </ElText>
  </div>
</template>

<script setup lang="ts">
import getProfile from "@/network/apis/profile/GetProfile";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const props = defineProps<{ id: bigint }>();

const profile = ref<BriefInfo | null>(null);

interface BriefInfo {
  avatar: string;
  username: string;
  nickname: string;
}

onMounted(async () => {
  const result: {
    data: BriefInfo;
    status: number;
  } = await getProfile(props.id);

  if (result.status > 300) ElMessage.error("Failed to fetch profile data");
  else profile.value = result.data;
});
</script>

<style scoped lang="css">
.profile-div {
  max-width: 200px;
  min-width: 100px;
  margin-left: 10px;
  height: 36px;
  display: flex;
  border: 1px solid var(--el-border-color);
  border-radius: 20px;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}

.profile-div:hover {
  box-shadow: var(--el-box-shadow-lighter);
}

.avatar-span {
  width: 40px;
  display: flex;
}

.username {
  margin-left: auto;
  margin-right: auto;
  padding-left: 5px;
  padding-right: 10px;
}
</style>
