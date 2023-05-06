import mitt from 'mitt';
import { createApp } from "vue";
import App from "./App.vue";

//css
import 'ayoflex/dist/ayoflex.min.css';
import "./assets/css/example.css";

// mitt
let eventBus = mitt();

const app = createApp(App)
app.config.globalProperties.$eventBus = eventBus;
app.mount("#app");
