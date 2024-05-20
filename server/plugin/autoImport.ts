import AutoImport from "unplugin-auto-import/vite"

export function pluginAutoImport() {
  return AutoImport({
    dts: "src/types/auto-imports.d.ts",
    dirs: [
      "src/store/modules",
      //   "./src/hooks",
      //   "./src/utils/**",
    ],
    eslintrc: {
      enabled: true,
      filepath: ".eslintrc-auto-import.json",
      globalsPropValue: true,
    },
    imports: ["vue", "uni-app"],
    resolvers: [],
  })
}
