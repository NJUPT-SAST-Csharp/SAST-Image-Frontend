<template>
  <div class="panel">
    <ProfileControlPanel
      v-if="auth.username == content.username"
      :content="content"
    />
  </div>
  <div class="text">
    <ElSpace direction="vertical" alignment="normal" wrap size="large">
      <ElSpace direction="vertical" alignment="normal" wrap>
        <ElText size="large" tag="b">{{ content.nickname }} </ElText>
        <ElText>{{ "@" + content.username }} </ElText>
      </ElSpace>
      <ElText v-if="content.biography">{{ content.biography }}</ElText>
      <span v-if="content.website && content.website.trim() != ''">
        <ElIcon><Position /></ElIcon><ElText>{{ content.website }} </ElText>
      </span>
    </ElSpace>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from "@/stores/auth";
import ProfileControlPanel from "./ProfileControlPanel.vue";
import type { ProfileContent } from "@/stores/profile";

const auth = useAuthStore();

defineProps<{ content: ProfileContent }>();
</script>

<style scoped>
.panel {
  align-items: center;
  height: 60px;
  margin-left: auto;
  margin-right: 20px;
  padding-top: 20px;
  width: min-content;
}

.text {
  margin-bottom: 50px;
  margin-left: 30px;
  width: 40%;
}
.el-text--large {
  font-size: 24px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
