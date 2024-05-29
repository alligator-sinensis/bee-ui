<template>
  <view class="bee-loading__icon" />
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bee-loading__icon {
  aspect-ratio: 1;
  width: var(--loading-icon-size);
  padding: calc(0.1 * var(--loading-icon-size));
  background: currentColor;
  border-radius: 50%;

  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
  box-sizing: border-box;
  display: inline-block;
}

@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
