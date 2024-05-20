import type { HttpRequestConfig } from "luch-request"
import { getBaseURL } from "@/utils"

export const requestInterceptor = (config: HttpRequestConfig) => {
  const custom = {
    baseURLName: "api",
    ...config.custom,
  }
  console.log(config.custom)

  console.log(custom)

  config.custom = custom
  config.baseURL = getBaseURL(custom.baseURLName)
  const { token } = useStoreUser()
  if (token) config.header!["Authorization"] = token
  return config
}
