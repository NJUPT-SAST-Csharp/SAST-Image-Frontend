import request from "../../request";

async function getColumns(topicId: bigint) {
  const content = await request.get(`/api/square/topic/${topicId}/columns`);
  return { data: content.data as Column[], status: content.status };
}

interface Column {
  columnId: bigint;
  authorId: bigint;
  publishedAt: string;
}

export { type Column };
export default getColumns;
