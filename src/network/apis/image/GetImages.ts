import request from "../../request";

async function getImages(albumId: number, page: number) {
  const content = await request.get(`/api/sastimg/album/${albumId}/images`, {
    page,
  });
  return content;
}

export default getImages;
