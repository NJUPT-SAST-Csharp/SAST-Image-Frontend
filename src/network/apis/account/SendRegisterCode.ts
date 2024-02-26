import request from "../../request";

async function sendRegisterCode(email: string) {
  const content = await request.post("/api/account/registration/sendCode", {
    email,
  });
  return content;
}

export default sendRegisterCode;
