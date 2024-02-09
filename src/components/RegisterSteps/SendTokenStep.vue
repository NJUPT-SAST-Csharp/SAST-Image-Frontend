<template>
  <el-form-item>
    <el-input v-model="global.email" maxlength="20">
      <template #prepend>
        {{ $t("registerView.email") }}
      </template>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="info" icon="ArrowLeft" @click="router.push('/login')">
      {{ $t("registerView.backToLogin") }}
    </el-button>
    <el-button type="primary" @click="sendToken" :loading="isLoading" :disabled="isCountdown">
      <el-countdown
        v-if="isCountdown"
        :value="global.countdown"
        @finish="isCountdown = false"
        format="ss"
      />
      <span v-else>{{ $t("action.confirm") }}</span>
    </el-button>
  </el-form-item>
</template>

<script setup lang="ts">
import { i18n } from "@/locales/i18n"
import { ElMessage } from "element-plus"
import { ref } from "vue"
import router from "@/router"
import global from "@/stores/global"
import sendTokenApi from "@/network/apis/account/SendRegisterToken"

const isCountdown = ref(true)

const emit = defineEmits(["next"])

const sendToken = async () => {
  isLoading.value = true
  const content = await sendTokenApi(global.email)
  if (content.status < 300) {
    ElMessage.success(i18n.global.t("registerView.sendTokenSuccess"))
    global.countdown = Date.now() + 1000 * 60
    emit("next")
  } else if (content.status == 409) ElMessage.error(i18n.global.t("registerView.emailConflict"))
  else ElMessage.error(i18n.global.t("registerView.sendTokenFailed"))
  isLoading.value = false
}

const isLoading = ref(false)
</script>
