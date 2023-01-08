/*
 * @Description:
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 16:28:58
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-08 17:42:39
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

import path from "path";
const resolve = (dir) => path.join(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ["vue", "vue-router"], //自动引入vue和vue-router中的配置项
      resolvers: [AntDesignVueResolver()], //自动引入antd
    }),
    Components({
      resolvers: [AntDesignVueResolver()], //自动注册antd
    }),
    vue(),
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
      packages: resolve("packages"),
    },
  },
  build: {
    lib: {
      // 2. 基于Ant Design Vue TreeSelect二次封装的组件的打包配置
      entry: resolve("packages/index.js"),
      name: "wowDesign",
      fileName: (format) => `wowDesign.${format}.js`,
    },
    // 自定义构建配置，可直接调整底层Rollup选项；Rollup有一套预设
    // https://rollupjs.org/guide/en/#big-list-of-options
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
