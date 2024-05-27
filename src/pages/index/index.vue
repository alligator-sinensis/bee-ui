<template>
  <view>
    <button
      v-for="(item, index) in pages.subPackages[0].pages"
      :key="index"
      block
      @click="to(item)"
    >
      {{ item.style.navigationBarTitleText }}
    </button>
  </view>
</template>

<script setup lang="ts">
import pages from "@/pages.json"

const to = (item) => {
  const url = `/${pages.subPackages[0].root}/${item.path}`
  uni.navigateTo({
    url,
  })
}
</script>

<style scoped lang="scss"></style>
