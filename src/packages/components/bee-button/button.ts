import type { ThemeType, ComponentSize } from "../../constants"

export type ButtonProps = {
  size?: ComponentSize
  type?: ThemeType
  plain?: boolean // 朴素按钮
  round?: boolean // 圆角按钮
  circle?: boolean // 圆形按钮
  square?: boolean // 方形按钮
  block?: boolean
  loading?: boolean
  disabled?: boolean
  to?: string
  replace?: boolean
  icon?: string
  iconPrefix?: string
  iconPosition?: "left" | "right"
  background?: string
  click?: ((event: MouseEvent) => Promise<any>) | ((event: MouseEvent) => any)
}

export const buttonPropDefaults: ButtonProps = {
  size: "middle",
  plain: false,
  round: false,
  circle: false,
  square: false,
  block: false,
  loading: false,
  disabled: false,
  replace: false,
  icon: "",
  iconPosition: "left",
}
