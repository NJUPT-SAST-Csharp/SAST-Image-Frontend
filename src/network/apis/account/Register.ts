import request from "../../request"

async function register(dto: Dto) {
  const content = await request.post("/api/Account/Register", dto)
  return content
}

interface Dto {
  username: string
  nickname: string
  password: string
}

export default register
