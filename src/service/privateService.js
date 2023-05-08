import { axiosPrivate } from "./axiosInstance";

export default {
    // Vendors
    getVendors() {
        return axiosPrivate.get("private/vendor");
    },
    addVendor(payload) {
        return axiosPrivate.post("private/vendor/create", payload);
    },

    updateVendor(payload) {
        return axiosPrivate.put("private/vendor/update/" + payload.id, payload);
    },

    deleteVendor(id) {
        return axiosPrivate.delete("private/vendor/delete/" + id);
    },

    // Drug
    getDrugs() {
        return axiosPrivate.get("private/drug");
    },
    addDrug(payload) {
        return axiosPrivate.post("private/drug/create", payload);
    },

    updateDrug(payload) {
        return axiosPrivate.put("private/drug/update/" + payload.id, payload);
    },

    deleteDrug(id) {
        return axiosPrivate.delete("private/drug/delete/" + id);
    },

    searchDrug(searchString) {
        return axiosPrivate.post("private/drug/search", {
            searchString: searchString,
        });
    },
};
