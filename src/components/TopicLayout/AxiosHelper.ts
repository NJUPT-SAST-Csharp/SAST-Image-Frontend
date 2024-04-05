import useAuthStore from "@/stores/auth";
import axios from "axios";

export function uploadFiles(topic: bigint, option: Array<File>) {
  console.log("set", option);
  //浏览器对于文件上传默认会将文件拆分，分多次http请求服务器，
  //如果想要一次上传所有的文件，需要借助FormData对象，
  //同时此对象可以添加其他的参数，
  const formData = new FormData();
  option.forEach((file) => {
    console.log(file);
    formData.append("image", file);
  });

  return upload({
    url: `api/square/topic/${topic}/column`,
    formData,
  });
}

//axios请求
function upload(option: any) {
  const auth = useAuthStore();

  return axios.post(
    option.url,
    { Images: option.formData },
    {
      headers: {
        Authorization: "Bearer " + auth.getToken(),
        "Content-Type": "multipart/form-data",
      },
      baseURL: "http://localhost:8064",
    },
  );
}
