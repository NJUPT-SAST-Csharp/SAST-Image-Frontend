<template>
  <ElFormItem>
    <ElInput
      style="width: 65%; margin-right: 5%"
      v-model="code"
      maxlength="6"
      minlength="6"
    >
      <template #prepend>
        {{ $t("registerView.token") }}
      </template>
    </ElInput>
    <ElButton
      plain
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
      <span v-else>{{ $t("registerView.sendToken") }}</span>
    </ElButton>
  </ElFormItem>
  <ElFormItem>
    <span style="width: 50px" />
    <ElButton type="info" icon="ArrowLeft" @click="$emit('back')">
      {{ $t("registerView.backToChangeEmail") }}
    </ElButton>
    <ElButton type="primary" @click="validate" :loading="isLoading">
      {{ $t("action.confirm") }}
    </ElButton>
  </ElFormItem>
</template>

<script setup lang="ts">
import auth from "@/stores/auth";
import global from "@/stores/global";
import sendCodeApi from "@/network/apis/account/SendRegisterCode";
import verifyApi from "@/network/apis/account/VerifyRegisterCode";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { i18n } from "@/locales/i18n";

const emit = defineEmits(["next", "back"]);

const isLoading = ref(false);
const isCountdown = ref(true);
const code = ref<string>("");
const email = sessionStorage.getItem("email") as string;

const validate = async () => {
  isLoading.value = true;
  const content = await verifyApi(email, code.value);
  if (content.status < 300) {
    sessionStorage.setItem("code", code.value);
    emit("next");
  } else {
    ElMessage.error(i18n.global.t("registerView.validationFailed"));
  }
  isLoading.value = false;
};

const sendToken = async () => {
  isLoading.value = true;
  const content = await sendCodeApi(email);
  if (content.status < 300) {
    ElMessage.success(i18n.global.t("registerView.sendTokenSuccess"));
    isCountdown.value = true;
    global.countdown = Date.now() + 1000 * 60;
  } else ElMessage.error(i18n.global.t("registerView.sendTokenFailed"));
  isLoading.value = false;
};
</script>
@/network/apis/account/VerifyRegisterCode@/network/apis/account/SendRegisterCode
