// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pascal } = require("radash")

const components = fs.readdirSync("src/uni_modules/bee-ui/components")
const componentTypes = components
  .map((component) => {
    return `    ${pascal(component)}: (typeof import("./../components/${component}/${component}.vue"))["default"]`
  })
  .join("\n")

const content = `import "@vue/runtime-core"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
${componentTypes}
  }
}
`

const filename = "src/uni_modules/bee-ui/types/components.d.ts"

fs.writeFileSync(filename, content, {
  encoding: "utf8",
})
