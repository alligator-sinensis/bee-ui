import type { EnvData } from "@/types/envData"

const generateEnvData = () => {
  const res = {}
  const env = import.meta.env
  for (const key in env) {
    const value = env[key]
    try {
      res[key] = JSON.parse(value)
    } catch (error) {
      res[key] = value
    }
  }
  return res as EnvData
}

const envData = generateEnvData()

export const getEnvData = () => envData

export const getBaseURL = (name = "api") => {
  const { VITE_BASEURL_LIST } = envData
  const { DEV } = import.meta.env
  const find = VITE_BASEURL_LIST.find((item) => item.name === name)
  if (!find) return ""
  if (DEV && find.proxy) {
    const res = `/proxy-${find.name}`
    return res
  }
  return find.value
}
