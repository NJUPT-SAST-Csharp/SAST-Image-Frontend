import request from "../../request";

async function getColumn(columnId: bigint) {
  const content = await request.get(`/api/square/column/${columnId}`);
  return { data: content.data as DetailedColumn, status: content.status };
}

interface DetailedColumn {
  text: string;
  authorId: bigint;
  images: ColumnImage[];
  publishedAt: string;
}

interface ColumnImage {
  url: string;
  thumbnailUrl: string;
}

export type { DetailedColumn, ColumnImage };
export default getColumn;
