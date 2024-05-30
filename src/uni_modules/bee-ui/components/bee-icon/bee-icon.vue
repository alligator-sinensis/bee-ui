<template>
  <view
    class="bee-icon"
    :class="[`${classPrefix}-${name}`]"
    :style="{
      '--color': color,
      '--font-size': size,
    }"
  />
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
withDefaults(
  defineProps<{
    name: string
    color?: string
    size?: string
    classPrefix?: string
  }>(),
  {
    color: "inherit",
    size: "inherit",
    classPrefix: "ri",
  },
)
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
}
</style>
