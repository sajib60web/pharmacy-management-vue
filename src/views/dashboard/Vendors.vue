<template>
    <div class="d-flex jc-between ai-center">
        <h2>All vendors</h2>
        <the-button @click="addModal = true">Add New</the-button>
    </div>
    <div class="text-center" v-if="gettingVendors">Loading...</div>
    <table class="mt-4" v-else>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vendor in vendors" :key="vendor.id">
                <td>{{ vendor.name }}</td>
                <td>{{ vendor.description }}</td>
                <td>
                    <img src="/img/edit.png" alt="Edit" class="action-icon" />
                    <img
                        src="/img/trash.png"
                        alt="Delete"
                        class="action-icon action-icon--delete ml-3"
                    />
                </td>
            </tr>
        </tbody>
    </table>
    <the-modal v-model="addModal" heading="Add new vendor">
        <form @submit.prevent="addNew">
            <label class="block">Vendor Name</label>
            <input
                type="text"
                placeholder="Enter vendor name"
                class="mt-1 w-100"
                required
                v-model="newVendor.name"
            />

            <label class="block mt-3">Description</label>
            <input
                type="text"
                placeholder="Write short description"
                class="mt-1 w-100"
                required
                v-model="newVendor.description"
            />
            <the-button :loading="adding" class="w-100 mt-4"> Add </the-button>
        </form>
    </the-modal>
</template>
<script>
import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
export default {
    components: {
        TheButton,
        TheModal,
    },
    data: () => ({
        addModal: false,
        adding: false,
        newVendor: {
            name: "",
            description: "",
        },
        vendors: [],
        gettingVendors: false,
    }),
    mounted() {
        // setTimeout(this.getAllVendors, 100);
        this.getAllVendors();
    },
    methods: {
        getAllVendors() {
            this.gettingVendors = true;
            axios
                .get(this.base_url + "private/vendor", {
                    headers: {
                        authorization: localStorage.getItem("accessToken"),
                    },
                })
                .then((res) => {
                    // console.log(res.data);
                    this.vendors = res.data;
                })
                .catch((err) => {
                    // console.log(err);
                })
                .finally(() => {
                    this.gettingVendors = false;
                });
        },
        addNew() {
            this.adding = true;
            axios
                .post(this.base_url + "private/vendor/create", this.newVendor, {
                    headers: {
                        authorization: localStorage.getItem("accessToken"),
                    },
                })
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.status == true) {
                        this.$eventBus.emit("toast", {
                            type: "Success",
                            message: res.data.message,
                        });
                        this.resetForm();
                    } else {
                        this.$eventBus.emit("toast", {
                            type: "Error",
                            message: res.data.message,
                        });
                    }
                })
                .catch((err) => {
                    // console.log(err);
                    let errorMessage = "Something went wrong";
                    if (err.response) {
                        errorMessage = err.message;
                    }
                    this.$eventBus.emit("toast", {
                        type: "Error",
                        message: errorMessage,
                    });
                })
                .finally(() => {
                    this.adding = false;
                });
        },
        resetForm() {
            this.newVendor = { name: "", description: "" };
        },
    },
};
</script>
<style></style>
