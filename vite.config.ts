import { defineConfig } from "vite"
import { getPlugins } from "./server/plugin"

export default defineConfig(() => {
  return {
    plugins: getPlugins(),
    envDir: "env",
    server: {
      port: 4399,
    },
  }
})
