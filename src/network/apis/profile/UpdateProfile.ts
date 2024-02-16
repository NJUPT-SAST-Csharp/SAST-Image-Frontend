import request from "../../request"

async function updateProfile(nickname: string, biography: string | null) {
  const content = await request.put("/api/sns/user/profile", { nickname, biography })
  return content
}

export default updateProfile
