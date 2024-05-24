<template>
  <view
    class="bee-icon"
    :class="[`ri-${name}`]"
    :style="{
      color,
      fontSize: size,
    }"
  />
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
}
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    color?: string
    size?: string
  }>(),
  {
    color: "inherit",
    size: "inherit",
  },
)
</script>

<style scoped lang="scss">
@import "remixicon/fonts/remixicon.css";

.bee-icon {
  display: inline-block;
  line-height: 1;

  &::before {
    display: inline-block;
  }
}
</style>
