<template>
    <div class="d-flex jc-between ai-center">
        <h2>All drugs</h2>
        <the-button @click="addModal = true">Add New</the-button>
    </div>
    <div class="text-center" v-if="gettingDrugs">Loading...</div>
    <table class="mt-4" v-else>
        <thead>
            <tr>
                <th>Name</th>
                <th>Weight</th>
                <th>Type</th>
                <th>Vendor</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="drug in drugs" :key="drug.id">
                <td>{{ drug.name }}</td>
                <td>{{ drug.weight }}</td>
                <td>{{ drug.type }}</td>
                <td>{{ drug.vendor }}</td>
                <td>{{ drug.price }}</td>
                <td>{{ drug.quantity }}</td>
                <td>
                    <img
                        src="/img/edit.png"
                        alt="Edit"
                        class="action-icon"
                        @click="
                            selectedDrug = drug;
                            editModal = true;
                        "
                    />
                    <img
                        src="/img/trash.png"
                        alt="Delete"
                        class="action-icon action-icon--delete ml-3"
                        @click="
                            selectedDrug = drug;
                            deleteModal = true;
                        "
                    />
                </td>
            </tr>
        </tbody>
    </table>
    <!-- Add Modal -->
    <the-modal v-model="addModal" heading="Add new drug">
        <form @submit.prevent="addNew">
            <div class="mt-2">
                <label>
                    <input
                        type="radio"
                        name="drugtype"
                        value="Tab"
                        v-model="newDrug.type"
                    />
                    Tab
                </label>
                <label class="ml-2">
                    <input
                        type="radio"
                        name="drugtype"
                        value="Capsule"
                        v-model="newDrug.type"
                    />
                    Capsule
                </label>
                <label class="ml-2">
                    <input
                        type="radio"
                        name="drugtype"
                        value="Syrup"
                        v-model="newDrug.type"
                    />
                    Syrup
                </label>
            </div>

            <label class="block mt-3">Drug Name</label>
            <input
                type="text"
                placeholder="Drug Name"
                class="mt-1 w-100"
                v-model="newDrug.name"
            />
            <label class="block mt-3">Weight</label>
            <input
                type="text"
                placeholder="weight in mg"
                class="mt-1 w-100"
                v-model="newDrug.weight"
            />
            <label class="block mt-3">Vendor</label>
            <select v-model="newDrug.vendor">
                <option value="">Select vendor</option>
                <option
                    v-for="vendor in vendors"
                    :key="vendor.id"
                    :value="vendor.name"
                >
                    {{ vendor.name }}
                </option>
            </select>
            <label class="block mt-3">Price</label>
            <input
                type="text"
                placeholder="Pack Price"
                class="mt-1 w-100"
                v-model="newDrug.price"
            />
            <label class="block mt-3">Quantity</label>
            <input
                type="number"
                placeholder="Enter Quantity"
                class="mt-1 w-100"
                v-model="newDrug.quantity"
            />
            <the-button :loading="adding" class="w-100 mt-4"> Add </the-button>
        </form>
    </the-modal>
    <!-- Edit Modal -->
    <the-modal v-model="editModal" heading="Edit drug">
        <form @submit.prevent="updateDrug">
            <label class="block">Select Drug Type</label>
            <div class="mt-2">
                <label>
                    <input
                        type="radio"
                        name="drugtype"
                        value="Tab"
                        v-model="selectedDrug.type"
                    />
                    Tab
                </label>
                <label class="ml-2">
                    <input
                        type="radio"
                        name="drugtype"
                        value="Capsule"
                        v-model="selectedDrug.type"
                    />
                    Capsule
                </label>
                <label class="ml-2">
                    <input
                        type="radio"
                        name="drugtype"
                        value="Syrup"
                        v-model="selectedDrug.type"
                    />
                    Syrup
                </label>
                <label class="ml-2">
                    <input
                        type="radio"
                        name="drugtype"
                        value="Suppository"
                        v-model="selectedDrug.type"
                    />
                    Suppository
                </label>
            </div>

            <label class="block mt-3">Drug Name</label>
            <input
                type="text"
                placeholder="Drug Name"
                class="mt-1 w-100"
                v-model="selectedDrug.name"
            />
            <label class="block mt-3">Weight</label>
            <input
                type="text"
                placeholder="weight in mg"
                class="mt-1 w-100"
                v-model="selectedDrug.weight"
            />
            <label class="block mt-3">Vendor</label>
            <select v-model="selectedDrug.vendor">
                <option value="">Select vendor</option>
                <option
                    v-for="vendor in vendors"
                    :key="vendor.id"
                    :value="vendor.name"
                >
                    {{ vendor.name }}
                </option>
            </select>
            <label class="block mt-3">Price</label>
            <input
                type="text"
                placeholder="Pack Price"
                class="mt-1 w-100"
                v-model="selectedDrug.price"
            />
            <label class="block mt-3">Quantity</label>
            <input
                type="number"
                placeholder="Enter Quantity"
                class="mt-1 w-100"
                v-model="selectedDrug.quantity"
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
            <strong>{{ selectedDrug.name }}</strong>
        </p>
        <the-button class="mt-4" @click="deleteDrug" :loading="deleting">
            Yes
        </the-button>
        <the-button class="ml-4" color="gray" @click="deleteModal = false">
            No
        </the-button>
    </the-modal>
</template>
<script>
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

        newDrug: {
            name: "",
            weight: "",
            type: "",
            vendor: "",
            price: "",
            quantity: "",
        },
        adding: false,
        selectedDrug: {},
        editing: false,
        deleting: false,
        drugs: [],
        gettingDrugs: false,
        vendors: [],
    }),
    mounted() {
        setTimeout(this.getAllDrugs, 100);
        setTimeout(this.getAllVendors, 100);
        // this.getAllDrugs();
    },
    methods: {
        getAllVendors() {
            privateService
                .getVendors()
                .then((res) => {
                    this.vendors = res.data;
                })
                .catch((err) => {
                    showErrorMessage(err);
                })
                .finally(() => {});
        },
        getAllDrugs() {
            this.gettingDrugs = true;
            privateService
                .getDrugs()
                .then((res) => {
                    this.drugs = res.data;
                })
                .catch((err) => {
                    showErrorMessage(err);
                })
                .finally(() => {
                    this.gettingDrugs = false;
                });
        },

        addNew() {
            this.adding = true;
            privateService
                .addDrug(this.newDrug)
                .then((res) => {
                    if (res.data.status == true) {
                        showSuccessMessage(res.data.message);
                        this.addModal = false;
                        this.resetForm();
                        this.getAllDrugs();
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

        updateDrug() {
            this.editing = true;
            privateService
                .updateDrug(this.selectedDrug)
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

        deleteDrug() {
            this.deleting = true;
            privateService
                .deleteDrug(this.selectedDrug.id)
                .then((res) => {
                    showSuccessMessage(res.data.message);
                    this.resetForm();
                    this.deleteModal = false;
                    this.getAllDrugs();
                })
                .catch((err) => {
                    showErrorMessage(err);
                })
                .finally(() => {
                    this.deleting = false;
                });
        },

        resetForm() {
            this.newDrug = {
                name: "",
                weight: "",
                type: "",
                vendor: "",
                price: "",
                quantity: "",
            };
        },
    },
};
</script>
