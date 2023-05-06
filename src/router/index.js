import { createRouter, createWebHistory } from "vue-router";


import DashboardPage from "../views/Dashboard.vue";
import LoginPage from "../views/Login.vue";

const routes = [
    { path: "/", component: LoginPage },
    {
        path: "/dashboard",
        component: DashboardPage,
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
