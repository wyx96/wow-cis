/*
 * @Description:
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 17:40:29
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-08 20:55:12
 */
import wowButton from "./button";
import tTreeSelect from "./treeSelect";
import wowForm from "./form";

const components = [wowButton, tTreeSelect];
const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
// 导出组件
export default {
  install,
  wowButton,
  tTreeSelect,
  wowForm
};
