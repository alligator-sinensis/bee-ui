<template>
  <view class="bee-loading__icon">
    <view
      v-for="(item, index) in 12"
      :key="index"
      class="bee-loading__icon__line"
      :class="[`bee-loading__icon__line--${index + 1}`]"
    />
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

<style scoped lang="scss">
.bee-loading__icon {
  position: relative;
  display: inline-block;
  width: var(--loading-icon-size);
  height: var(--loading-icon-size);
  vertical-align: middle;
  animation: rotate 0.8s linear infinite;
  animation-timing-function: steps(12);

  .bee-loading__icon__line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      display: block;
      width: calc(var(--loading-icon-size) * 0.04);
      height: 25%;
      margin: 0 auto;
      background-color: currentColor;
      border-radius: 40%;
      content: " ";
    }
  }

  @for $i from 1 through 12 {
    .bee-loading__icon__line--#{$i} {
      transform: rotate($i * 30deg);
      opacity: calc(1 - (0.75 / 12) * ($i - 1));
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
