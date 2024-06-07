<template>
  <view class="bee-loading__icon" />
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: "shared",
  },
}
</script>

<style scoped lang="scss">
.bee-loading__icon {
  display: inline-flex;
  box-sizing: border-box;
  width: var(--loading-icon-size);
  background:
    radial-gradient(circle calc(0.08 * var(--loading-icon-size)), currentColor 95%, #0000),
    linear-gradient(currentColor 50%, #0000 0) 50% / calc(0.08 * var(--loading-icon-size)) 60%
      no-repeat;
  border: calc(0.08 * var(--loading-icon-size)) solid;
  border-radius: 50%;
  animation: l1 2s infinite linear;
  aspect-ratio: 1;

  &::before {
    flex: 1;
    background: linear-gradient(currentColor 50%, #0000 0) 50% /
      calc(0.06 * var(--loading-icon-size)) 80% no-repeat;
    animation: inherit;
    content: "";
  }
}

@keyframes l1 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
