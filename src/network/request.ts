import axios, { type AxiosRequestHeaders, type AxiosResponse } from "axios"; // 使用前要先安装依赖：npm install axios
import useAuthStore from "@/stores/auth";

// 创建axios实例
const service = axios.create({
  withCredentials: false, // 跨域请求时是否需要访问凭证
  timeout: 5 * 1000, // 请求超时时间
  // headers: { // 请求头
  // 	...
  // }
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 这里可以进行请求加密等操作。如添加token,cookie，修改数据传输格式等
    const auth = useAuthStore();
    config.headers["Authorization"] = `Bearer ${auth.getToken()}`;
    return config;
  },
  (error) => {
    // 发送请求时出了点问题
    console.log("Error", error.message);
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return error.response;
  },
);

const http = {
  // GET 封装
  async get(
    url: string,
    params: object = {},
  ): Promise<{ status: number; data: any }> {
    const config = {
      method: "GET",
      url: url,
      params: params ? params : {},
    };
    const response = await service(config);

    return {
      status: response.status,
      data:
        response.status >= 300 || response.status == 204
          ? response.data
          : response.data,
    };
  },
  // POST 封装
  async post(
    url: string,
    data: object,
  ): Promise<{ status: number; data: any }> {
    const config = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data ? data : {},
    };
    const response = await service(config);
    return {
      status: response.status,
      data:
        response.status >= 300 || response.status == 204
          ? response.data
          : response.data,
    };
  },

  // POST-FORM 封装
  async form(
    url: string,
    data: object = {},
  ): Promise<{ status: number; data: any }> {
    const config = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data ? data : {},
    };
    const response = await service(config);
    return {
      status: response.status,
      data:
        response.status >= 300 || response.status == 204
          ? response.data
          : response.data.data,
    };
  },

  // DELETE 封装
  async delete(
    url: string,
    params: object = {},
  ): Promise<{ status: number; data: any }> {
    const config = {
      method: "DELETE",
      url: url,
      params: params ? params : {},
    };
    const response = await service(config);
    return {
      status: response.status,
      data:
        response.status >= 300 || response.status == 204
          ? response.data
          : response.data.data,
    };
  },
  // PUT 封装
  async put(url: string, data: object): Promise<{ status: number; data: any }> {
    const config = {
      method: "PUT",
      url: url,
      data: data ? data : {},
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await service(config);
    return {
      status: response.status,
      data:
        response.status >= 300 || response.status == 204
          ? response.data
          : response.data.data,
    };
  },
};

export default http;
