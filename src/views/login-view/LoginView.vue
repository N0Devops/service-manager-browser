<template>
  <div class="login-view fullscreen">
    <div class="w-1/4 p-6 shadow-lg shadow-blue-200 rounded mx-auto mt-[15%]">
      <div class="text-2xl pb-6">应用服务管理平台</div>
      <el-form>
        <el-form-item label="账户">
          <el-input v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { defaultClient } from "@/api/default/default";
import { reminder } from "@/packages/reminder";
import { useRouter } from "vue-router";

const router = useRouter()

const account = ref("")
const password = ref("")

async function login() {
  const { data, code, err } = await defaultClient.account.login(account.value, password.value)
  reminder.uiMessage(code === 0, "登录成功", `登录失败，原因：${err}`)
  if (code === 0) {
    window.localStorage.setItem("token", data)
    await router.replace("/home")
  }
}

async function boot() {
  const token = window.localStorage.getItem("token")
  if (token) {
    await router.replace("/home")
  }
}

boot()
</script>

<style scoped lang="scss">
.login-view {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='290' height='290' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23005092'/%3E%3Cstop offset='1' stop-color='%23007cc4'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'%3E%3Cstop offset='0' stop-color='%23868686'/%3E%3Cstop offset='0.09' stop-color='%23ababab'/%3E%3Cstop offset='0.18' stop-color='%23c4c4c4'/%3E%3Cstop offset='0.31' stop-color='%23d7d7d7'/%3E%3Cstop offset='0.44' stop-color='%23e5e5e5'/%3E%3Cstop offset='0.59' stop-color='%23f1f1f1'/%3E%3Cstop offset='0.75' stop-color='%23f9f9f9'/%3E%3Cstop offset='1' stop-color='%23FFFFFF'/%3E%3C/linearGradient%3E%3Cfilter id='c' x='0' y='0' width='200%25' height='200%25'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='12' /%3E%3C/filter%3E%3C/defs%3E%3Cpolygon fill='url(%23a)' points='0 174 0 0 174 0'/%3E%3Cpath fill='%23000' fill-opacity='.5' filter='url(%23c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/%3E%3Cpath fill='url(%23b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: top left;
}
</style>
