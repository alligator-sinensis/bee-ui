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
  width: var(--loading-icon-size);
  height: var(--loading-icon-size);
  background:
    radial-gradient(farthest-side at left, var(--c)) right / 50% 100%,
    radial-gradient(farthest-side at top, var(--c)) bottom/100% 50%;
  background-repeat: no-repeat;
  animation: l18-0 2s infinite linear 0.25s;

  --c: #0000 calc(100% - 20px), currentColor calc(100% - 19px) 98%, #0000;

  &::before {
    width: 50%;
    height: 50%;
    background: radial-gradient(farthest-side at bottom right, var(--c));
    animation: l18-1 0.5s infinite linear;
    content: "";
  }
}

@keyframes l18-0 {
  0%,
  12.49% {
    transform: rotate(0deg);
  }

  12.5%,
  37.49% {
    transform: rotate(90deg);
  }

  37.5%,
  62.49% {
    transform: rotate(180deg);
  }

  62.5%,
  87.49% {
    transform: rotate(270deg);
  }

  87.5%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes l18-1 {
  0% {
    transform: perspective(150px) rotateY(0) rotate(0);
  }

  50% {
    transform: perspective(150px) rotateY(180deg) rotate(0);
  }

  80%,
  100% {
    transform: perspective(150px) rotateY(180deg) rotate(90deg);
  }
}
</style>
