import request from "../../request"

async function validateRegisterToken(email: string, token: string) {
  const content = await request.post("/api/Account/ValidateRegisterToken", { email, token })
  return content
}

export default validateRegisterToken
