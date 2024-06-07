<template>
  <bee-doc-demo-section>
    <bee-doc-demo-block title="按钮类型">
      <bee-button>Default</bee-button>
      <bee-button type="primary">Primary</bee-button>
      <bee-button type="success">Success</bee-button>
      <bee-button type="info">Info</bee-button>
      <bee-button type="warning">Warning</bee-button>
      <bee-button type="danger">Danger</bee-button>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="按钮尺寸">
      <bee-button size="large" type="primary">large</bee-button>
      <bee-button type="primary">middle</bee-button>
      <bee-button size="small" type="primary">small</bee-button>
      <bee-button size="mini" type="primary">mini</bee-button>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="朴素按钮">
      <view>
        <bee-button plain>Default</bee-button>
        <bee-button plain type="primary">Primary</bee-button>
        <bee-button plain type="success">Success</bee-button>
        <bee-button plain type="info">Info</bee-button>
        <bee-button plain type="warning">Warning</bee-button>
        <bee-button plain type="danger">Danger</bee-button>
      </view>
      <view>
        <bee-button plain round>Default</bee-button>
        <bee-button plain round type="primary">Primary</bee-button>
        <bee-button plain round type="success">Success</bee-button>
        <bee-button plain round type="info">Info</bee-button>
        <bee-button plain round type="warning">Warning</bee-button>
        <bee-button plain round type="danger">Danger</bee-button>
      </view>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="按钮形状">
      <view>
        <bee-button size="large" square type="primary">方形按钮</bee-button>
        <bee-button size="middle" square type="primary">方形按钮</bee-button>
        <bee-button size="small" square type="primary">方形按钮</bee-button>
        <bee-button size="mini" square type="primary">方形按钮</bee-button>
      </view>
      <view>
        <bee-button round size="large" type="primary">圆角按钮</bee-button>
        <bee-button round size="middle" type="primary">圆角按钮</bee-button>
        <bee-button round size="small" type="primary">圆角按钮</bee-button>
        <bee-button round size="mini" type="primary">圆角按钮</bee-button>
      </view>
      <view>
        <bee-button circle icon="search-line" size="large" type="primary" />
        <bee-button circle icon="search-line" size="middle" type="primary" />
        <bee-button circle icon="search-line" size="small" type="primary" />
        <bee-button circle icon="search-line" size="mini" type="primary" />
      </view>
      <view>
        <bee-button circle size="large" type="primary">8</bee-button>
        <bee-button circle size="middle" type="primary">8</bee-button>
        <bee-button circle size="small" type="primary">8</bee-button>
        <bee-button circle size="mini" type="primary">8</bee-button>
      </view>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="图标按钮">
      <view>
        <bee-button icon="add-line" type="primary" />
        <bee-button icon="add-line" type="primary">按钮</bee-button>
        <bee-button icon="add-line" icon-position="right" type="primary">按钮</bee-button>
      </view>
      <view>
        <bee-button icon="add-line" size="large" type="primary">按钮</bee-button>
        <bee-button icon="add-line" type="primary">按钮</bee-button>
        <bee-button icon="add-line" size="small" type="primary">按钮</bee-button>
        <bee-button icon="add-line" size="mini" type="primary">按钮</bee-button>
      </view>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="禁用状态">
      <view>
        <bee-button disabled type="primary">禁用状态</bee-button>
        <bee-button disabled type="success">禁用状态</bee-button>
      </view>
      <view>
        <bee-button disabled plain type="primary">禁用状态</bee-button>
        <bee-button disabled plain type="success">禁用状态</bee-button>
      </view>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="加载状态">
      <bee-button loading />
      <bee-button loading type="primary">加载中...</bee-button>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="块级按钮">
      <bee-button block loading type="primary">块级按钮</bee-button>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="页面导航">
      <bee-button to="/pages/index/index" type="primary">页面跳转</bee-button>
      <bee-button replace to="/pages/index/index" type="primary">页面跳转 replace</bee-button>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="自定义颜色">
      <bee-button background="#7232dd">单色按钮</bee-button>
      <bee-button background="#7232dd" plain>单色按钮</bee-button>
      <bee-button background="linear-gradient(to right, #ff6034, #ee0a24)"> 渐变色按钮 </bee-button>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="异步Loading">
      <bee-button :click="fetchSave" color="#34C0FF" icon="save-line" type="primary">
        保存
      </bee-button>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import BeeButton from "@/packages/components/bee-button/bee-button.vue"

const fetchSave = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("ok")
      resolve()
    }, 100000)
  })
}
</script>

<style scoped lang="scss">
:deep() {
  .bee-button {
    margin: 0 10px 10px 0;
  }
}
</style>
