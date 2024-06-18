<template>
  <bee-doc-demo-section>
    <!-- <pre>{{ state }}</pre> -->
    <view> value1:{{ state.value1 }}</view>
    <bee-doc-demo-block title="基础用法">
      <bee-input-number
        v-model="state.value1"
        :empty-value="0"
        :max="10"
        :min="-5"
        placeholder="请输入"
        :precision="5"
      />
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const state = reactive({
  value1: "-1w",
})
</script>

<style scoped lang="scss"></style>
