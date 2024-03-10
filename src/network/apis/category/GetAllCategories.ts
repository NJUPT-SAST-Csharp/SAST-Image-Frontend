import request from "../../request";

async function getAllCategories() {
  const content = await request.get("/api/sastimg/categories");
  return { data: content.data as CategoryDto[], status: content.status };
}

interface CategoryDto {
  categoryId: number;
  name: string;
  description: string;
}

export default getAllCategories;
export type { CategoryDto };
