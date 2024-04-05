<template>
  <div class="square">
    <SquareHeader class="header" />
    <ElTabs stretch>
      <ElTabPane lazy label="All">
        <SquareBody :category="null" />
      </ElTabPane>
      <ElTabPane
        lazy
        v-for="category in categories"
        :label="category.name"
        :key="category.id"
      >
        <SquareBody :category="category.id" />
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script lang="ts" setup>
import SquareHeader from "@/components/SquareLayout/SquareHeader.vue";
import SquareBody from "@/components/SquareLayout/SquareBody.vue";
import useCategoriesStore from "@/stores/category";
import type { ElTabPane } from "element-plus";
import { ref, onMounted } from "vue";
import type { Category } from "@/stores/category";

const categories = ref<Category[]>([]);

onMounted(async () => {
  const c = useCategoriesStore();
  categories.value = await c.getAsync().then((c) => c.value);
});
</script>

<style scoped>
.square {
  background: #fff;
  border-radius: 24px;
  display: block;
}

.header {
  cursor: auto;
  max-height: 100px;
  display: flex;
  width: 100%;
}
.topic-item {
  height: 440px;
  width: 100%;
  display: block;
  border: 0 solid;
  background: #ffffff;
  margin: 0px;
  margin-bottom: 10px;
  border: 1ch soild;
  border: 1px solid rgb(248, 248, 250);
  box-sizing: border-box;
  border-radius: 10px;
}
</style>
