export const componentSizes = ["large", "normal", "small", "mini"] as const

export type ComponentSize = (typeof componentSizes)[number]

export const componentSizeMap = {
  large: 44, // 16
  normal: 36, // 14
  small: 28, // 12
  mini: 20, // 10
} as const
