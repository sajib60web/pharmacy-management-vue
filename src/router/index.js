import { createRouter, createWebHistory } from "vue-router";

import DashboardPage from "../views/Dashboard.vue";
import LoginPage from "../views/Login.vue";

const routes = [
    { path: "/", component: LoginPage },
    {
        path: "/dashboard",
        component: DashboardPage,
        children: [
        //     { path: "overview", component: Overview },
        //     { path: "drugs", component: Drugs },
        //     { path: "vendors", component: Vendors },
        //     { path: "selling-history", component: SellingHistory },
        //     { path: "settings", component: Settings },
        ],
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
