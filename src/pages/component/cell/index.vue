<template>
  <bee-doc-demo-section background-color="#f0f0f0">
    <bee-doc-demo-block :card="false" title="基础用法">
      <bee-cell title="单元格" value="内容" />
      <bee-cell title="单元格">内容</bee-cell>
      <bee-cell label="描述信息" title="单元格">内容</bee-cell>
    </bee-doc-demo-block>
    <bee-doc-demo-block :card="false" title="点击反馈">
      <bee-cell arrow clickable title="单元格" />
    </bee-doc-demo-block>
    <bee-doc-demo-block :card="false" title="展示图标">
      <bee-cell left-icon="store-2-line" title="单元格">内容</bee-cell>
      <bee-cell right-icon="search-line" title="单元格">内容</bee-cell>
      <bee-cell arrow left-icon="store-2-line" right-icon="search-line" title="单元格"
        >内容</bee-cell
      >
    </bee-doc-demo-block>
    <bee-doc-demo-block :card="false" title="显示箭头">
      <bee-cell arrow title="单元格">right</bee-cell>
      <bee-cell arrow arrow-direction="down" title="单元格">down</bee-cell>
      <bee-cell arrow arrow-direction="left" title="单元格">left</bee-cell>
      <bee-cell arrow arrow-direction="up" title="单元格">up</bee-cell>
    </bee-doc-demo-block>
    <bee-doc-demo-block :card="false" title="使用插槽">
      <bee-cell arrow>
        随便写点东西
        <template #title>
          <view style="color: red; font-weight: bold">
            title
            <bee-button size="mini">标签</bee-button>
          </view>
        </template>
        <template #label>
          <view style="color: blueviolet; font-weight: bold">label</view>
        </template>
        <template #left-icon>
          <bee-icon color="#F9BD12" name="bug-line" size="20px" />
        </template>
        <template #right-icon>
          <bee-icon color="green" name="search-line" size="20px" />
        </template>
      </bee-cell>
    </bee-doc-demo-block>
    <bee-doc-demo-block :card="false" title="内容垂直居中">
      <bee-cell
        arrow
        label="labellabellabellabellabellabellabellabellabel"
        title="单元格"
        vertical-center
        >right</bee-cell
      >
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
