/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string //定义提示信息 数据是只读的无法被修改
  readonly VITE_API_URL: string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
