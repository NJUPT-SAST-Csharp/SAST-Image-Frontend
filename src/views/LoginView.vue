<script lang="ts" setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import login from '../network/apis/Login'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const rua = ref(false)
const toggleDrawer = useToggle(rua)
</script>

<template>
  <div>
    <el-drawer v-model="rua"></el-drawer>
  </div>
  <el-button @click="toggleDrawer()">Click me</el-button>
  <el-button @click="toggleDark()">Dark Mode</el-button>
  <el-button @click="login()">Login</el-button>
</template>
../network/apis/Login
