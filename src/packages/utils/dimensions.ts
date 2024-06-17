import isNumber from "is-number"

export function getDimensions(dimensions: string | number, unit = "px") {
  if (isNumber(dimensions)) {
    return `${dimensions}${unit}`
  }
  return dimensions
}
