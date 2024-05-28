<template>
  <view class="bee-loading" />
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bee-loading {
  display: inline-flex;
  width: 1em;
  background:
    linear-gradient(currentColor 0 0) right / 51% 100%,
    linear-gradient(currentColor 0 0) bottom / 100% 51%;
  background-repeat: no-repeat;
  animation: l16-0 2s infinite linear 0.25s;
  aspect-ratio: 1;

  &::before {
    width: 50%;
    height: 50%;
    background: currentColor;
    animation: l16-1 0.5s infinite linear;
    content: "";
  }
}

@keyframes l16-0 {
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

@keyframes l16-1 {
  0% {
    transform: perspective(80px) rotate3d(-1, -1, 0, 0);
  }

  80%,
  100% {
    transform: perspective(80px) rotate3d(-1, -1, 0, -180deg);
  }
}
</style>
