<template>
  <bee-doc-demo-section>
    <bee-doc-demo-block title="基础用法">
      <bee-button @click="show1 = true">展示弹出层</bee-button>
      <bee-overlay :show="show1" @click="show1 = false" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="嵌套内容">
      <bee-button @click="show2 = true">嵌套内容</bee-button>
      <bee-overlay :show="show2" @click="show2 = false">
        <div class="wrapper">
          <div class="block" @click.stop></div>
        </div>
      </bee-overlay>
    </bee-doc-demo-block>
    <view style="margin: 20px; padding: 10px; background-color: #f0f0f0">
      <view v-for="(item, index) in 50" :key="index"> 测试锁定背景滚动占位 </view>
    </view>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const show1 = ref(false)
const show2 = ref(false)
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
}
</style>
