<template>
  <bee-doc-demo-section>
    <bee-doc-demo-block title="基础用法">
      <bee-button @click="show = true">展示弹出层</bee-button>
      <bee-popup v-model:show="show">
        <view style="padding: 50px">内容</view>
      </bee-popup>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="弹出位置">
      <bee-button icon="arrow-down-s-line" @click="showTop = true"> 顶部弹出 </bee-button>
      <bee-button icon="arrow-up-s-line" @click="showBottom = true">底部弹出</bee-button>
      <bee-button icon="arrow-right-s-line" @click="showLeft = true">左侧弹出</bee-button>
      <bee-button icon="arrow-left-s-line" @click="showRight = true">右侧弹出</bee-button>
      <bee-popup v-model:show="showTop" closeable position="top">
        <view style="height: 30vh">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showBottom" closeable position="bottom">
        <view style="height: 30vh">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showLeft" closeable position="left">
        <view style="width: 30vw">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showRight" closeable position="right">
        <view style="width: 30vw">内容</view>
      </bee-popup>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const show = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
</script>

<style scoped lang="scss"></style>
