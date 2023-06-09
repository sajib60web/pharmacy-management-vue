import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

//css
import "ayoflex/dist/ayoflex.min.css";
import "./assets/css/example.css";

const app = createApp(App);
app.config.globalProperties.base_url = "http://127.0.0.1:8000/api/";
app.use(router);
// Pinia
const pinia = createPinia();
app.use(pinia);
app.mount("#app");

watch(
    () => pinia.state.value.cart,
    (state) => {
        // persist the whole state to the local storage whenever it changes
        localStorage.setItem("products", JSON.stringify(state.products));
        // console.log(state);
    },
    { deep: true }
);
