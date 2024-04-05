import request from "../../request";

async function getProfile(
  id: bigint | null = null,
  username: string | null = null,
  detailed: boolean = false,
) {
  const content = await request.get("/api/profile/", {
    id,
    username,
    detailed,
  });
  return content;
}

export default getProfile;
