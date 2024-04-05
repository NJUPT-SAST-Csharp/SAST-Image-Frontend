<template>
  <ElEmpty v-if="images.length === 0" description="No images." />
  <div class="frame" v-else></div>
</template>

<script setup lang="ts">
import getUserImages, {
  type UserImageDto,
} from "@/network/apis/image/GetUserImages";
import { onMounted, ref } from "vue";

const props = defineProps<{ userId: number }>();

const images = ref<UserImageDto[]>([]);

onMounted(async () => {
  const response = await getUserImages(props.userId, 0);
  if (response.status < 300) {
    images.value = response.data;
  }
});
</script>

<style scoped lang="css">
.frame {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  column-gap: 10px;
  row-gap: 1em;
}
</style>
