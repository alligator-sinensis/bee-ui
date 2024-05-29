<template>
  <bee-doc-demo-section>
    <bee-doc-demo-block title="基础用法">
      <bee-button @click="visible = true">展示弹出层</bee-button>
      <van-popup v-model:visible="visible">内容</van-popup>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const visible = ref(false)
</script>

<style scoped lang="scss"></style>
