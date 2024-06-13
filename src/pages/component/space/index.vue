<template>
  <bee-doc-demo-section>
    <bee-doc-demo-block title="基础用法">
      <bee-space>
        <view v-for="(item, index) in 3" :key="index" class="box">按钮 {{ item }}</view>
      </bee-space>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="自定义间距">
      <bee-space size="10px" wrap>
        <view v-for="(item, index) in 6" :key="index" class="box">按钮 {{ item }}</view>
      </bee-space>
      <bee-space :size="['5px', '20px']" wrap>
        <view v-for="(item, index) in 6" :key="index" class="box">按钮 {{ item }}</view>
      </bee-space>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="垂直排列">
      <bee-space direction="vertical">
        <view v-for="(item, index) in 3" :key="index" block class="box">按钮 {{ item }}</view>
      </bee-space>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="fill">
      <view>
        <bee-space>
          <view v-for="(item, index) in 3" :key="index" class="box"> 按钮 {{ item }} </view>
        </bee-space>
        <bee-button class="box">按钮</bee-button>
      </view>
      <view>
        <bee-space fill>
          <view v-for="(item, index) in 3" :key="index" class="box"> 按钮 {{ item }} </view>
        </bee-space>
        <bee-button>按钮</bee-button>
      </view>
      <view>
        <bee-space direction="vertical">
          <view v-for="(item, index) in 3" :key="index" class="box"> 按钮 {{ item }} </view>
        </bee-space>
        <bee-button>按钮</bee-button>
      </view>
      <view>
        <bee-space direction="vertical" fill>
          <view v-for="(item, index) in 3" :key="index" class="box"> 按钮 {{ item }} </view>
        </bee-space>
        <bee-button>按钮</bee-button>
      </view>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="对齐方式">
      <view>align:{{ align }}</view>
      <bee-button @click="align = 'stretch'">stretch</bee-button>
      <bee-button @click="align = 'flex-start'">flex-start</bee-button>
      <bee-button @click="align = 'center'">center</bee-button>
      <bee-button @click="align = 'flex-end'">flex-end</bee-button>
      <bee-space :align="align" style="width: 250px; height: 150px; background-color: #eee">
        <view v-for="(item, index) in 3" :key="index" class="box"> 按钮 {{ item }} </view>
      </bee-space>
      <bee-space
        :align="align"
        direction="vertical"
        style="width: 250px; height: 150px; background-color: #eee"
      >
        <view v-for="(item, index) in 3" :key="index" class="box"> 按钮 {{ item }} </view>
      </bee-space>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const align = ref<any>("stretch")
</script>

<style scoped lang="scss">
.box {
  padding: 10px;
  color: #fff;
  background-color: #ca64ea;
}
</style>
