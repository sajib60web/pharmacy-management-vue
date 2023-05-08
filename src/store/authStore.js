import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        email: "",
        accessToken: "",
        refreshToken: "",
    }),
    getters: {
        isLoggedIn(state) {
            return state.email && state.accessToken ? true : false;
        },
    },
    actions: {
        login(payload) {
            this.email = payload.email;
            this.accessToken = payload.accessToken;
            this.refreshToken = payload.refreshToken;
        },
    },
});
