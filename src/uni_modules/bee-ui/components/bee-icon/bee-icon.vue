<template>
  <view
    class="bee-icon"
    :class="[{ [`${classPrefix}-${name}`]: !isImage }]"
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
    classPrefix?: string
  }>(),
  {
    color: "inherit",
    size: "inherit",
    classPrefix: "ri",
  },
)

const isImage = computed(() => props.name?.includes("/"))
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
