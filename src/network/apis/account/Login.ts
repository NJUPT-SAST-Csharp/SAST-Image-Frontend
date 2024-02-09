import request from "../../request"

async function login(username: string, password: string) {
  const content = await request.post("/api/Account/Login", { username, password })
  return content
}

export default login
