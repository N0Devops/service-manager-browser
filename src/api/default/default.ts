import { Program } from "@/api/default/program/program";
import { HttpClient } from "@/packages/http-client";
import { Account } from "@/api/default/account/account";

const client = HttpClient({
  baseURL: process.env.VUE_APP_BASE_URL || ""
})

export const defaultClient = {
  program: new Program(client),
  account: new Account(client),
}
