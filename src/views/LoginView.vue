<script lang="ts" setup>
import { i18n } from "@/locales/i18n"
import { ref } from "vue"
import { ElMessage } from "element-plus"
import loginApi from "../network/apis/account/Login"
import auth from "../stores/auth"
import router from "@/router"

const isLoading = ref(false)
const loginDto = ref({ username: "", password: "" })
const login = async () => {
  isLoading.value = true
  const response = await loginApi(loginDto.value.username, loginDto.value.password)
  isLoading.value = false
  if (response.status >= 300) {
    ElMessage.error(i18n.global.t("loginView.loginFailed"))
  } else {
    auth.setToken(response.data["token"])
    console.log(auth.jwt());
    ElMessage.success(i18n.global.t("loginView.loginSuccess"))
    router.push({ name: "profile", params: { username: auth.jwt()?.username } })
  }
}
</script>

<template>
  <el-card class="main-frame" shadow="hover">
    <template #header>
      <div>
        <img src="src/assets/logo.png" height="24" />
      </div>
    </template>
    <el-form inline style="margin-left: 5%">
      <el-form-item>
        <el-input v-model="loginDto.username" maxlength="20" minlength="2">
          <template #prepend>
            {{ $t("loginView.username") }}
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginDto.password"
          maxlength="20"
          minlength="6"
          type="password"
          show-password
        >
          <template #prepend>
            {{ $t("loginView.password") }}
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" :loading="isLoading">
          {{ $t("loginView.login") }}
        </el-button>
        <el-button class="register-button" type="info" @click="router.push('/register')">
          {{ $t("loginView.register") }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.main-frame {
  text-align: center;
  width: 375px;
  height: 240px;
  padding: 2%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
