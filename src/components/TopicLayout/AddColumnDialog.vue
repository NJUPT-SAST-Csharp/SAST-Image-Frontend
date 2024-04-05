<template>
  <ElDialog v-model="model" destroy-on-close title="Add New Column">
    <ElForm>
      <ElFormItem label="Column Description">
        <ElInput
          v-model="data.text"
          type="textarea"
          autosize
          placeholder="Optional"
        ></ElInput>
      </ElFormItem>
      <ElUpload
        :data="data"
        :auto-upload="false"
        name="images"
        :http-request="customRequest"
        ref="uploadRef"
        list-type="picture"
        multiple
      >
        <ElButton>{{ $t("upload") }}</ElButton>
        <ElButton type="success" @click.stop="submit">
          {{ $t("submit") }}
        </ElButton>
      </ElUpload>
    </ElForm>
  </ElDialog>
</template>

<script setup lang="ts">
import type {
  UploadFile,
  UploadFiles,
  UploadRequestOptions,
} from "element-plus";
import { ref } from "vue";
import { uploadFiles } from "./AxiosHelper";

const model = defineModel<boolean>();
const props = defineProps<{ topic: bigint }>();

const data = ref<{ text: string | null; topicId: bigint }>({
  text: null,
  topicId: props.topic,
});

//存放选中的文件
const fileList = ref<Array<UploadFile>>([]);
//upload组件
const uploadRef = ref<any>(null);
//监听upload组件在文件状态变化时的钩子函数
//主要是将监听到的文件存入fileList （去重了）
function filechange(uploadFile: UploadFile, uploadFiles: UploadFiles) {
  if (fileList.value.length == 0) {
    fileList.value.push(uploadFile);
  }
  let contain = false;
  for (const key in fileList.value) {
    const element = fileList.value[key];
    if (element.name === uploadFile.name && element.size === uploadFile.size) {
      contain = true;
    }
  }
  if (!contain) {
    fileList.value.push(uploadFile);
  }
  //删除upload组件上文件的缓存
  uploadRef.value.handleRemove(uploadFile, uploadFiles);
}
//自定义的上传请求
function customRequest(options: UploadRequestOptions) {
  console.log("customRequest", options);
  if (fileList.value.length > 0) {
    //http 请求
    submit();
    //每次上传之后将文件清空，多个文件上传时，upload组件会多次调用customRequest方法，如果不清空会导致文件多次上传
    fileList.value = [];
  }
}
//上传，uploadFiles是用axios实现的文件上传，函数定义往下看
function submit() {
  //fileList是UploadFile数组,真正上传时不需要他，而是uploadFile.raw
  const files = fileList.value.map((uploadFile) => uploadFile.raw);
  uploadFiles(props.topic, files as unknown as Array<File>);
}
</script>
