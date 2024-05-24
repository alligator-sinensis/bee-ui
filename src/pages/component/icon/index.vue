<template>
  <bee-doc-demo-section>
    <div class="tab-list">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        class="tab-item"
        :class="{ 'is-active': activeTab === index }"
        @click="activeTab = index"
      >
        {{ item.label }}
      </div>
    </div>
    <template v-if="activeTab === 0">
      <bee-doc-demo-block title="图标颜色">
        <view class="icon-list">
          <view class="icon-item">
            <bee-icon color="#FE0000" name="youtube-fill" size="32px" />
          </view>
          <view class="icon-item">
            <bee-icon color="#42B883" name="vuejs-fill" size="32px" />
          </view>
          <view class="icon-item">
            <bee-icon color="#00A1D6" name="bilibili-fill" size="32px" />
          </view>
        </view>
      </bee-doc-demo-block>
      <bee-doc-demo-block title="图标大小">
        <view class="icon-list">
          <view class="icon-item">
            <bee-icon
              color="var(--bee-text-color-primary)"
              name="upload-cloud-2-line"
              size="64px"
            />
          </view>
          <view class="icon-item">
            <bee-icon
              color="var(--bee-text-color-primary)"
              name="upload-cloud-2-line"
              size="32px"
            />
          </view>
          <view class="icon-item">
            <bee-icon
              color="var(--bee-text-color-primary)"
              name="upload-cloud-2-line"
              size="16px"
            />
          </view>
        </view>
      </bee-doc-demo-block>
    </template>
    <bee-doc-demo-block v-else>
      <view class="icon-list">
        <view v-for="(item, index) in displayIconList" :key="index" class="icon-item">
          <bee-icon color="var(--bee-text-color-primary)" :name="item" size="32px" />
          <view class="label"> {{ item }}</view>
        </view>
      </view>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { computed } from "vue"
import remixiconGlyphJson from "remixicon/fonts/remixicon.glyph.json"
import { ref } from "vue"

const iconNameList = Object.keys(remixiconGlyphJson)

const filterLine = iconNameList.filter((item) => item.endsWith("-line"))
const filterFill = iconNameList.filter((item) => item.endsWith("-fill"))
const filter = iconNameList.filter((item) => !item.endsWith("-fill") && !item.endsWith("-line"))
console.log({ filterLine, filterFill, filter })

const activeTab = ref(0)
const tabList = [
  {
    label: "用法示例",
  },
  {
    label: "line图标",
  },
  {
    label: "fill图标",
  },
  {
    label: "其他图标",
  },
]

const displayIconList = computed(() => {
  switch (activeTab.value) {
    case 1:
      return iconNameList.filter((item) => item.endsWith("-line"))
    case 2:
      return iconNameList.filter((item) => item.endsWith("-fill"))
    case 3:
      return iconNameList.filter((item) => !item.endsWith("-line") && !item.endsWith("-fill"))
    default:
      return []
  }
})
</script>

<style scoped lang="scss">
.tab-list {
  position: sticky;
  top: 44px;
  display: flex;
  align-items: center;
  height: 30px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%);

  .tab-item {
    flex: 1;
    text-align: center;

    &.is-active {
      color: var(--bee-color-primary);
    }
  }
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    overflow: hidden;

    .label {
      height: 36px;
      margin-top: 10px;
      padding: 0 5px;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
    }
  }
}
</style>
