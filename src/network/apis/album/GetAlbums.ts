import request from "../../request";

async function getAlbums(categoryId: number, page: number) {
  const content = await request.get("/api/sastimg/albums", {
    categoryId,
    page,
  });
  return content.data as AlbumDto[];
}

interface AlbumDto {
  albumId: number;
  authorId: number;
  categoryId: number;
  title: string;
  coverUrl: string;
}

export default getAlbums;
export type { AlbumDto };
