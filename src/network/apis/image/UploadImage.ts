import request from "../../request"

async function uploadImage(username: string, data: object) {
  const content = await request.form("/api/Image", data)
  return content
}

export default uploadImage
