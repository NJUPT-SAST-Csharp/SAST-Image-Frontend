<template>
  <el-card class="main-frame" shadow="hover">
    <template #header>
      <div>
        <img src="../assets/logo.png" height="24" />
      </div>
    </template>
    <el-steps align-center :active="step - 1" v-if="step < 4">
      <el-step title="Send" :icon="Message" />
      <el-step title="Validate" :icon="Key" />
      <el-step title="Create" :icon="Edit" />
    </el-steps>
    <div v-if="step == 4">
      <div>
        <el-text size="large" type="success">Congratulations!</el-text>
      </div>
      <div>
        <el-text size="large" type="primary">{{
          $t("registerView.complementRequest")
        }}</el-text>
      </div>
    </div>
    <el-form class="card-body" @keydown.enter.prevent>
      <SendCodeStep v-if="step == 1" @next="step = 2" />
      <VerifyCodeStep v-else-if="step == 2" @back="step = 1" @next="step = 3" />
      <RegisterStep v-else-if="step == 3" @success="registerSuccess" />
      <ComplementStep v-else @success="complementSuccess" />
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import SendCodeStep from "@/components/RegisterSteps/SendCodeStep.vue";
import VerifyCodeStep from "@/components/RegisterSteps/VerifyCodeStep.vue";
import RegisterStep from "@/components/RegisterSteps/RegisterStep.vue";
import router from "@/router";
import { Message, Key, Edit } from "@element-plus/icons-vue";
import ComplementStep from "@/components/RegisterSteps/ComplementStep.vue";

const step = ref(1);

const registerSuccess = () => {
  step.value = 4;
};

const complementSuccess = () => {
  router.push("/login");
};
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
