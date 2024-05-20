import fs from "node:fs"
import { resolve } from "node:path"
import chalk from "chalk"
import { loadEnv } from "vite"
import { envDir, envDataFileName, outDir, envPrefix } from "../config/index.json"
import { getEnvDate } from "../utils"

const env = loadEnv(process.env.NODE_ENV, envDir, envPrefix)
const envVars = getEnvDate(env)
const content = `${JSON.stringify(envVars, null, 2)}`
const fileName = envDataFileName
const file = resolve(outDir, fileName)

// 同步执行
console.log(chalk.yellow(`====  ${fileName}写入 - 开始 ====`))
console.time("time")
try {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  fs.writeFileSync(file, content)
  console.log(chalk.green(`====  ${fileName}写入 - 完成 ====.\n`))
} catch (error) {
  console.log(chalk.green(`====  ${fileName}写入 - 失败 ====.\n`))
} finally {
  console.timeEnd("time")
}
