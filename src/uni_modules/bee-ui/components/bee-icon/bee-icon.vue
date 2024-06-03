<template>
  <view
    class="bee-icon"
    :class="getClassList"
    :style="{
      '--color': color,
      '--font-size': size,
    }"
  >
    <image v-if="isImage" class="bee-icon__image" mode="aspectFit" :src="name" />
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
    name: string
    color?: string
    size?: string
    prefix?: string
  }>(),
  {
    color: "inherit",
    size: "inherit",
    prefix: "ri",
  },
)

const isImage = computed(() => props.name?.includes("/"))

const getClassList = computed(() => {
  const { prefix, name } = props
  const res: string[] = []
  if (!isImage.value) {
    res.push(prefix)
    res.push(`${prefix}-${name}`)
  }
  return res
})
</script>

<style lang="scss" scoped>
@import "remixicon/fonts/remixicon.css";

.bee-icon {
  display: inline-block;
  color: var(--color);
  font-size: var(--font-size);
  line-height: 1;
  vertical-align: middle;

  &::before {
    display: inline-block;
  }

  &__image {
    display: block;
    width: 1em;
    height: 1em;
  }
}
</style>
