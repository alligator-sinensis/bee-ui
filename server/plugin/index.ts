import { PluginOption } from "vite"
// import { pluginAutoImport } from "./autoImport"
import { pluginUni } from "./uni"

export const getPlugins = (): PluginOption[] => {
  return [
    pluginUni(),
    // pluginAutoImport()
  ]
}
