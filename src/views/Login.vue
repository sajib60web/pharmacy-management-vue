<template>
    <div>
        <div class="login-page">
            <div class="login-card">
                <div class="text-center">
                    <img src="/img/lock.png" class="login-card__icon" alt="" />
                    <h2>User Login</h2>
                </div>
                <form action="#" @submit.prevent="handleSubmit">
                    <label class="block">Email</label>
                    <input
                        type="email"
                        v-model="formData.email"
                        placeholder="Enter your email"
                        autocomplete="email"
                        required
                        ref="email"
                    />
                    <label class="block mt-3">Password</label>
                    <input
                        type="password"
                        v-model="formData.password"
                        placeholder="Enter password"
                        required
                        ref="password"
                    />
                    <the-button :block="true" :loading="loggingIn" class="mt-3"
                        >Login</the-button
                    >
                    <div class="d-flex jc-between mt-3">
                        <div>
                            <label>
                                <input type="checkbox" />
                                Remember Me
                            </label>
                        </div>
                        <div>
                            <a href="#">Forgot Password?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "../utils/functions";
import { setPrivateHeaders } from "../service/axiosInstance";
import TheButton from "../components/TheButton.vue";
export default {
    components: {
        TheButton,
    },
    data: () => ({
        formData: {
            email: "",
            password: "",
        },
        loggingIn: false,
    }),
    methods: {
        handleSubmit() {
            if (!this.formData.email) {
                showErrorMessage("Email can not be empty!");
                this.$refs.email.focus();
                return;
            }
            if (this.formData.password.length < 6) {
                showErrorMessage(
                    "Password must be at least 6 characters long!"
                );
                this.$refs.password.focus();
                return;
            }
            // TODO: Call API
            this.loggingIn = true;
            axios
                .post(this.base_url + "login", this.formData)
                .then((res) => {
                    if (res.data.status == true) {
                        showSuccessMessage(res.data.message);
                        localStorage.setItem(
                            "accessToken",
                            res.data.accessToken
                        );
                        setPrivateHeaders();
                        this.$router.push("/dashboard");
                    } else {
                        showErrorMessage(res.data.message);
                    }
                })
                .catch((err) => {
                    showErrorMessage(err);
                })
                .finally(() => {
                    this.loggingIn = false;
                });
        },
    },
};
</script>
<style>
.box {
    width: 55px;
    height: 55px;
    background-color: greenyellow;
    margin-bottom: 22px;
    transition: all 0.5s;
}

.box--right {
    margin-left: 222px;
}

.box1 {
    width: 55px;
    height: 55px;
    background-color: greenyellow;
    margin-bottom: 22px;
}

.login-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(235, 235, 235);
}

.login-card {
    width: 400px;
    min-height: 193px;
    box-shadow: 0px 2px 9px 4px #dfdfdf;
    background-color: #fff;
    border-radius: 5px;
    padding: 44px 33px;
}

.login-card input[type="email"],
.login-card input[type="password"] {
    width: 100%;
}

.login-card__icon {
    max-width: 77px;
}
@keyframes showhide {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
.showhide-enter-active {
    animation: showhide 1s ease-in;
    transition: all 0.5s;
}
</style>
