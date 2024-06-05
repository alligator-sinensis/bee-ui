export const componentSizes = ["large", "middle", "small", "mini"] as const

export type ComponentSize = (typeof componentSizes)[number]

export const componentSizeMap = {
  large: 42,
  middle: 36,
  small: 28,
  mini: 20,
} as const
