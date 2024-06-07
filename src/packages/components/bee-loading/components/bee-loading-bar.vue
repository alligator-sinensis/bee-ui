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
  --c: no-repeat linear-gradient(currentColor 0 0);

  display: inline-block;
  width: var(--loading-icon-size);
  background: var(--c), var(--c), var(--c), var(--c), var(--c), var(--c);
  animation:
    l14-1 0.5s infinite alternate,
    l14-2 2s infinite;
  aspect-ratio: 1;
}

@keyframes l14-1 {
  0%,
  10% {
    background-size: 20% 100%;
  }

  100% {
    background-size: 20% 20%;
  }
}

@keyframes l14-2 {
  0%,
  49.9% {
    background-position:
      0 0,
      0 100%,
      50% 50%,
      50% 50%,
      100% 0,
      100% 100%;
  }

  50%,
  100% {
    background-position:
      0 50%,
      0 50%,
      50% 0,
      50% 100%,
      100% 50%,
      100% 50%;
  }
}
</style>
