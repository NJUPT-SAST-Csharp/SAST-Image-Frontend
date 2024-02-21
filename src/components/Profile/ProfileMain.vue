<template>
  <div class="main-frame">
    <div class="avatar">
      <el-avatar :size="120" fit="cover" :src="content.avatar ?? 'empty'">
        <img src="../../assets/avatar.png" />
      </el-avatar>
    </div>
    <div class="edit-button">
      <div v-if="auth.jwtDto.value?.username == content.username">
        <el-button icon="Edit" @click="isEdit = !isEdit">
          {{ $t("profileView.edit.profile") }}
        </el-button>
        <el-button icon="CircleCloseFilled" type="danger" @click="logout">
          {{ $t("profileView.logout.description") }}
        </el-button>
      </div>
      <ProfileEditDialog
        v-if="auth.jwtDto.value?.username == content.username"
        v-model="isEdit"
        :content="content"
      />
    </div>
    <div class="text">
      <el-space direction="vertical" alignment="normal" wrap size="large">
        <el-space direction="vertical" alignment="normal" wrap>
          <el-text size="large" tag="b">{{ content.nickname }} </el-text>
          <el-text>{{ "@" + content.username }} </el-text>
        </el-space>
        <el-text v-if="content.biography">{{ content.biography }}</el-text>
        <span v-if="content.website && content.website.trim() != ''">
          <el-icon><Position /></el-icon><el-text>{{ content.website }} </el-text>
        </span>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ProfileContent } from "@/views/ProfileView.vue"
import { i18n } from "@/locales/i18n"
import { ref } from "vue"
import ProfileEditDialog from "@/components/Profile/ProfileEditDialog.vue"
import auth from "@/stores/auth"
import router from "@/router"
import { ElMessage } from "element-plus"

defineProps<{ content: ProfileContent }>()

const isEdit = ref(false)

const logout = () => {
  auth.setToken(null)
  router.push({ name: "login" })
  ElMessage.success(i18n.global.t("profileView.logout.success"))
}
</script>

<style scoped>
.el-button {
  margin-top: 10%;
}
.main-frame {
  position: relative;
  height: 240px;
  box-shadow: var(--el-box-shadow-lighter);
}

.edit-button {
  align-items: center;
  height: 60px;
  margin-left: auto;
  margin-right: 20px;
  padding-top: 20px;
  width: min-content;
}
.avatar {
  position: absolute;
  top: -60px;
  left: 20px;
}
.text {
  margin-bottom: 50px;
  margin-left: 30px;
  width: 40%;
}
.text .el-text--large {
  font-size: 24px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
