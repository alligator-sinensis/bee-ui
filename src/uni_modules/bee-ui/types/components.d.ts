import "@vue/runtime-core"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    BeeButton: (typeof import("./../components/bee-button/bee-button.vue"))["default"]
    BeeCell: (typeof import("./../components/bee-cell/bee-cell.vue"))["default"]
    BeeIcon: (typeof import("./../components/bee-icon/bee-icon.vue"))["default"]
    BeeLoading: (typeof import("./../components/bee-loading/bee-loading.vue"))["default"]
    BeeOverlay: (typeof import("./../components/bee-overlay/bee-overlay.vue"))["default"]
    BeePopup: (typeof import("./../components/bee-popup/bee-popup.vue"))["default"]
    BeeTransition: (typeof import("./../components/bee-transition/bee-transition.vue"))["default"]
  }
}
