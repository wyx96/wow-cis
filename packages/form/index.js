/*
 * @Description:
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 16:37:22
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-09 22:06:28
 */
import wowForm from "./src/index.vue";

wowForm.install = function (Vue) {
  Vue.component(wowForm.name, wowForm);
};

export default wowForm;
