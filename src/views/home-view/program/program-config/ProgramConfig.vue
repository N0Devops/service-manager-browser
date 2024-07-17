<template>
  <div class="program-config h-full w-full p-2 flex">
    <program-list class="w-[300px] min-w-[300px] h-full" type="config"></program-list>
    <config-editor
        v-if="programStore.program"
        :key="programStore.program.name"
        :program="programStore.program"></config-editor>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import { defaultClient } from "@/api/default/default";
import { useProgramStore } from "@/views/home-view/program/program-list/program.store";
import ProgramList from "@/views/home-view/program/program-list/ProgramList.vue";
import { reminder } from "@/packages/reminder";
import ConfigEditor from "@/views/home-view/program/program-config/config-editor/ConfigEditor.vue";

const programStore = useProgramStore()

onUnmounted(() => {
  programStore.program = undefined
})
</script>

<style scoped lang="scss">
</style>
