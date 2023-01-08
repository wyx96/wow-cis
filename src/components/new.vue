<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 21:15:12
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-08 21:16:20
-->
<template>
  <div>
    <t-tree-select
      :depart-source="departTree"
      v-model:value="departId"
      :fieldNames="fieldNames"
    />
    <wowButton :bName="buttonName" />
  </div>
</template>

<script setup>
import wowDesign from "../dist/wowDesign.es.js";
const { wowButton, tTreeSelect } = wowDesign;
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

<style lang="scss" scoped></style>
