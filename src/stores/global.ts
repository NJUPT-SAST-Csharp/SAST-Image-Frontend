import { reactive } from "vue"
const global = {
  email: "",
  countdown: 0
}

export default reactive(global)
