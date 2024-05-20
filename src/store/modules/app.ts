import { defineStore } from "pinia"

export const useStoreApp = defineStore("app", () => {
  const tabbarList = ref([
    {
      title: "首页",
      icon: "ri-home-8-line",
      pagePath: "pages/index/index",
    },
    {
      title: "我的",
      icon: "ri-user-line",
      pagePath: "pages/user/index",
    },
  ])
  return { tabbarList }
})
