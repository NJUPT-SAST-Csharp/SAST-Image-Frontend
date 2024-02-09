import type { ProfileContent } from "@/views/ProfileView.vue"
import request from "../../request"

async function updateProfile(nickname: string, biography: string | null, website: string | null) {
  const content = await request.put("/api/Profile", { nickname, biography, website })
  return content
}

export default updateProfile
