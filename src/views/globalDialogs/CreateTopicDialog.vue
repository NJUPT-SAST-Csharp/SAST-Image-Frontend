<template>
  <ElDialog
    destroy-on-close
    v-model="dialogs.createTopicDialogStatus"
    title="Create new topic"
    width="400"
  >
    <ElForm>
      <ElFormItem>
        <ElInput v-model="title" placeholder="Title" type="text" />
      </ElFormItem>
      <ElFormItem>
        <ElInput v-model="description" placeholder="Description" type="text" />
      </ElFormItem>
      <ElFormItem>
        <ElSelect v-model="category">
          <ElOption
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submit">Submit</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useDialogStore from "@/stores/dialogs";
import useCategoriesStore from "@/stores/category";
import createTopic from "@/network/apis/topic/CreateTopic";

const dialogs = useDialogStore();
const categories = ref<{ id: number; name: string }[]>();

const description = ref("");
const title = ref("");
const category = ref<{ id: number; name: string }>();

const submit = async () => {
  await createTopic({
    title: title.value,
    description: description.value,
    categoryId: category.value!.id,
  });
};

onMounted(async () => {
  categories.value = (await useCategoriesStore().getAsync()).value;
});
</script>
