<template>
    <div class="d-flex jc-between ai-center">
        <h2>All vendors</h2>
        <the-button @click="addModal = true">Add New</the-button>
    </div>
    <table class="mt-4">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Name</td>
                <td>Description</td>
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
        <h1>Hello</h1>
    </the-modal>
</template>
<script>
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
export default {
    components: {
        TheButton,
        TheModal,
    },
    data: () => ({
        addModal: false,
    }),
};
</script>
<style></style>
