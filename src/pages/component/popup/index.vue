<template>
  <bee-doc-demo-section>
    <bee-doc-demo-block title="弹出位置">
      <bee-button icon="arrow-down-s-line" @click="showCenter = true"> 中间弹出 </bee-button>
      <bee-button icon="arrow-down-s-line" @click="showTop = true"> 顶部弹出 </bee-button>
      <bee-button icon="arrow-up-s-line" @click="showBottom = true">底部弹出</bee-button>
      <bee-button icon="arrow-right-s-line" @click="showLeft = true">左侧弹出</bee-button>
      <bee-button icon="arrow-left-s-line" @click="showRight = true">右侧弹出</bee-button>
      <bee-popup v-model:show="showCenter">
        <view style="padding: 50px">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showTop" position="top">
        <view style="height: 30vh">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showBottom" position="bottom">
        <view style="height: 30vh">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showLeft" position="left">
        <view style="width: 30vw">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showRight" position="right">
        <view style="width: 30vw">内容</view>
      </bee-popup>
    </bee-doc-demo-block>

    <bee-doc-demo-block title="关闭图标">
      <bee-button icon="arrow-down-s-line" @click="showCenterCloseable = true">
        中间弹出
      </bee-button>
      <bee-button icon="arrow-down-s-line" @click="showTopCloseable = true"> 顶部弹出 </bee-button>
      <bee-button icon="arrow-up-s-line" @click="showBottomCloseable = true">底部弹出</bee-button>
      <bee-button icon="arrow-right-s-line" @click="showLeftCloseable = true">左侧弹出</bee-button>
      <bee-button icon="arrow-left-s-line" @click="showRightCloseable = true">右侧弹出</bee-button>
      <bee-popup v-model:show="showCenterCloseable" closeable>
        <view style="padding: 50px">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showTopCloseable" closeable position="top">
        <view style="height: 30vh">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showBottomCloseable" closeable position="bottom">
        <view style="height: 30vh">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showLeftCloseable" closeable position="left">
        <view style="width: 30vw">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showRightCloseable" closeable position="right">
        <view style="width: 30vw">内容</view>
      </bee-popup>
    </bee-doc-demo-block>

    <bee-doc-demo-block title="圆角弹窗">
      <bee-button icon="arrow-down-s-line" @click="showCenterRound = true"> 中间弹出 </bee-button>
      <bee-button icon="arrow-down-s-line" @click="showTopRound = true"> 顶部弹出 </bee-button>
      <bee-button icon="arrow-up-s-line" @click="showBottomRound = true">底部弹出</bee-button>
      <bee-button icon="arrow-right-s-line" @click="showLeftRound = true">左侧弹出</bee-button>
      <bee-button icon="arrow-left-s-line" @click="showRightRound = true">右侧弹出</bee-button>
      <bee-popup v-model:show="showCenterRound" round>
        <view style="padding: 50px">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showTopRound" position="top" round>
        <view style="height: 30vh">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showBottomRound" position="bottom" round>
        <view style="height: 30vh">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showLeftRound" position="left" round>
        <view style="width: 30vw">内容</view>
      </bee-popup>
      <bee-popup v-model:show="showRightRound" position="right" round>
        <view style="width: 30vw">内容</view>
      </bee-popup>
    </bee-doc-demo-block>

    <bee-doc-demo-block title="事件监听">
      <bee-button icon="arrow-up-s-line" @click="showBottomEvent = true">底部弹出</bee-button>
      <bee-popup
        v-model:show="showBottomEvent"
        :close-on-click-overlay="false"
        closeable
        position="bottom"
        @click="showToast('click')"
        @close="showToast('close')"
        @closed="showToast('closed')"
        @open="showToast('open')"
        @opened="showToast('opened')"
      >
        <view style="height: 30vh">内容</view>
      </bee-popup>
    </bee-doc-demo-block>

    <bee-doc-demo-block title="beforeClose">
      <bee-button icon="arrow-up-s-line" @click="showBottomBeforeClose = true">底部弹出</bee-button>
      <bee-popup
        v-model:show="showBottomBeforeClose"
        :before-close="beforeClose"
        closeable
        position="bottom"
      >
        <view style="height: 30vh">内容</view>
      </bee-popup>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const showCenter = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)

const showCenterCloseable = ref(false)
const showTopCloseable = ref(false)
const showBottomCloseable = ref(false)
const showLeftCloseable = ref(false)
const showRightCloseable = ref(false)

const showCenterRound = ref(false)
const showTopRound = ref(false)
const showBottomRound = ref(false)
const showLeftRound = ref(false)
const showRightRound = ref(false)

const showBottomEvent = ref(false)
const showBottomBeforeClose = ref(false)

const showToast = (title) => {
  uni.showToast({
    icon: "none",
    title,
  })
}

// 返回true或者Promise.resolve可以关闭
const beforeClose = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}
</script>

<style scoped lang="scss"></style>
