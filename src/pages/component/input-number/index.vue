<template>
  <bee-doc-demo-section>
    <pre>{{ state }}</pre>
    <bee-doc-demo-block title="基础用法">
      <bee-input-number
        v-model="state.value1"
        :max="10"
        placeholder="请输入"
        @update:modelValue="modelValue"
      />
      <!-- <bee-input-number
        v-model="state.value1"
        :before-change="beforeChange"
        :max="10"
        placeholder="请输入"
      />
      <bee-input-number
        v-model="state.value1"
        :before-change="beforeChange2"
        :max="10"
        placeholder="请输入"
      /> -->
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const modelValue = (e) => {
  console.log("update:modelValue", e)
}

const state = reactive({
  value1: 1,
})

const beforeChange = async (value) => {
  console.log("beforeChange", value)
  uni.showLoading()
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  }).finally(() => {
    uni.hideLoading()
  })
}

const beforeChange2 = async (value) => {
  console.log("beforeChange", value)
  uni.showLoading()
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject()
    }, 500)
  }).finally(() => {
    uni.hideLoading()
  })
}

const showToast = (title) => {
  console.log(title)
  uni.showToast({
    icon: "none",
    title,
  })
}
</script>

<style scoped lang="scss"></style>
