<template>
  <el-card class="main-frame" shadow="hover">
    <template #header>
      <div>
        <img src="../assets/logo.png" height="24" />
      </div>
    </template>
    <el-steps align-center :active="step - 1">
      <el-step title="Send" :icon="Message" />
      <el-step title="Validate" :icon="Key" />
      <el-step title="Create" :icon="Edit" />
    </el-steps>
    <el-form inline class="card-body" @keydown.enter.prevent>
      <SendCodeStep v-if="step == 1" @next="step = 2" />
      <VerifyCodeStep v-else-if="step == 2" @back="step = 1" @next="step = 3" />
      <RegisterStep v-else-if="step == 3" @success="success" />
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue"

import SendCodeStep from "@/components/RegisterSteps/SendCodeStep.vue"
import VerifyCodeStep from "@/components/RegisterSteps/VerifyCodeStep.vue"
import RegisterStep from "@/components/RegisterSteps/RegisterStep.vue"
import router from "@/router"
import auth from "@/stores/auth"
import { Message, Key, Edit } from "@element-plus/icons-vue"

const step = ref(1)

const success = () => {
  router.push("/login")
}
</script>

<style scoped>
.main-frame {
  text-align: center;
  min-width: 400px;
  min-height: 240px;
  padding: 2%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.card-body {
  margin-left: 5%;
  margin-top: 5%;
}
</style>
