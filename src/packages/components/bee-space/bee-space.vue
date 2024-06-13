<template>
  <view
    class="bee-space"
    :class="[`bee-space--${direction}`, { 'is-wrap': wrap }, { 'is-fill': fill }]"
    :style="getStyle"
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
import { computed } from "vue"

const props = withDefaults(
  defineProps<{
    direction?: "vertical" | "horizontal"
    size?: number | string | number[] | string[]
    // https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
    align?: "stretch" | "flex-start" | "center" | "flex-end"
    wrap?: boolean
    // 是否让 Space 变为一个块级元素，填充整个父元素
    fill?: boolean
    spacer?: string | number
  }>(),
  {
    direction: "horizontal",
    size: "8px",
    wrap: false,
    align: "stretch",
    fill: false,
    spacer: "",
  },
)

const getStyle = computed(() => {
  const { size, align } = props
  const res = {
    "align-items": align,
  }
  if (Array.isArray(size)) {
    res["column-gap"] = size[0]
    res["row-gap"] = size[1]
  } else {
    res["gap"] = size
  }
  return res
})
</script>

<style scoped lang="scss">
.bee-space {
  display: inline-flex;

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
  }

  &.is-wrap {
    flex-wrap: wrap;
  }

  &.is-fill {
    display: flex;
  }
}
</style>
