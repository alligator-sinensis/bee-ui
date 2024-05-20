import { defineStore } from "pinia"

export const useStoreUser = defineStore(
  "store-user",
  () => {
    const token = ref()

    return {
      token,
    }
  },
  {
    persist: {
      paths: ["token"],
    },
  },
)
