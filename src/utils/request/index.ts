import LuchRequest from "luch-request"
import type { HttpRequestConfig } from "luch-request"
import { requestInterceptor } from "./requestInterceptor"
import { responseInterceptor } from "./responseInterceptor"

const instance = new LuchRequest({
  // baseURL: import.meta.env.VITE_API_ORIGIN, //设置请求的base url
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => requestInterceptor(config),
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => responseInterceptor(response, instance),
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  },
)

export const request = async <T = any>(config: HttpRequestConfig) => {
  return instance.request(config).then((res) => {
    return res as T
  })
}
