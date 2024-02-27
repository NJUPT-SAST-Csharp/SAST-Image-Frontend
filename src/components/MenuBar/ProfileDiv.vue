<template>
  <div
    class="profile-div"
    :class="{ briefProfile: props.manual && props.collapse }"
  >
    <span id="avatar-span">
      <ElAvatar :src="profile.avatar" fit="cover">
        <img src="../../assets/avatar.png" width="40" height="40" />
      </ElAvatar>
    </span>
    <ElText
      id="username"
      :class="{ briefUsername: props.manual && props.collapse }"
      truncated
    >
      {{ profile.nickname ?? $t("loginView.login") }}
    </ElText>
  </div>
</template>

<script setup lang="ts">
import useProfileStore from "@/stores/profile";

const profile = useProfileStore();

// 是否展开
const props = defineProps({
  manual: { type: Boolean, required: false },
  collapse: { type: Boolean, required: false },
});
</script>

<style scoped>
#avatar-span {
  width: 40px;
  display: flex;
}

.profile-div {
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
  margin: auto;
}

#username {
  margin-left: auto;
  margin-right: auto;
  padding-left: 5px;
  padding-right: 10px;
}

@media (max-width: 48rem) {
  .profile-div {
    min-width: 40px;
    width: 0px;
    height: 36px;
  }
  #username {
    display: none;
  }
}

.briefProfile {
  min-width: 40px;
  height: 36px;
}

.briefUsername {
  display: none;
}
</style>
