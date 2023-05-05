<template>
    <login></login>
    <div class="toasts">
        <the-toast
            v-for="(toast, i) in toasts"
            :key="i"
            :toastType="toast.type"
            :message="toast.message"
        ></the-toast>
    </div>
</template>
<script>
import Login from "./components/Login.vue";
import TheToast from "./components/TheToast.vue";
export default {
    components: {
        Login,
        TheToast,
    },
    data: () => ({
        toasts: [
            // {
            //     type: "Success",
            //     message: "Done Successfully!",
            // },
            // {
            //     type: "Error",
            //     message: "Something went wrong!",
            // },
        ],
    }),
    mounted() {
        this.$eventBus.on("toast", (data) => {
            // console.log(data);
            this.toasts.push(data);
            this.removeOneToast();
        });
    },
    methods: {
        removeOneToast() {
            setTimeout(() => {
                this.toasts.shift();
            }, 2222);
        },
    },
};
</script>
