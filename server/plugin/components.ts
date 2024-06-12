import Components, { kebabCase } from "@uni-helper/vite-plugin-uni-components"

export function pluginComponents() {
  return Components({
    dts: "src/packages/types/components.d.ts",
    resolvers: [
      {
        type: "component",
        resolve: (name: string) => {
          console.log(name)

          if (name.match(/^Bee[A-Z]/)) {
            const compName = kebabCase(name)
            return {
              name,
              from: `@/packages/components/${compName}/${compName}.vue`,
            }
          }
        },
      },
    ],
  })
}
