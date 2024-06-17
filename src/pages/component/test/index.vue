<template>
  <view>
    <MyInputNumber v-model="value" />

    <!-- <pre>{{ { value } }}</pre> -->
    <input v-model="value" style="background-color: salmon" type="text" />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MyInputNumber from "./components/my-input-number.vue"

const value = ref(null) // 6  6w w6 null undefind -  -6  -6w -w6
</script>

<style scoped lang="scss"></style>
