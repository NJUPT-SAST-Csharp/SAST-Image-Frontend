import request from "../../request"

async function verifyRegisterCode(email: string, code: string) {
  const content = await request.post("/api/account/registration/verify", { email, code })
  return content
}

export default verifyRegisterCode
