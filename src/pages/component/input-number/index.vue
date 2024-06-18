<template>
  <bee-doc-demo-section>
    <pre>{{ state }}</pre>
    <bee-doc-demo-block title="基础用法">
      <bee-input-number v-model="state.value1" placeholder="请输入" />
      <input v-model="state.value1" placeholder="请输入" />
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const state = reactive({
  value1: "5.5",
})
</script>

<style scoped lang="scss"></style>
