import { defineStore } from "pinia";
import { ref } from "vue";
import { IProgram } from "@/api/default/program/program";

export const useProgramStore = defineStore("program11111", () => {
  const program  = ref<IProgram>()

  return {
    program
  }
})
