<template>
  <div>
    <TopicControlPanel v-if="topic" :topic="topic" />
    <h1 class="title">{{ topic?.title }}</h1>
    <h3 class="description">{{ topic?.description }}</h3>
    <ColumnItem
      v-for="column in columns"
      :key="column.columnId.toString()"
      :column="column"
    />
  </div>
</template>

<script setup lang="ts">
import ColumnItem from "@/components/TopicLayout/ColumnItem.vue";
import { onMounted, ref } from "vue";
import getColumns, { type Column } from "@/network/apis/topic/GetColumns";
import { ElMessage } from "element-plus";
import getTopic, { type DetailedTopic } from "@/network/apis/topic/GetTopic";
import TopicControlPanel from "@/components/TopicLayout/TopicControlPanel.vue";

const props = defineProps<{ id: bigint }>();

const columns = ref<Column[]>([]);
const topic = ref<DetailedTopic>();

onMounted(async () => {
  const result = await getColumns(props.id);
  if (result.status >= 300) ElMessage.error("Failed");
  else columns.value = result.data;

  const result2 = await getTopic(props.id);
  if (result2.status >= 300) ElMessage.error("Failed");
  else topic.value = result2.data;
});
</script>

<style scoped>
.title {
  margin-left: 30px;
}

.description {
  margin-left: 30px;
}
</style>
