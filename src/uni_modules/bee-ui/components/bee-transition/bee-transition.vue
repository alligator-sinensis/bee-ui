<template>
  <view
    ref="refEl"
    class="bee-transition"
    :class="[...classList, customClass]"
    :style="{
      ...customStyle,
      display: isShow ? 'block' : 'none',
    }"
    @animationend="onTransitionOrAnimationendEnd"
    @transitionend="onTransitionOrAnimationendEnd"
  >
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
}
</script>

<script setup lang="ts">
import { getCurrentInstance, nextTick, ref, watch } from "vue"

const props = withDefaults(
  defineProps<{
    show?: boolean
    customStyle?: object
    customClass?: string
    name?: string
    appear?: boolean
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }>(),
  {
    show: false,
    customStyle: () => ({}),
    name: "bee",
    appear: false,
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

const refEl = ref()
const isShow = ref(props.show)
const classList = ref<string[]>([])

const currentInstance = getCurrentInstance()!

watch(
  () => props.show,
  (val) => {
    val ? enter() : leave()
  },
  {
    immediate: props.appear,
  },
)

// 在获取布局信息操作的时候, 会强制浏览器清空队列进行渲染,H5端API有以下几个: innerHeight、scrollTop、offsetHeight、getBoundingClientRect等等
function queryEl() {
  const query = uni.createSelectorQuery().in(currentInstance)
  query
    .select(".bee-transition")
    .boundingClientRect((rect) => {})
    .exec()
}

async function enter() {
  emit("before-enter")
  classList.value = [
    props.enterActiveClass || `${props.name}-enter-active`,
    props.enterFromClass || `${props.name}-enter-from`,
  ]
  isShow.value = true
  await nextTick()
  queryEl()
  classList.value = [
    props.enterActiveClass || `${props.name}-enter-active`,
    props.enterToClass || `${props.name}-enter-to`,
  ]
  emit("enter")
}

async function leave() {
  emit("before-leave")
  classList.value = [
    props.leaveActiveClass || `${props.name}-leave-active`,
    props.leaveFromClass || `${props.name}-leave-from`,
  ]
  classList.value = [
    props.leaveActiveClass || `${props.name}-leave-active`,
    props.leaveToClass || `${props.name}-leave-to`,
  ]
  emit("leave")
}

const onTransitionOrAnimationendEnd = () => {
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
