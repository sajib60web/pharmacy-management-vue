import { axiosPrivate } from "./axiosInstance";

export default {
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
};
