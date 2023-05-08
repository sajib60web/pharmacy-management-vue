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
        </table>
    </div>
</template>
<script>
export default {};
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
