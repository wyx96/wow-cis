/*
 * @Description:
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 16:28:58
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-09 23:07:19
 */
import { createApp } from "vue";
// import "./style.css";
import "ant-design-vue/dist/antd.css";

import App from "./App.vue";
// import { setupAntd } from "./libs/antdv";

const app = createApp(App);
// setupAntd(app);
app.mount("#app");
