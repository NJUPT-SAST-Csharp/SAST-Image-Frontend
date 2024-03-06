<template>
  <ElFormItem>
    <ElInput v-model="email" maxlength="20">
      <template #prepend>
        {{ $t("registerView.email") }}
      </template>
    </ElInput>
  </ElFormItem>
  <ElFormItem>
    <span style="width: 50px" />
    <ElButton type="info" icon="ArrowLeft" @click="router.push('/login')">
      {{ $t("registerView.backToLogin") }}
    </ElButton>
    <ElButton
      type="primary"
      @click="sendToken"
      :loading="isLoading"
      :disabled="isCountdown"
    >
      <ElCountdown
        v-if="isCountdown"
        :value="global.countdown"
        @finish="isCountdown = false"
        format="ss"
      />
      <span v-else>{{ $t("action.confirm") }}</span>
    </ElButton>
  </ElFormItem>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import router from "@/router";
import global from "@/stores/global";
import sendCodeApi from "@/network/apis/account/SendRegisterCode";

const isCountdown = ref(true);
const email = ref("");

const emit = defineEmits(["next"]);

const sendToken = async () => {
  isLoading.value = true;
  const content = await sendCodeApi(email.value);
  if (content.status < 300) {
    ElMessage.success(i18n.global.t("registerView.sendTokenSuccess"));
    global.countdown = Date.now() + 1000 * 60;
    sessionStorage.setItem("email", email.value);
    emit("next");
  } else if (content.status == 400)
    ElMessage.error(i18n.global.t("registerView.emailInvalid"));
  else ElMessage.error(i18n.global.t("registerView.sendTokenFailed"));
  isLoading.value = false;
};

const isLoading = ref(false);
</script>
