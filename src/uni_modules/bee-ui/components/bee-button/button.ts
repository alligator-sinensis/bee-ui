import type { ThemeType, ComponentSize } from "../../constants"

export type ButtonProps = {
  size?: ComponentSize
  type?: ThemeType
  plain?: boolean // 朴素按钮
  round?: boolean // 圆角按钮
  circle?: boolean // 圆形按钮
  square?: boolean // 方形按钮
  loading?: boolean
  disabled?: boolean
  to?: string
  replace?: boolean
  icon?: string
  iconPosition?: "left" | "right"
}

export const buttonPropDefaults: ButtonProps = {
  size: "middle",
  plain: false,
  round: false,
  circle: false,
  square: false,
  loading: false,
  disabled: false,
  to: "",
  replace: false,
  icon: "",
  iconPosition: "left",
}
