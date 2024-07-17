<template>
  <div class="program-manager h-full w-full p-2 flex ">
    <program-list class="w-[300px] min-w-[300px] h-full" type="manage"></program-list>
    <div class="flex-grow flex flex-col px-2 overflow-hidden">
      <div v-if="programStore.program">
        <div class="text-2xl">{{ programStore.program?.name }}</div>
        <div class="py-1"> {{ programStore.program?.description }}</div>
        <div class="py-1">
          <el-button type="success" @click="doStart">启动</el-button>
          <el-button type="danger" @click="doStop">停止</el-button>
          <el-button type="warning" @click="doRestart">重启</el-button>
          <el-button type="primary" @click="doStatus">状态</el-button>
        </div>
      </div>
      <div class="overflow-auto">
        <pre>{{ output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProgramStore } from "@/views/home-view/program/program-list/program.store";
import ProgramList from "@/views/home-view/program/program-list/ProgramList.vue";
import { defaultClient } from "@/api/default/default";
import { onUnmounted, ref } from "vue";
import { reminder } from "@/packages/reminder";

const programStore = useProgramStore()
const cancelProgramStoreSubscriber = programStore.$subscribe((program) => {
  if (programStore.program) {
    doStatus()
  }
})

const output = ref()


async function doStart() {
  const { code, data, err } = await defaultClient.program.start(programStore.program?.name || "")
  output.value = data
  reminder.uiMessage(code === 0, "启动成功", `启动失败，原因：${err}`)
}

async function doStop() {
  const { code, data, err } = await defaultClient.program.stop(programStore.program?.name || "")
  output.value = data
  reminder.uiMessage(code === 0, "停止成功", `停止失败，原因：${err}`)
}

async function doRestart() {
  const { code, data, err } = await defaultClient.program.restart(programStore.program?.name || "")
  output.value = data
  reminder.uiMessage(code === 0, "重启成功", `重启失败，原因：${err}`)
}

async function doStatus() {
  const { code, data, err } = await defaultClient.program.status(programStore.program?.name || "")
  output.value = data
  reminder.uiMessage(code === 0, "执行成功", `执行失败，原因：${err}`)
}

onUnmounted(() => {
  cancelProgramStoreSubscriber()
  programStore.program = undefined
})
</script>

<style scoped lang="scss">
</style>
