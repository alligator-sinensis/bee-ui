<template>
  <bee-overlay :duration="duration" :show="show" :z-index="zIndex" @click="clickOverLay" />
  <bee-transition class="bee-popup" :show="show">
    <slot></slot>
  </bee-transition>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core"
import { computed } from "vue"

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
    overlay: false,
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

const getDuration = computed(() => `${props.duration}s`)

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
  -webkit-overflow-scrolling: touch;
}

.bee-enter-active,
.bee-leave-active {
  transition: opacity v-bind(getDuration);
}

.bee-enter-from,
.bee-leave-to {
  opacity: 0;
}
</style>
