<template>
  <bee-doc-demo-section background-color="#f0f0f0">
    <view style="height: 10px" />
    <bee-cell
      v-for="(item, index) in pages.subPackages[0].pages"
      :key="index"
      arrow
      :title="item.style.navigationBarTitleText"
      :to="`/${pages.subPackages[0].root}/${item.path}`"
    />
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import pages from "@/pages.json"
</script>

<style scoped lang="scss"></style>
