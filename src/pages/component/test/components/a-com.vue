<template>
  <view class="a-com"
    >a-com
    <view class="aaa">aaa</view>
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
<script setup lang="ts"></script>

<style scoped lang="scss">
.a-com {
  font-size: 30px;

  .aaa {
    color: red;
  }
}
</style>
