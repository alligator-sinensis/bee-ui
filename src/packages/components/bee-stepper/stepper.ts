import type { InputNumberProps } from "../bee-input-number/inputNumber"

export type StepperProps = {
  step?: number
} & InputNumberProps

export const stepperPropsPropDefaults: StepperProps = {
  size: "middle",
}
