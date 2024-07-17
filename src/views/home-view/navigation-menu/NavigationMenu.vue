<template>
  <div class="navigation-menu flex items-center border-b-2">
    <div class="flex-grow flex items-center">
      <div v-for="(v, k) in menus"
           :key="k"
           class="py-2 px-5 cursor-pointer"
           @click="to(v.path)"
      >{{ v.name }}
      </div>
    </div>
    <div class="align-middle mx-4">
      <el-link @click="exit">退出登录</el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter()

const menus = [
  { name: "管理", path: "manage" },
  { name: "配置", path: "config" },
]

function to(v: string) {
  router.replace(v)
}

function exit() {
  window.localStorage.removeItem("token")
  router.replace("/")
}
</script>

<style scoped lang="scss">
</style>
