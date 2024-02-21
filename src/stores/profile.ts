import { computed, reactive, ref } from "vue"
import auth from "./auth"

interface ProfileDto {
  username: string
  nickname: string
  avatar: string
}

function setProfile(profile: ProfileDto | null) {
  avatar.value = profile?.avatar ?? null
  username.value = profile?.username ?? null
  nickname.value = profile?.nickname ?? null
  if (profile) {
    sessionStorage.setItem("profile", JSON.stringify(profile))
  }
}

function init(): ProfileDto | null {
  const profile = sessionStorage.getItem("profile")
  return profile ? JSON.parse(profile) : null
}

const avatar = ref<string | null>(init()?.avatar ?? null)
const username = ref<string | null>(init()?.username ?? null)
const nickname = ref<string | null>(init()?.username ?? null)

const profile = {
  setProfile,
  avatar,
  username,
  nickname
}

export type { ProfileDto }
export default profile
