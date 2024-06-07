<template>
  <bee-doc-demo-section>
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
          <bee-icon color="var(--bee-text-color-primary)" name="upload-cloud-2-line" size="64px" />
        </view>
        <view class="icon-item">
          <bee-icon color="var(--bee-text-color-primary)" name="upload-cloud-2-line" size="32px" />
        </view>
        <view class="icon-item">
          <bee-icon color="var(--bee-text-color-primary)" name="upload-cloud-2-line" size="16px" />
        </view>
      </view>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="自定义图标">
      <view class="icon-list">
        <view class="icon-item">
          <bee-icon name="liulanqi" prefix="test-icon" size="30px" />
        </view>
      </view>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="使用图片">
      <view class="icon-list">
        <view class="icon-item">
          <bee-icon
            color="var(--bee-text-color-primary)"
            name="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            size="64px"
          />
        </view>
      </view>
    </bee-doc-demo-block>
    <bee-doc-demo-block title="全部图标">
      <input v-model="queryValue" class="search-input" :placeholder="`Search ${iconQty} Icons`" />
      <template v-for="(item, index) in getDataList" :key="index">
        <view v-if="item.tag !== '_comment'">
          <view> {{ item.tag }}</view>
          <view class="icon-list">
            <view
              v-for="(icon, iconIndex) in item.icons"
              :key="iconIndex"
              class="icon-item"
              @click="setClipboardData(icon.name)"
            >
              <bee-icon color="var(--bee-text-color-primary)" :name="icon.name" size="32px" />
              <view class="label"> {{ icon.name }}</view>
            </view>
          </view>
        </view>
      </template>
    </bee-doc-demo-block>
  </bee-doc-demo-section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import tags from "./tags.json"
import BeeIcon from "@/packages/components/bee-icon/bee-icon.vue"

const queryValue = ref("")

const dataList = Object.entries(tags)
  .map(([tag, icons]) => ({
    tag,
    icons: Object.entries(icons).flatMap(([name, keyword]) =>
      tag === "Editor"
        ? { name, keyword }
        : [
            { name: name + "-line", keyword },
            { name: name + "-fill", keyword },
          ],
    ),
  }))
  .filter((item) => !item.tag.startsWith("_"))

const iconQty = dataList.reduce((total, obj) => total + obj.icons.length, 0)

const getDataList = computed(() => {
  const res = dataList
    .map(({ tag, icons }) => {
      return {
        tag,
        icons: icons.filter((item) => {
          return `${item.keyword},${item.name}`.indexOf(queryValue.value) !== -1
        }),
      }
    })
    .filter((item) => item.icons.length)
  return res
})

const setClipboardData = (name) => {
  const text = `<bee-icon name="${name}" />`
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({
        title: text,
        icon: "none",
      })
    },
  })
}
</script>

<style scoped lang="scss">
.search-input {
  position: sticky;
  top: 50px;
  z-index: 10;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow:
    0 8px 24px #1a29470a,
    0 2px 8px #1a294714;
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
