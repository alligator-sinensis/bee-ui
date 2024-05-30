<template>
  <bee-transition
    class="bee-overlay"
    :show="show"
    @click="emit('click', $event)"
    @touchmove.prevent
  >
    <slot></slot>
  </bee-transition>
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
    show?: boolean
    zIndex: number | string
    duration: number | string
  }>(),
  {
    show: false,
    zIndex: 1,
    duration: "0.3",
  },
)

const emit = defineEmits(["click"])

const getDuration = computed(() => `${props.duration}s`)
</script>

<style scoped lang="scss">
.bee-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: v-bind(zIndex);
  width: 100%;
  height: 100%;
  background: var(--bee-overlay-background-color);
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
