export const themeTypes = ["primary", "success", "info", "warning", "danger"] as const

export type ThemeType = (typeof themeTypes)[number]
