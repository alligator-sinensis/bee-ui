<template>
  <view>
    <InputNumberCore v-model="value" />

    <pre>{{ { value } }}</pre>

    <input v-model="value" type="text" />
  </view>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"
import InputNumberCore from "./components/input-number-core.vue"

const value = ref("666") // 6  6w w6 null undefind -  -6  -6w -w6

// watchEffect(() => {
//   console.log(value.value, typeof value.value)
// })
</script>

<style scoped lang="scss"></style>
