import { createPinia } from "pinia"
import { createPersistedState } from "pinia-plugin-persistedstate"

const pinia = createPinia()
pinia.use(
  createPersistedState({
    storage: {
      getItem(key: string) {
        return uni.getStorageSync(key)
      },
      setItem(key, value) {
        uni.setStorageSync(key, value)
      },
    },
  }),
)

export default pinia
