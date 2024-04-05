<template>
  <div class="container">
    <div class="search-box">
      <ElIcon><Search /></ElIcon>
      <input type="text" :placeholder="$t('search')" />
    </div>
    <div class="create-button" v-if="auth.isLoggedIn">
      <ElButton round type="primary" @click="dialogs.openCreateTopicDialog">
        <ElIcon><Edit /></ElIcon>
        <ElText
          size="small"
          style="color: aliceblue"
          class="hidden-sm-and-down"
        >
          {{ $t("createTopic") }}
        </ElText>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDialogsStore from "@/stores/dialogs";
import useAuthStore from "@/stores/auth";

const auth = useAuthStore();
const dialogs = useDialogsStore();
</script>

<style lang="css" scoped>
/* 内容容器 */
.container {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 5%;
  margin-left: 5%;
  min-width: 60%;
  max-width: 90%;
  display: flex;
  gap: 5%;
}

.create-button {
  margin: auto;
  margin-left: 0;
}

.search-box {
  display: flex;
  flex: 1;
  width: auto;
  align-items: center;
  padding-left: 20px;
  font-size: 16px;
  min-width: 240px;
  max-width: 500px;
  height: 48px;
  border: 0.1ch solid rgba(200, 200, 200, 0.2);
  border-radius: 15px;
  transition: all 0.3s;
}

.search-box img {
  width: 20px;
  height: 20px;
}

.search-box input {
  border: none;
  outline: none;
  width: 90%;
  margin-left: 10px;
}
.search-box:hover {
  border: 0.1ch solid rgba(200, 200, 200, 1);
  box-shadow: var(--el-box-shadow-lighter);
}
</style>
