<template>
  <div class="frame">
    <SquareTopicItem
      v-for="topic in topics"
      :key="topic.topicId.toString()"
      :topic="topic"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SquareTopicItem from "./SquareTopicItem.vue";
import getAllTopics, { type Topic } from "@/network/apis/topic/GetAllTopics";

const props = withDefaults(defineProps<{ category: number | null }>(), {
  category: null,
});

const topics = ref<Topic[]>([]);

onMounted(async () => {
  const result = await getAllTopics(props.category);

  console.log(result);

  if (result.status < 300) {
    topics.value = result.data;
  }

  console.log(result.data);
});
</script>

<style scoped>
.frame {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  column-gap: 10px;
  row-gap: 1em;
}

@media screen and (max-width: 600px) {
  .frame {
    grid-template-columns: unset;
  }
}
</style>
