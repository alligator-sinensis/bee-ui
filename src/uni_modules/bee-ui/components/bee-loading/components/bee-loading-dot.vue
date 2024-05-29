<template>
  <div class="bee-loading__icon"></div>
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
  --_g: no-repeat radial-gradient(farthest-side, currentColor 94%, transparent);
  display: inline-block;
  width: var(--loading-icon-size);
  aspect-ratio: 1;
  background:
    var(--_g) 0 0,
    var(--_g) 100% 0,
    var(--_g) 100% 100%,
    var(--_g) 0 100%;
  background-size: 40% 40%;
  animation: l38 0.5s infinite;
}
@keyframes l38 {
  100% {
    background-position:
      100% 0,
      100% 100%,
      0 100%,
      0 0;
  }
}
</style>
