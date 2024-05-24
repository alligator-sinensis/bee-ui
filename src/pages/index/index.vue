<template>
  <view>
    <z-button
      v-for="(item, index) in componentPages"
      :key="index"
      block
      type="primary"
      @click="to(item.url)"
    >
      {{ item.label }}
    </z-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const componentPages = ref([
  {
    label: "Transition 动画",
    url: "/pages/component/transition/index",
  },
  {
    label: "Button 按钮",
    url: "/pages/component/button/index",
  },
  {
    label: "Icon 图标",
    url: "/pages/component/icon/index",
  },
])

const to = (url) => {
  uni.navigateTo({
    url,
  })
}
</script>

<style scoped lang="scss"></style>
