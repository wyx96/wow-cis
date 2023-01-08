/*
 * @Description:
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 16:37:22
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-08 20:51:18
 */
import wowButton from "./src/index.vue";

wowButton.install = function (Vue) {
  Vue.component(wowButton.name, wowButton);
};

export default wowButton;
