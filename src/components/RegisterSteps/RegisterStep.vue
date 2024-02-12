<template>
  <el-form-item>
    <el-input v-model="dto.username" maxlength="20" minlength="2">
      <template #prepend>
        {{ $t("registerView.dto.username") }}
      </template>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-input type="password" show-password v-model="dto.password" maxlength="20" minlength="6">
      <template #prepend>
        {{ $t("registerView.dto.password") }}
      </template>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="register" :loading="isLoading">
      {{ $t("action.confirm") }}
    </el-button>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { i18n } from "@/locales/i18n"
import registerApi from "@/network/apis/account/CreateAccount"
import auth from "@/stores/auth"

const emits = defineEmits(["success"])

const dto = ref({
  username: "",
  password: "",
  email: sessionStorage.getItem("email") as string,
  code: sessionStorage.getItem("code") as string
})
const isLoading = ref(false)

const register = async () => {
  isLoading.value = true
  const content = await registerApi(dto.value)
  if (content.status < 300) {
    ElMessage.success(i18n.global.t("registerView.registerSuccess"))
    auth.setToken(content.data["token"])
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("code")
    emits("success")
  } else if (content.status == 409) {
    ElMessage.error(i18n.global.t("registerView.nameConflict"))
  } else {
    ElMessage.error(i18n.global.t("registerView.registerFailed"))
  }
  isLoading.value = false
}
</script>
