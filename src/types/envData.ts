export interface EnvDataAppBaseURLItem {
  name: string
  value: string
  proxy?: boolean
}

export interface EnvData {
  VITE_BASEURL_LIST: EnvDataAppBaseURLItem[]
}
