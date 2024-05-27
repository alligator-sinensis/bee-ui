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
      <bee-button plain>Default</bee-button>
      <bee-button plain type="primary">Primary</bee-button>
      <bee-button plain type="success">Success</bee-button>
      <bee-button plain type="info">Info</bee-button>
      <bee-button plain type="warning">Warning</bee-button>
      <bee-button plain type="danger">Danger</bee-button>
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
    <bee-doc-demo-block title="加载状态">
      <bee-button loading />
      <bee-button loading type="primary">加载中...</bee-button>
      <bee-button loading type="primary">加载中...</bee-button>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
