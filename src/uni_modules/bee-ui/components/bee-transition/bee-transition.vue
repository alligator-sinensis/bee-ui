<template>
  <view
    class="bee-transition"
    :class="[...classList, customClass]"
    :style="{
      ...customStyle,
      display: isShow ? 'block' : 'none',
    }"
    @transitionend="onTransitionend"
  >
    <slot></slot>
  </view>
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
import { nextTick, ref, watch } from "vue"

const props = withDefaults(
  defineProps<{
    show?: boolean
    customStyle?: object
    customClass?: string
  }>(),
  {
    show: false,
    customStyle: () => ({}),
  },
)

const emit = defineEmits([
  "before-enter",
  "enter",
  "after-enter",
  "before-leave",
  "leave",
  "after-leave",
])

const isShow = ref(false)
const classList = ref<string[]>([])

watch(
  () => props.show,
  (val) => {
    val ? enter() : leave()
  },
  {
    immediate: true,
  },
)

async function enter() {
  emit("before-enter")
  classList.value = ["bee-enter-active", "bee-enter-from"]
  isShow.value = true
  await nextTick()
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 20)
  })
  classList.value = ["bee-enter-active", "bee-enter-to"]
  emit("enter")
}
async function leave() {
  emit("before-leave")
  classList.value = ["bee-leave-active", "bee-leave-from"]
  await nextTick()
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 20)
  })
  classList.value = ["bee-leave-active", "bee-leave-to"]
  emit("leave")
}

const onTransitionend = () => {
  classList.value = []
  if (props.show) {
    emit("after-enter")
  } else {
    isShow.value = props.show
    emit("after-leave")
  }
}
</script>

<style scoped lang="scss"></style>
