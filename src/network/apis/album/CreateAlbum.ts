import request from "../../request";

async function createAlbum(albumInfo: CreateAlbumRequest) {
  const content = await request.post("/api/sastimg/album", albumInfo);
  return content.status;
}

interface CreateAlbumRequest {
  title: string;
  description: string;
  categoryId: number;
  accessibility: number;
}

export default createAlbum;
export { type CreateAlbumRequest };
