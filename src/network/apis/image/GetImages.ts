import request from "../../request";

async function getImages(username: string, page: number) {
  const content = await request.get("/api/Image", { username, page });
  return content;
}

export default getImages;
