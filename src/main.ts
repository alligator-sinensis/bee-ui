import { createSSRApp } from "vue"
import App from "./App.vue"
import store from "./store"
import "remixicon/fonts/remixicon.css"
import "./style/index.scss"

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
  }
}
