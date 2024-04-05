<template>
  <div class="container" @click="toDetailView">
    <div class="title">{{ topic.title }}</div>
    <div class="info">
      <span>
        <ElIcon><Bell /></ElIcon> 2.2w
      </span>
      <a>
        <ElIcon><Calendar /></ElIcon>
        {{ date.toLocaleTimeString() }}
        {{ date.toLocaleDateString() }}
      </a>
    </div>

    <ElEmpty
      style="zoom: 0.6"
      description=" "
      v-if="topic.previews.length === 0"
    ></ElEmpty>

    <ElCarousel
      v-else
      @change="(key: number) => (currentKey = key)"
      ref="carouselRef"
      class="carousel"
      indicator-position="none"
      :interval="3000"
      type="card"
      height="auto"
    >
      <ElCarouselItem
        style="height: auto"
        v-for="(item, index) in topic.previews"
        :key="item"
        @click.stop="trigger(index)"
      >
        <div class="topic-image">
          <ElImage fit="cover" :src="item" />
        </div>
      </ElCarouselItem>
    </ElCarousel>
  </div>
</template>

<script setup lang="ts">
import type { Topic } from "@/network/apis/topic/GetAllTopics";
import router from "@/router";
import { onMounted, ref } from "vue";

const props = defineProps<{ topic: Topic }>();

const date = new Date(props.topic.updatedAt);

const carouselRef = ref();

let currentKey = 0;

onMounted(() => {
  setTimeout(() => {
    carouselRef.value?.next();
  }, 100);
});

const trigger = (index: number) => {
  if (currentKey == index) {
    toDetailView();
  }
};

const toDetailView = () => {
  router.push("/topic/" + props.topic.topicId);
};
</script>

<style scoped>
.title {
  margin: 5px;
  font-size: 24px;
  font-weight: 400;
}

.container {
  cursor: pointer;
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

.container:hover > .info {
  opacity: 1;
}

.topic-image {
  max-height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
}

.topic-image:hover {
  transform: scale(1.02);
  z-index: 233;
}

.carousel {
  min-height: 100px;
}

.info {
  opacity: 0.3;
  width: 100%;
  height: 20px;
  display: inline-block;
  margin: 10px;
  transition: 0.3s;
}

.info a {
  margin-left: 10%;
  font-size: small;
  color: grey;
}
</style>
