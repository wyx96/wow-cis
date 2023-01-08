<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 17:33:21
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-08 20:47:04
-->
<template>
  <a-button type="primary" size="large">{{ bName }}</a-button>
</template>
<script>
export default {
  name: "wowButton",
};
</script>
<script setup>
// import { toRefs } from "vue";

const props = defineProps({
  bName: {
    default: "",
    type: String,
  },
});
const { bName } = toRefs(props);
</script>

<style lang="scss" scoped></style>
