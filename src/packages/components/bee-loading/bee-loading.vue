<template>
  <view class="bee-loading" :class="[`bee-loading__${direction}`]">
    <view v-if="hasCustomIcon" class="bee-loading__custom-icon is-loading">
      <slot name="icon"> </slot>
    </view>
    <template v-else>
      <BeeLoadingDot v-if="type === 'dot'" />
      <BeeLoadingBar v-if="type === 'bar'" />
      <BeeLoadingClock v-if="type === 'clock'" />
      <BeeLoadingSpinner v-if="type === 'spinner'" />
      <BeeLoadingCircular v-if="type === 'circular'" />
      <BeeLoadingCircular2 v-if="type === 'circular-2'" />
      <BeeLoadingFlippingSquare v-if="type === 'flipping-square'" />
      <BeeLoadingFlippingCircle v-if="type === 'flipping-circle'" />
    </template>
    <view v-if="hasContentText" class="bee-loading__text">
      <slot></slot>
    </view>
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
import { computed, useSlots } from "vue"
import BeeLoadingDot from "./components/bee-loading-dot.vue"
import BeeLoadingBar from "./components/bee-loading-bar.vue"
import BeeLoadingSpinner from "./components/bee-loading-spinner.vue"
import BeeLoadingClock from "./components/bee-loading-clock.vue"
import BeeLoadingCircular from "./components/bee-loading-circular.vue"
import BeeLoadingCircular2 from "./components/bee-loading-circular-2.vue"
import BeeLoadingFlippingSquare from "./components/bee-loading-flipping-square.vue"
import BeeLoadingFlippingCircle from "./components/bee-loading-flipping-circle.vue"

withDefaults(
  defineProps<{
    color?: string
    size?: string
    type?:
      | "dot"
      | "bar"
      | "clock"
      | "spinner"
      | "circular"
      | "circular-2"
      | "flipping-square"
      | "flipping-circle"

    direction?: "row" | "column"
  }>(),
  {
    color: "var(--bee-loading-spinner-color)",
    size: "var(--bee-loading-spinner-size)",
    type: "circular",
    direction: "row",
  },
)

const slots = useSlots()

const hasContentText = computed(() => !!slots.default)
const hasCustomIcon = computed(() => !!slots.icon)
</script>

<style lang="scss">
.bee-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  &__row {
    gap: var(--bee-padding-sm);
  }

  &__column {
    flex-direction: column;
    gap: var(--bee-padding-sm);
  }

  &__icon {
    :deep() {
      --loading-icon-size: 1em;

      color: v-bind(color);
      font-size: v-bind(size);
      vertical-align: middle;
    }
  }

  &__text {
    color: var(--bee-loading-text-color);
    font-size: var(--bee-loading-text-font-size);
  }

  &__custom-icon {
    display: inline-flex;
    color: v-bind(color);
    font-size: v-bind(size);
  }
}
</style>
