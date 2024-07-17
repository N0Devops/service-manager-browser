<template>
  <div class="program-list h-full rounded shadow">
    <template
        v-for="(v, k) in programs"
        :key="k"
    >
      <div
          v-if="isVisible(v)"
          class="cursor-pointer p-2"
          @click="selectedHandler(v)"
      >
        {{ v.name }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { defaultClient } from "@/api/default/default";
import { IProgram } from "@/api/default/program/program";
import { useProgramStore } from "@/views/home-view/program/program-list/program.store";

const props = defineProps<{
  type?: "manage" | "config"
}>()

const programStore = useProgramStore()

const programs = ref<IProgram[]>([])

function isVisible(v: IProgram) {
  if (props.type === "manage") {
    return Object.keys(v.operation || {}).length
  }
  if (props.type === "config") {
    return Object.keys(v.config || {}).length
  }
  return true
}

async function getPrograms() {
  const { data } = await defaultClient.program.programs()
  programs.value = data
}

function selectedHandler(v: IProgram) {
  programStore.program = v
}

Promise.all([
  getPrograms(),
])
</script>

<style scoped lang="scss">
</style>
