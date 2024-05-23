export const componentSizes = ["large", "middle", "small", "mini"] as const

export type ComponentSize = (typeof componentSizes)[number]

export const componentSizeMap = {
  large: 44, // 16
  middle: 36, // 14
  small: 28, // 12
  mini: 20, // 10
} as const
