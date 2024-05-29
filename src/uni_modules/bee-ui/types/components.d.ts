import "@vue/runtime-core"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    BeeButton: (typeof import("./../components/bee-button/bee-button.vue"))["default"]
    BeeIcon: (typeof import("./../components/bee-icon/bee-icon.vue"))["default"]
    BeeLoading: (typeof import("./../components/bee-loading/bee-loading.vue"))["default"]
    BeeTransition: (typeof import("./../components/bee-transition/bee-transition.vue"))["default"]
  }
}
