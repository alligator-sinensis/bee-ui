<template>
  <div class="bee-loading"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bee-loading {
  --_g: no-repeat radial-gradient(farthest-side, currentColor 94%, transparent);
  display: inline-block;
  width: 1em;
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
