<template>
  <div class="config-editor flex-grow px-2 h-full flex flex-col">
    <div class="flex border-b-2 mb-2">
      <div v-for="(v, k) in program.config"
           :key="k"
           class="py-2 px-5 cursor-pointer"
           @click="selectConfig(k)"
      >{{ k }}
      </div>
    </div>
    <div v-show="config" class="flex-grow" ref="editorRef"></div>
    <div v-show="config" class="flex items-center">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="danger" @click="reset">重置</el-button>
      <el-select v-model="formatter"
                 filterable
                 placeholder="格式选择"
                 class="ml-2 max-w-[200px]"
                 v-on:change="formatterSelectHandler"
      >
        <el-option
            v-for="(v, k) in formatterModes"
            :key="k"
            :label="v.name"
            :value="v.mode"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, defineProps, onMounted, onUnmounted, ref, watch } from 'vue';
import { IProgram } from "@/api/default/program/program";
import { defaultClient } from "@/api/default/default";
import { reminder } from "@/packages/reminder";

export interface AceEditorMode {
  name: string;
  caption: string;
  mode: string;
  extensions: string;
  extRe: RegExp;
}


const props = defineProps<{
  program: IProgram
}>()

const editorRef = ref<HTMLDivElement>()
let editor: any = undefined
const config = ref("")
const formatterModes = ref<AceEditorMode[]>([])
const formatter = ref("")

function formatterSelectHandler(v: any) {
  editor?.session.setMode(formatter.value, () => {
    console.log("mode already set")
  });
}

function selectConfig(k: string) {
  config.value = k
  getConfig()
}

async function getConfig() {
  const { code, data } = await defaultClient.program.getConfig(props.program.name || "", config.value)
  if (data) {
    editor.setValue(data, data.length)
    // Reference: https://stackoverflow.com/questions/15903191/how-to-automatically-pick-a-mode-for-ace-editor-given-a-file-extension
    // editor.session.setMode("ace/mode/javascript")
    const modelist = window.ace.require("ace/ext/modelist")
    const matched = modelist.getModeForPath(config.value)
    formatter.value = matched.mode
    editor.session.setMode(formatter.value, () => {
      console.log("mode already set")
    });
  }
  return code
}

async function save() {
  const content = editor.getValue()
  const { code } = await defaultClient.program.config(props.program.name || "", config.value, content)
  reminder.uiMessage(code === 0, "保存成功", "保存失败")
}

async function reset() {
  reminder.uiMessage(await getConfig() === 0, "重置成功", "重置失败")
}

function boot() {
  const keys = Object.keys(props.program.config || {})
  if (keys.length) {
    selectConfig(keys[0])
  }
}

function loadModeList() {
  const { modes } = window.ace.require("ace/ext/modelist")
  formatterModes.value = modes || []
}

onMounted(() => {
  if (editorRef.value) {
    editor = window.ace.edit(editorRef.value);
    boot()
  }
})

onUnmounted(() => {
  editor?.destroy()
})

loadModeList()
</script>

<style scoped lang="scss">
</style>
