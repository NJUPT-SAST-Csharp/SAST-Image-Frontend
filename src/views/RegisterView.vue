<template>
  <el-card class="main-frame" shadow="hover">
    <template #header>
      <div>
        <img src="/assets/logo.png" height="24" />
      </div>
    </template>
    <el-form inline class="card-body" @keydown.enter.prevent>
      <SendTokenStep v-if="step == 1" @next="step = 2" />
      <ValidateTokenStep v-else-if="step == 2" @back="step = 1" @next="step = 3" />
      <RegisterStep v-else-if="step == 3" @success="success" />
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue"

import SendTokenStep from "@/components/RegisterSteps/SendTokenStep.vue"
import ValidateTokenStep from "@/components/RegisterSteps/ValidateTokenStep.vue"
import RegisterStep from "@/components/RegisterSteps/RegisterStep.vue"
import router from "@/router"
import auth from "@/stores/auth"

const step = ref(1)

const success = () => {
  router.push("/" + auth.jwt()?.sub)
}
</script>

<style scoped>
.main-frame {
  text-align: center;
  width: 375px;
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
