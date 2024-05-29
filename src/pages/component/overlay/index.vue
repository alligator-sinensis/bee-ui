<template>
  <bee-doc-demo-section>
    <bee-doc-demo-block title="基础用法">
      <bee-button @click="show = true">展示弹出层</bee-button>
      <bee-overlay :show="show" @tap="show = false">内容</bee-overlay>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const show = ref(false)
</script>

<style scoped lang="scss"></style>
