/*
 * @Description:
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 16:32:21
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-08 16:32:36
 */
import { TreeSelect } from "ant-design-vue";
const components = [TreeSelect];

export function setupAntd(app) {
  components.forEach((component) => {
    app.use(component);
  });
}
