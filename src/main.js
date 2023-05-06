import mitt from 'mitt';
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//css
import 'ayoflex/dist/ayoflex.min.css';
import "./assets/css/example.css";

// mitt
let eventBus = mitt();

const app = createApp(App)
app.config.globalProperties.$eventBus = eventBus;
app.config.globalProperties.base_url = 'http://127.0.0.1:8000/api/';
app.use(router);
app.mount("#app");
