<template>
  <bee-doc-demo-section>
    <pre>{{ state }}</pre>
    <bee-doc-demo-block title="基础用法">
      <bee-input-number
        v-model="state.value1"
        :max="10"
        :min="1"
        placeholder="请输入"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
      />
      <bee-input-number
        v-model="state.value2"
        :before-change="beforeChange"
        :max="10"
        placeholder="请输入"
        @change="onChange"
      />
      <bee-input-number
        v-model="state.value3"
        :before-change="beforeChange2"
        :max="10"
        placeholder="请输入"
        @change="onChange"
      />
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const state = reactive({
  value1: 3.3333,
  value2: 1,
  value3: 1,
})

const onChange = (currentValue, oldValue) => {
  console.log({ currentValue, oldValue })
}

const onBlur = (event) => {
  console.log("onBlur", event)
}
const onFocus = (event) => {
  console.log("onFocus", event)
}

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
