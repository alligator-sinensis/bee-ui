<template>
  <bee-overlay :duration="duration" :show="show" :z-index="zIndex" @click="clickOverLay" />
  <view class="bee-popup">bee-popup</view>
</template>

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
// const show = useVModel(props, "show", emit)

// const clickOverLay = () => {
//   console.log("clickOverLay")
//   if (props.closeOnClickOverlay) {
//     show.value = false
//   }
// }

const show = useVModel(props, "show", emit)

console.log(useVModel)
</script>

<style scoped lang="scss"></style>
