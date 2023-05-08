<template>
    <div class="the-cart">
        <div class="the-cart__heading">Cart Items</div>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>
                        <img
                            src="/img/trash.png"
                            class="action-icon action-icon--delete-small"
                            alt=""
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in cartItems" :key="key">
                    <td>{{ item.name }}</td>
                    <td>{{ item.weight }}</td>
                    <td>{{ item.price }}</td>
                    <td>
                        <input
                            class="qty-input"
                            type="number"
                            v-model="item.quantity"
                        />
                    </td>

                    <td class="text-right">
                        {{ item.price * item.quantity }}
                    </td>
                    <td>
                        <img
                            src="/img/trash.png"
                            class="action-icon action-icon--delete-small"
                            alt=""
                            @click="removeFromCart(item.id)"
                        />
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6">
                        <div class="text-right">
                            <hr />
                            <strong>Grand Total : {{ totalPrice }} </strong>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
        <the-button
            class="w-100 mt-4"
            v-if="!enteringCustomerInfo"
            @click="enteringCustomerInfo = true"
        >
            Checkout
        </the-button>
        <div v-if="enteringCustomerInfo" class="mt-4">
            <label for="" class="block">Customer Name</label>
            <input
                type="text"
                placeholder="Enter customer name"
                v-model="customer"
                class="w-100"
            />
            <label for="" class="block mt-4">Customer Phone</label>
            <input
                type="text"
                placeholder="Enter customer phone"
                v-model="phone"
                class="w-100"
            />
            <the-button
                class="w-100 mt-4"
                @click="confirmNow"
                :loading="confirming"
            >
                Confirm
            </the-button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useCartStore } from "../store/cartStore";
import TheButton from "./TheButton.vue";
import privateService from "../service/privateService";
import { showErrorMessage, showSuccessMessage } from "../utils/functions";
export default {
    components: {
        TheButton,
    },
    data: () => ({
        phone: "",
        customer: "",
        enteringCustomerInfo: false,
        confirming: false,
    }),
    computed: {
        ...mapState(useCartStore, {
            cartItems: "products",
            totalPrice: "totalPrice",
        }),
    },
    methods: {
        ...mapActions(useCartStore, {
            removeFromCart: "remove",
            // clearCart: "clearCart",
        }),

        confirmNow() {
            const orderData = {
                customer: this.customer,
                phone: this.phone,
                cartItems: this.cartItems,
            };
            // console.log(orderData);
            this.confirming = true;

            privateService
                .sellDrug(orderData)
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.status == true) {
                        showSuccessMessage(res.data.message);
                        this.phone = "";
                        this.customer = "";
                        this.enteringCustomerInfo = false;
                        // this.clearCart();
                        this.$router.push("/dashboard/selling-history");
                    } else {
                        showErrorMessage(res.data.message);
                    }
                })
                .catch((err) => {
                    showErrorMessage(err);
                })
                .finally(() => {
                    this.confirming = false;
                });
        },
    },
};
</script>
<style>
.the-cart {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 11px 22px;
}

.the-cart__heading {
    font-size: 25px;
    font-weight: bold;
    border-bottom: 1px solid rgb(173, 173, 173);
}

.qty-input {
    width: 50px;
    padding: 5px 7px !important;
}

.action-icon--delete-small {
    height: 14px !important;
}
</style>
