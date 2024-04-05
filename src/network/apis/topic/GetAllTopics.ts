import request from "../../request";

async function getAllTopics(category: number | null = null) {
  const content = await request.get("/api/square/topics", { category });
  return { data: content.data as Topic[], status: content.status };
}

interface Topic {
  topicId: bigint;
  authorId: number;
  title: string;
  updatedAt: string;
  previews: string[];
}

export { type Topic };
export default getAllTopics;
