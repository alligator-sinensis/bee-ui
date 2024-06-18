<template>
  <bee-doc-demo-section>
    <pre>{{ state }}</pre>
    <bee-doc-demo-block title="基础用法">
      <bee-input-number v-model="state.value1" placeholder="请输入" />
      <!-- <bee-input-number v-model="state.value1" input-number placeholder="请输入" /> -->
    </bee-doc-demo-block>
    <!-- <bee-doc-demo-block title="禁用和只读">
      <bee-input-number v-model="state.value1" disabled />
      <bee-input-number v-model="state.value1" readonly />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="尺寸">
      <bee-input-number v-model="state.value1" size="large" />
      <bee-input-number v-model="state.value1" />
      <bee-input-number v-model="state.value1" size="small" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="一键清空">
      <bee-input-number v-model="state.value1" clearable />
      <bee-input-number v-model="state.value1" clear-trigger="always" clearable />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="密码框">
      <bee-input-number v-model="state.value1" password />
      <bee-input-number v-model="state.value1" show-password />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="输入长度显示">
      <bee-input-number v-model="state.value1" show-word-limit />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="带图标的输入框">
      <bee-input-number
        v-model="state.value1"
        prefix-icon="search-line"
        suffix-icon="calendar-2-line"
      />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="插槽">
      <bee-input-number
        v-model="state.value1"
        prefix-icon="search-line"
        suffix-icon="calendar-2-line"
      >
        <template #prefix> prefix </template>
        <template #suffix> suffix </template>
      </bee-input-number>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="测试">
      <bee-input-number
        v-model="state.value1"
        clearable
        prefix-icon="search-line"
        show-password
        show-word-limit
        suffix-icon="calendar-2-line"
        @blur="showToast('blur')"
        @click="showToast('click')"
        @click-input="showToast('click-input')"
        @confirm="showToast('confirm')"
        @focus="showToast('focus')"
        @input="showToast('input')"
      >
        <template #prefix> prefix </template>
        <template #suffix> suffix </template>
      </bee-input-number>

      <bee-input-number
        v-model="state.value1"
        prefix-icon="search-line"
        style="width: 200px"
        suffix-icon="calendar-2-line"
      />
      <bee-button>小蜜蜂</bee-button>
    </bee-doc-demo-block> -->
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const state = reactive({
  value1: undefined,
})

const showToast = (title) => {
  console.log(title)
  uni.showToast({
    icon: "none",
    title,
  })
}
</script>

<style scoped lang="scss"></style>
