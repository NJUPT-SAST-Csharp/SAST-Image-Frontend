import request from "../../request"

async function createAccount(dto: Dto) {
  const content = await request.post("/api/account/registration/createAccount", dto)
  return content
}

interface Dto {
  username: string
  password: string
  email: string
  code: string
}

export default createAccount
