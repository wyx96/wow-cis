/*
 * @Description:
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 16:37:22
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-08 16:37:30
 */
import tTreeSelect from "./src/index.vue";

tTreeSelect.install = function (Vue) {
  Vue.component(tTreeSelect.name, tTreeSelect);
};

export default tTreeSelect;
