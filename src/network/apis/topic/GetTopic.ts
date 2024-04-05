import request from "../../request";

async function getTopic(topicId: bigint) {
  const content = await request.get("/api/square/topic/" + topicId);
  return { data: content.data as DetailedTopic, status: content.status };
}

interface DetailedTopic {
  topicId: bigint;
  authorId: number;
  title: string;
  description: string;
  updatedAt: string;
  publishedAt: string;
  isSubscribed: boolean;
  subscribes: number;
  columns: number;
}

export { type DetailedTopic };
export default getTopic;
