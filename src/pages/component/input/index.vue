<template>
  <bee-doc-demo-section>
    <pre>{{ state }}</pre>
    <bee-doc-demo-block title="基础用法">
      <bee-input v-model="state.value1" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="尺寸">
      <bee-input v-model="state.value1" size="large" />
      <bee-input v-model="state.value1" />
      <bee-input v-model="state.value1" size="small" />
      <bee-input v-model="state.value1" size="mini" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="带图标的输入框">
      <bee-input v-model="state.value1" prefix-icon="search-line" suffix-icon="calendar-2-line" />
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const state = reactive({
  value1: undefined,
})
</script>

<style scoped lang="scss">
.bee-input {
  margin-bottom: 10px;
}
</style>
