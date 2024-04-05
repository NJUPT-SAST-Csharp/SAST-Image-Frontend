import getAllCategories from "@/network/apis/category/GetAllCategories";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface Category {
  id: number;
  name: string;
}
const categories = ref<Category[]>([]);

const useCategoriesStore = defineStore("categories", () => {
  const get = async () => {
    if (categories.value.length === 0) {
      const { data } = await getAllCategories();
      categories.value = data;
    }
    return categories;
  };
  return { getAsync: get };
});

export default useCategoriesStore;
export { type Category };
