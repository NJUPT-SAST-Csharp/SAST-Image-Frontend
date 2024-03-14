import request from "../../request";

async function getUserAlbums(userId: number) {
  const content = await request.get(`/api/sastimg/user/${userId}/albums`);
  return { status: content.status, data: content.data as UserAlbumDto[] };
}

interface UserAlbumDto {
  albumId: number;
  categoryId: number;
  title: string;
  coverUrl: string;
}

export default getUserAlbums;
export type { UserAlbumDto };
