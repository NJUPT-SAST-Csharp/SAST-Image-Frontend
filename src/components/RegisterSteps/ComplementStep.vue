<template>
  <el-form-item>
    <el-input v-model="dto.nickname">
      <template #prepend>
        {{ $t("profileView.profileItems.nickname") }}
      </template>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-input v-model="dto.biography">
      <template #prepend>
        {{ $t("profileView.profileItems.biography") }}
      </template>
    </el-input>
  </el-form-item>
  <el-form-item>
    <span style="width: 50px" />
    <el-button type="primary" @click="confirm">
      {{ $t("action.confirm") }}
    </el-button>
    <el-button type="info" @click="emit('skip')">
      {{ $t("registerView.skipComplementRequest") }}
      <el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
  </el-form-item>
</template>

<script setup lang="ts">
import updateProfile from "@/network/apis/profile/UpdateProfile"
import { ArrowRight } from "@element-plus/icons-vue/global"
import { ref } from "vue"

const emit = defineEmits(["success", "skip"])

const dto = ref({
  nickname: "",
  biography: ""
})

const confirm = async () => {
  await updateProfile(dto.value.nickname, dto.value.biography)
}
</script>
