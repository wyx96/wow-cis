/*
 * @Description:
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 16:37:22
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-09 22:06:28
 */
import wowTable from "./src/index.vue";

wowTable.install = function (Vue) {
  Vue.component(wowTable.name, wowTable);
};

export default wowTable;
