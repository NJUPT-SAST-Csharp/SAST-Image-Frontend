<template>
  <div class="container">
    <div style="display: flex">
      <AuthorDiv :id="column.authorId" />
      <a class="date">
        <ElIcon><Calendar /></ElIcon>
        {{ date.toLocaleTimeString() }}
        {{ date.toLocaleDateString() }}
      </a>
    </div>
    <div class="text" v-if="text">
      <ElText size="large"> {{ text }}</ElText>
    </div>
    <ElScrollbar>
      <div class="images-container">
        <ElImage
          v-for="(image, index) in images"
          :key="image.url"
          :src="image.thumbnailUrl"
          lazy
          :preview-src-list="images.map((image) => image.url)"
          :initial-index="index"
          hide-on-click-modal
          class="image"
          >{{ image.url }}
        </ElImage>
      </div>
    </ElScrollbar>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import type { Column } from "@/network/apis/topic/GetColumns";
import AuthorDiv from "./AuthorDiv.vue";
import { onMounted, ref } from "vue";
import getColumn, { type ColumnImage } from "@/network/apis/column/getColumn";
import { ElMessage } from "element-plus";

const props = defineProps<{ column: Column }>();

const images = ref<ColumnImage[]>([]);
const text = ref<string | null>(null);
const date = new Date(props.column.publishedAt);

onMounted(async () => {
  const result = await getColumn(props.column.columnId);
  if (result.status > 300) {
    ElMessage.error("Not found");
  }
  text.value = result.data.text;
  images.value = result.data.images;
});
</script>

<style scoped lang="css">
.container {
  margin: auto;
  width: 96%;
  padding: 10px;
  display: block;
  background: #ffffff;
  margin-bottom: 10px;
  border: 1px solid rgb(248, 248, 250);
  box-sizing: border-box;
  border-radius: 10px;
  overflow-x: hidden;
  transition: 0.3s;
}

.container:hover {
  box-shadow: var(--el-box-shadow-lighter);
}

.text {
  margin-left: 30px;
  margin-top: 10px;
}

.date {
  margin-left: 20px;
  font-size: small;
  color: grey;
  align-self: self-end;
}

.profile {
  margin-left: 20px;
}

.images-container {
  display: flex;
}

.image {
  flex-shrink: 0;
  display: inline-block;
  height: 200px;
  margin: 10px;
  border-radius: 4px;
}
</style>
