<template>
  <bee-doc-demo-section>
    <bee-doc-demo-block title="加载类型">
      <bee-loading />
      <bee-loading type="spinner" />
      <bee-loading type="dot" />
      <bee-loading type="bar" />
      <bee-loading type="clock" />
      <bee-loading type="flipping-square" />
      <bee-loading type="flipping-circle" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="自定义颜色">
      <bee-loading color="#34C0FF" />
      <bee-loading color="#34C0FF" type="spinner" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="自定义大小">
      <bee-loading size="50px" />
      <bee-loading size="40px" />
      <bee-loading size="30px" />
      <bee-loading size="20px" />
    </bee-doc-demo-block>
    <bee-doc-demo-block title="加载文案">
      <bee-loading>加载中...</bee-loading>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="排列方向">
      <bee-loading>加载中...</bee-loading>
      <bee-loading direction="column">加载中...</bee-loading>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="自定义图标">
      <bee-loading direction="column">
        加载中...
        <template #icon>
          <bee-icon name="star-line" />
        </template>
      </bee-loading>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
