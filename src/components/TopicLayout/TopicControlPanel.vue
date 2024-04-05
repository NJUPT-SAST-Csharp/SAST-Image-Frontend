<template>
  <AddColumnDialog v-model="dialog" :topic="topic.topicId" />
  <div v-if="auth.isLoggedIn" class="container">
    <ElButton type="primary" @click="dialog = !dialog">
      {{ $t("reply") }}
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from "@/stores/auth";
import AddColumnDialog from "./AddColumnDialog.vue";
import { ref } from "vue";
import type { DetailedTopic } from "@/network/apis/topic/GetTopic";

const props = defineProps<{ topic: DetailedTopic }>();

const auth = useAuthStore();

const dialog = ref(false);
</script>

<style scoped lang="css">
.container {
  position: absolute;
  right: 5%;
  display: flex;
}
</style>
