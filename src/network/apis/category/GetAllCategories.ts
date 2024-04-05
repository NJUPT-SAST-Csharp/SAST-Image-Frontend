import type { Category } from "@/stores/category";
import request from "../../request";

async function getAllCategories() {
  const content = await request.get("/api/square/categories");
  return { data: content.data as Category[], status: content.status };
}

export default getAllCategories;
