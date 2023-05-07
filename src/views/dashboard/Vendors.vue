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
                    <img
                        src="/img/edit.png"
                        alt="Edit"
                        class="action-icon"
                        @click="
                            selectedVendor = vendor;
                            editModal = true;
                        "
                    />
                    <img
                        src="/img/trash.png"
                        alt="Delete"
                        class="action-icon action-icon--delete ml-3"
                        @click="
                            selectedVendor = vendor;
                            deleteModal = true;
                        "
                    />
                </td>
            </tr>
        </tbody>
    </table>
    <!-- Add Modal -->
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
    <!-- Edit Modal -->
    <the-modal v-model="editModal" heading="Edit vendor">
        <form @submit.prevent="updateVendor">
            <label class="block">Vendor Name</label>
            <input
                type="text"
                placeholder="Enter vendor name"
                class="mt-1 w-100"
                required
                v-model="selectedVendor.name"
            />

            <label class="block mt-3">Description</label>
            <input
                type="text"
                placeholder="Write short description"
                class="mt-1 w-100"
                required
                v-model="selectedVendor.description"
            />
            <the-button :loading="editing" class="w-100 mt-4">
                Save Changes
            </the-button>
        </form>
    </the-modal>
    <!-- Delete Modal -->
    <the-modal v-model="deleteModal" heading="Are you sure?">
        <p>
            Do you really want to delete
            <strong>{{ selectedVendor.name }}</strong>
        </p>
        <the-button class="mt-4" @click="deleteVendor" :loading="deleting">
            Yes
        </the-button>
        <the-button class="ml-4" color="gray" @click="deleteModal = false">
            No
        </the-button>
    </the-modal>
</template>
<script>
import axios from "axios";
import privateService from "../../service/privateService";
import { showErrorMessage, showSuccessMessage } from "../../utils/functions";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
export default {
    components: {
        TheButton,
        TheModal,
    },
    data: () => ({
        // Modal
        addModal: false,
        editModal: false,
        deleteModal: false,

        newVendor: {
            name: "",
            description: "",
        },
        adding: false,
        selectedVendor: {},
        editing: false,
        deleting: false,
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
            privateService
                .getVendors()
                .then((res) => {
                    this.vendors = res.data;
                })
                .catch((err) => {
                    showErrorMessage(err);
                })
                .finally(() => {
                    this.gettingVendors = false;
                });
        },

        addNew() {
            this.adding = true;
            privateService
                .addVendor(this.newVendor)
                .then((res) => {
                    if (res.data.status == true) {
                        showSuccessMessage(res.data.message);
                        this.addModal = false;
                        this.resetForm();
                        this.getAllVendors();
                    } else {
                        showErrorMessage(res.data.message);
                    }
                })
                .catch((err) => {
                    showErrorMessage(err);
                })
                .finally(() => {
                    this.adding = false;
                });
        },

        updateVendor() {
            this.editing = true;
            privateService
                .updateVendor(this.selectedVendor)
                .then((res) => {
                    if (res.data.status == true) {
                        showSuccessMessage(res.data.message);
                        this.editModal = false;
                        this.resetForm();
                    } else {
                        showErrorMessage(res.data.message);
                    }
                })
                .catch((err) => {
                    showErrorMessage(err);
                })
                .finally(() => {
                    this.editing = false;
                });
        },

        deleteVendor() {
            this.deleting = true;
            privateService
                .deleteVendor(this.selectedVendor.id)
                .then((res) => {
                    showSuccessMessage(res.data.message);
                    this.resetForm();
                    this.deleteModal = false;
                    this.getAllVendors();
                })
                .catch((err) => {
                    showErrorMessage(err);
                })
                .finally(() => {
                    this.deleting = false;
                });
        },

        resetForm() {
            this.newVendor = { name: "", description: "" };
        },
    },
};
</script>
<style></style>
