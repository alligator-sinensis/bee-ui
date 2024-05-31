<template>
  <bee-overlay
    v-if="overlay"
    :duration="duration"
    :show="show"
    :z-index="zIndex"
    @click="clickOverLay"
  />
  <bee-transition
    class="bee-popup"
    :class="[`bee-popup__${position}`]"
    :show="show"
    :style="{
      '--bee-popup-duration': `${props.duration}s`,
    }"
  >
    <bee-icon
      v-if="closeable"
      class="bee-popup__close-icon"
      color="var(--bee-popup-close-icon-color)"
      name="close-large-line"
      size="var(--bee-popup-close-icon-size)"
      @click="show = false"
    />
    <slot></slot>
  </bee-transition>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: "shared",
  },
}
</script>

<script setup lang="ts">
import { useVModel } from "@vueuse/core"

const props = withDefaults(
  defineProps<{
    show?: boolean
    overlay?: boolean
    position?: "center" | "top" | "bottom" | "right" | "left"
    duration?: string | number
    zIndex?: string | number
    round?: boolean
    closeOnClickOverlay?: boolean
    closeable?: boolean
    beforeClose?: (action: string) => boolean | Promise<boolean>
    // 是否在初始渲染时启用过渡动画
    transitionAppear?: boolean
    safeAreaInsetTop?: false
    safeAreaInsetBottom?: false
  }>(),
  {
    show: false,
    overlay: true,
    position: "center",
    duration: "0.3",
    zIndex: 2000,
    round: false,
    closeOnClickOverlay: true,
    closeable: false,
    transitionAppear: false,
    safeAreaInsetTop: false,
    safeAreaInsetBottom: false,
  },
)
const emit = defineEmits(["update:show"])
const show = useVModel(props, "show", emit)

const clickOverLay = () => {
  console.log("clickOverLay")
  if (props.closeOnClickOverlay) {
    show.value = false
  }
}
</script>

<style scoped lang="scss">
.bee-popup {
  position: fixed;
  z-index: v-bind(zIndex);
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;
  background-color: var(--bee-popup-background-color);

  &__close-icon {
    position: absolute;
    top: var(--bee-popup-close-icon-margin);
    right: var(--bee-popup-close-icon-margin);
  }

  &__center {
    width: fit-content;
    max-width: calc(100vw - 2 * var(--bee-padding-md));
    height: fit-content;
    margin: auto;
    transform: scale(1);
    inset: 0;

    &.bee-enter-active,
    &.bee-leave-active {
      transition: all var(--bee-popup-duration) ease;
    }

    &.bee-enter-from,
    &.bee-leave-to {
      transform: scale(0);
    }
  }

  &__top {
    top: 0;
    right: 0;
    left: 0;

    &.bee-enter-active,
    &.bee-leave-active {
      transition: all var(--bee-popup-duration) ease;
    }

    &.bee-enter-from,
    &.bee-leave-to {
      transform: translateY(-100%);
    }
  }

  &__bottom {
    right: 0;
    bottom: 0;
    left: 0;

    &.bee-enter-active,
    &.bee-leave-active {
      transition: all var(--bee-popup-duration) ease;
    }

    &.bee-enter-from,
    &.bee-leave-to {
      transform: translateY(100%);
    }
  }

  &__left {
    top: 0;
    bottom: 0;
    left: 0;

    &.bee-enter-active,
    &.bee-leave-active {
      transition: all var(--bee-popup-duration) ease;
    }

    &.bee-enter-from,
    &.bee-leave-to {
      transform: translateX(-100%);
    }
  }

  &__right {
    top: 0;
    right: 0;
    bottom: 0;

    &.bee-enter-active,
    &.bee-leave-active {
      transition: all var(--bee-popup-duration) ease;
    }

    &.bee-enter-from,
    &.bee-leave-to {
      transform: translateX(100%);
    }
  }
}
</style>
