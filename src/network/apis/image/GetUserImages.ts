import request from "../../request";

async function getUserImages(albumId: number, page: number) {
  const content = await request.get(`/api/sastimg/user/${albumId}/images`, {
    page,
  });
  return { data: content.data as UserImageDto[], status: content.status };
}

interface UserImageDto {
  albumId: number;
  imageId: number;
  Url: string;
  title: string;
}

export default getUserImages;
export type { UserImageDto };
