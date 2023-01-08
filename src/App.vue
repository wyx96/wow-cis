<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 16:28:58
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-08 21:13:10
-->
<script setup>
import HelloWorld from "./components/HelloWorld.vue";
// import tTreeSelect from "packages/treeSelect/src/index.vue";
// import tTreeSelect from "../dist/tTreeSelect.es.js";
import wowDesign from "../dist/wowDesign.es.js";
const { wowButton, tTreeSelect } = wowDesign;
// import "../dist/style.css";
const fieldNames = {
  children: "children",
  label: "name",
  key: "id",
  value: "id",
};

// 测试数据
const departTree = [
  {
    id: 1,
    name: "根部门",
    departNumber: 6,
    children: [
      {
        id: 11,
        pid: 1,
        name: "一级部门1",
        departNumber: 2,
        children: [
          { id: 111, pid: 11, name: "二级部门1", departNumber: 0 },
          { id: 112, pid: 11, name: "二级部门2", departNumber: 0 },
        ],
      },
      { id: 21, pid: 1, name: "一级部门2", departNumber: 0 },
      { id: 31, pid: 1, name: "一级部门3", departNumber: 0 },
      { id: 41, pid: 1, name: "一级部门4", departNumber: 0 },
      { id: 51, pid: 1, name: "一级部门5", departNumber: 0 },
      {
        id: 61,
        pid: 1,
        name: "一级部门6",
        departNumber: 2,
        children: [
          { id: 611, pid: 61, name: "二级部门3", departNumber: 0 },
          { id: 612, pid: 61, name: "二级部门4", departNumber: 0 },
        ],
      },
    ],
  },
];

const departId = 11;
const buttonName = "我是个按钮";
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>

    <t-tree-select
      :depart-source="departTree"
      v-model:value="departId"
      :fieldNames="fieldNames"
    />
    <wowButton :bName="buttonName" />
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
