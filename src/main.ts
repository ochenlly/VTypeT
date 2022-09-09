import { createApp } from "vue";
import "./style.css";
import "element-plus/theme-chalk/src/index.scss";

import App from "./App.vue";
//引入路由
import router from "./router";

createApp(App).use(router).mount("#app");
