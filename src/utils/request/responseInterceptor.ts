import type LuchRequest from "luch-request"
import type { HttpResponse } from "luch-request"

export const responseInterceptor = (response: HttpResponse, instance: LuchRequest) => {
  instance // 刷新token用

  const { data } = response
  const { success, code } = data

  if (success) {
    return data
  }

  switch (code) {
    case 401: {
      return data
    }
    default: {
      return Promise.reject(data)
    }
  }
}
