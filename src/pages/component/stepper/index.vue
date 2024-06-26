<template>
  <bee-doc-demo-section>
    <!-- <pre>{{ state }}</pre> -->
    <bee-doc-demo-block title="基础用法">
      <bee-stepper
        v-model="state.value1"
        :max="10"
        :min="1"
        placeholder="请输入"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
      />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="禁用">
      <bee-stepper v-model="state.value2" disabled placeholder="请输入" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="精度">
      <bee-stepper v-model="state.value3" placeholder="请输入" :precision="2" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="不同的尺寸">
      <bee-stepper v-model="state.value4" placeholder="请输入" size="large" />
      <bee-stepper v-model="state.value4" placeholder="请输入" />
      <bee-stepper v-model="state.value4" placeholder="请输入" size="small" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="为空时默认值">
      <bee-stepper v-model="state.value5" :default-value-if-empty="0" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="异步变更">
      <bee-stepper
        v-model="state.value6"
        :before-change="(value) => beforeChange(value, true)"
        :max="10"
        placeholder="请输入"
      />
      <bee-stepper
        v-model="state.value7"
        :before-change="(value) => beforeChange(value, false)"
        :max="10"
        placeholder="请输入"
      />
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const state = reactive({
  value1: 1,
  value2: 1,
  value3: 1,
  value4: 1,
  value5: null,
  value6: 1,
  value7: 1,
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

const beforeChange = async (value, flag) => {
  console.log("beforeChange", value)
  uni.showLoading()
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      flag ? resolve() : reject()
    }, 500)
  }).finally(() => {
    uni.hideLoading()
  })
}
</script>

<style scoped lang="scss"></style>
