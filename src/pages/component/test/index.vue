<template>
  <bee-doc-demo-section>
    <a-com class="kkk" style="border: 10px solid darkblue" />
    <!-- <bee-doc-demo-block>
    <a-com />
  </bee-doc-demo-block> -->
  </bee-doc-demo-section>
</template>

<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
}
</script>
<script setup lang="ts">
import ACom from "./components/a-com.vue"
</script>

<style scoped lang="scss">
// .a-com {
//   color: #fff;
//   background-color: rebeccapurple;
// }

.kkk {
  color: #fff;
  background-color: sandybrown;
}
</style>
