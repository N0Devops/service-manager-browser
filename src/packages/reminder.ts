import { ElMessage } from "element-plus";

function uiMessage(condition: boolean, success: string, error: string) {
  if (condition) {
    return ElMessage({ type: "success", message: success })
  }
  return ElMessage({ type: "error", message: error })
}

export const reminder = {
  uiMessage,
}
