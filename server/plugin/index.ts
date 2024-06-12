import { PluginOption } from "vite"
// import { pluginAutoImport } from "./autoImport"
import { pluginUni } from "./uni"
import { pluginComponents } from "./components"

export const getPlugins = (): PluginOption[] => {
  return [
    pluginComponents(),
    pluginUni(),
    // pluginAutoImport()
  ]
}
