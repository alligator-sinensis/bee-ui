import { ProxyOptions } from "vite"

export const getServerProxy = (env: Record<string, string>) => {
  const envDate = getEnvDate(env)
  const { APP_BASEURL_LIST } = envDate
  const list = APP_BASEURL_LIST as any[]
  const res: { [prop: string]: ProxyOptions } = {}
  list.forEach((item) => {
    if (item.proxy) {
      const name = `/proxy-${item.name}`
      res[name] = {
        target: item.value,
        changeOrigin: true,
        rewrite: (path) => path.replace(name, ""),
      }
    }
  })
  return res
}

export const getEnvDate = (env: Record<string, string>) => {
  const res = {}
  for (const key in env) {
    const value = env[key]
    try {
      res[key] = JSON.parse(value)
    } catch (error) {
      res[key] = value
    }
  }
  return res as Record<string, any>
}
