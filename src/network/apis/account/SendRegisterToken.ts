import request from "../../request"

async function SendRegisterToken(email: string) {
  const content = await request.post("/api/Account/SendRegisterToken", { email })
  return content
}

export default SendRegisterToken
