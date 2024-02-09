import request from "../../request"

async function getProfile(username: string, detailed: boolean = false) {
  const content = await request.get("/api/Profile/" + username, { detailed })
  return content
}

export default getProfile
