import request from "../../request";

async function updateProfile(profile: UpdateProfileDto) {
  const content = await request.put("/api/profile", profile);
  return content;
}

interface UpdateProfileDto {
  nickname: string;
  biography: string | null;
  birthday: string | null;
  website: string | null;
}

export default updateProfile;
