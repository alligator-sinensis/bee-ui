<template>
  <view
    class="bee-cell"
    :class="[
      {
        'bee-cell__vertical-center': verticalCenter,
      },
    ]"
    :hover-class="clickable ? 'is-hover' : 'none'"
    :hover-start-time="20"
    :hover-stay-time="70"
    @click="onClick"
  >
    <view v-if="leftIcon" class="bee-cell__left">
      <bee-icon class="bee-cell__icon" :name="leftIcon" :prefix="leftIconPrefix" />
    </view>
    <view v-if="!!slots.left" class="bee-cell__left">
      <slot name="left"></slot>
    </view>
    <view class="bee-cell__title">
      <slot name="title">
        {{ title }}
      </slot>
      <view class="bee-cell__label">
        <slot name="label">
          {{ label }}
        </slot>
      </view>
    </view>
    <view class="bee-cell__value">
      <slot>{{ value }}</slot>
    </view>
    <view v-if="!!slots.right" class="bee-cell__right">
      <slot name="right"></slot>
    </view>
    <view v-if="rightIcon" class="bee-cell__right">
      <bee-icon class="bee-cell__icon" :name="rightIcon" :prefix="rightIconPrefix" />
    </view>
    <view v-if="arrow" class="bee-cell__right">
      <bee-icon
        class="bee-cell__icon arrow"
        :class="[arrowDirection]"
        name="arrow-up-s-line"
        size="var(--bee-cell-icon-right-arrow-size)"
      />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: "shared",
  },
}
</script>

<script setup lang="ts">
import BeeIcon from "../bee-icon/bee-icon.vue"

const props = withDefaults(
  defineProps<{
    title?: string
    label?: string
    value?: string
    leftIcon?: string
    leftIconPrefix?: string
    rightIcon?: string
    rightIconPrefix?: string
    to?: string
    replace?: boolean
    clickable?: boolean
    arrow?: boolean
    arrowDirection?: "left" | "right" | "up" | "down"
    verticalCenter?: boolean
  }>(),
  {
    title: "",
    label: "",
    value: "",
    replace: false,
    clickable: false,
    arrow: false,
    arrowDirection: "right",
    verticalCenter: false,
  },
)

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void
}>()

const slots = defineSlots<{
  default(): any
  title(): any
  label(): any
  value(): any
  ["left"](): any
  ["right"](): any
}>()

const onClick = async (event: MouseEvent) => {
  emit("click", event)
  const { to, replace } = props
  if (to) {
    if (replace) {
      uni.redirectTo({
        url: to,
      })
    } else {
      uni.navigateTo({
        url: to,
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bee-cell {
  position: relative;
  display: flex;
  padding: var(--bee-cell-vertical-padding) var(--bee-cell-horizontal-padding);
  line-height: var(--bee-cell-line-height);
  background-color: var(--bee-cell-background-color);

  &::after {
    position: absolute;
    right: var(--bee-cell-horizontal-padding);
    bottom: 0;
    left: var(--bee-cell-horizontal-padding);
    box-sizing: border-box;
    border-bottom: 1px solid var(--bee-border-color);
    transform: scaleY(0.5);
    content: " ";
    pointer-events: none;
  }

  &__vertical-center {
    align-items: center;
  }

  &__title {
    flex: 1;
    overflow: hidden;
    color: var(--bee-cell-title-color);
    font-size: var(--bee-cell-title-font-size);
  }

  &__label {
    margin-top: var(--bee-padding-xs);
    color: var(--bee-cell-label-color);
    font-size: var(--bee-cell-label-font-size);
    line-height: var(--bee-cell-label-line-height);
    word-wrap: break-word;
  }

  &__value {
    position: relative;
    flex: 1;
    overflow: hidden;
    color: var(--bee-cell-value-color);
    font-size: var(--bee-cell-value-font-size);
    text-align: right;
    word-wrap: break-word;
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--bee-cell-line-height);
  }

  &__left {
    margin-right: var(--bee-padding-xs);
    color: var(--bee-cell-title-color);
    font-size: var(--bee-cell-title-font-size);
  }

  &__right {
    margin-left: var(--bee-padding-xs);
    color: var(--bee-cell-value-color);
    font-size: var(--bee-cell-value-font-size);

    .bee-cell__icon {
      &.arrow {
        &.left {
          transform: rotate(270deg);
        }

        &.right {
          transform: rotate(90deg);
        }

        &.up {
          transform: rotate(0deg);
        }

        &.down {
          transform: rotate(180deg);
        }
      }
    }
  }

  &.is-hover {
    background-color: var(--bee-cell-active-color);
  }
}
</style>
