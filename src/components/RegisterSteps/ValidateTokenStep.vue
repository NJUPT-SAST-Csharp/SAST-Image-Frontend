<template>
  <el-form-item>
    <el-input style="width: 65%; margin-right: 5%" v-model="token" maxlength="6" minlength="6">
      <template #prepend>
        {{ $t("registerView.token") }}
      </template>
    </el-input>
    <el-button plain type="primary" @click="sendToken" :loading="isLoading" :disabled="isCountdown">
      <el-countdown
        v-if="isCountdown"
        :value="global.countdown"
        @finish="isCountdown = false"
        format="ss"
      />
      <span v-else>{{ $t("registerView.sendToken") }}</span>
    </el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="info" icon="ArrowLeft" @click="$emit('back')">
      {{ $t("registerView.backToChangeEmail") }}
    </el-button>
    <el-button type="primary" @click="validate" :loading="isLoading">
      {{ $t("action.confirm") }}
    </el-button>
  </el-form-item>
</template>

<script setup lang="ts">
import auth from "@/stores/auth"
import global from "@/stores/global"
import sendTokenApi from "@/network/apis/account/SendRegisterToken"
import validateApi from "@/network/apis/account/ValidateRegisterToken"
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { i18n } from "@/locales/i18n"

const emit = defineEmits(["next", "back"])

const isLoading = ref(false)
const isCountdown = ref(true)
const token = ref<string>("")

const validate = async () => {
  isLoading.value = true
  const content = await validateApi(global.email, token.value)
  if (content.status < 300) {
    auth.setToken(content.data["token"])
    emit("next")
  } else {
    ElMessage.error(i18n.global.t("registerView.validationFailed"))
  }
  isLoading.value = false
}

const sendToken = async () => {
  isLoading.value = true
  const content = await sendTokenApi(global.email)
  if (content.status < 300) {
    ElMessage.success(i18n.global.t("registerView.sendTokenSuccess"))
    isCountdown.value = true
    global.countdown = Date.now() + 1000 * 60
  } else ElMessage.error(i18n.global.t("registerView.sendTokenFailed"))
  isLoading.value = false
}
</script>
