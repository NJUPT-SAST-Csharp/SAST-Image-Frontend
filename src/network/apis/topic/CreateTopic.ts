import request from "../../request";

async function createTopic(value: {
  title: string;
  description: string;
  categoryId: number;
}) {
  const content = await request.post("/api/square/topic", value);
  return { status: content.status };
}

export default createTopic;
