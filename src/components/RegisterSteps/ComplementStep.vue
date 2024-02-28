<template>
  <ElFormItem>
    <ElInput v-model="dto.nickname">
      <template #prepend>
        {{ $t("profileView.profileItems.nickname") }}
      </template>
    </ElInput>
  </ElFormItem>
  <ElFormItem>
    <ElInput v-model="dto.biography">
      <template #prepend>
        {{ $t("profileView.profileItems.biography") }}
      </template>
    </ElInput>
  </ElFormItem>
  <ElFormItem>
    <span style="width: 50px" />
    <ElButton type="primary" @click="confirm">
      {{ $t("action.confirm") }}
    </ElButton>
    <ElButton type="info" @click="emit('skip')">
      {{ $t("registerView.skipComplementRequest") }}
      <ElIcon class="ElIcon--right"><ArrowRight /></ElIcon>
    </ElButton>
  </ElFormItem>
</template>

<script setup lang="ts">
import updateProfile from "@/network/apis/profile/UpdateProfile";
import { ArrowRight } from "@element-plus/icons-vue/global";
import { ref } from "vue";

const emit = defineEmits(["success", "skip"]);

const dto = ref({
  nickname: "",
  biography: "",
  website: null,
  birthday: null,
});

const confirm = async () => {
  await updateProfile(dto.value);
};
</script>
