<template>
    <div class="cart-page flex flex-row">
        <div class="cart-page-left flex4">
            <div class="cart-page-action-button flex flex-between">
                <base-button text="TIẾP TỤC MUA HÀNG" customClass="btn-white btn-padding no-active" @click="goBackToHomepage">
                </base-button>
                <base-button text="XÓA GIỎ HÀNG?" customClass="btn-red btn-padding " @click="confirmDeleteCart">
                </base-button>
            </div>
            <div class="cart-page-product-list">
                <div class="cart-page-product-detail flex flex-between" v-for="(product, index) in productList"
                    :key="index">
                    <div class="cart-page-product-image">
                        <img :src="product.productImage" alt="">
                    </div>
                    <div class="main-information flex flex-column flex-bs-33">
                        <div class="main-information-product-name main-information-product-detail">
                            {{ product.productName }}
                        </div>
                        <div class="main-information-product-unit main-information-product-detail">
                            ĐVT: {{ product.productUnit }}
                        </div>
                        <div class="main-information-delete main-information-product-detail">
                            <div class="" @click="confirmDeleteProduct(product)">
                                Xóa khỏi giỏ hàng
                            </div>
                        </div>
                    </div>
                    <div class="price-quantity flex flex-bs-33">
                        <div class="cart-page-product-detail-price">

                        </div>
                        <div class="cart-page-product-detail-old-price">

                        </div>
                        <div class="cart-page-product-detail-discount">

                        </div>

                    </div>
                    <div class="cart-page-product-detail-quantity flex-bs-16">
                        <vue-number-input v-model="product.productQuantity" :inputtable="false" :min="1" :max="10"
                            size="small" inline controls>
                        </vue-number-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart-page-right flex1">
            <div class="total-amount flex flex-between cart-page-right-item">
                <div class="total-amount-title">
                    Tạm tính:
                </div>
                <div class="total-amount-value">
                    {{formatVND(totalComputedMoney)}}
                </div>
            </div>
            <div class="discount-system flex flex-between cart-page-right-item">
                <div class="discount-system-title">
                    Khuyến mãi + Chiết Khấu 1%:
                </div>
                <div class="discount-system-value">
                    - {{formatVND(totalComputedMoney * 0.01)}}
                </div>
            </div>
            <div class="discount-input cart-page-right-item">
                <base-input placeholder="NHẬP MÃ GIẢM GIÁ TẠI ĐÂY"></base-input>
            </div>
            <div class="shipping-fee flex flex-between cart-page-right-item">
                <div class="shipping-fee-title">
                    Phí vận chuyển:
                </div>
                <div class="shipping-fee-value">
                    {{formatVND(20000)}}
                </div>
            </div>
            <div class="final-amount flex flex flex-between cart-page-right-item">
                <div class="final-amount-title">
                    Thành tiền:
                </div>
                <div class="final-amount-value">
                    {{ formatVND(totalComputedMoney - totalComputedMoney*0.01 + 20000)}}
                </div>
            </div>
            <div class="sub-information cart-page-right-item">
                (Giá đã bao gồm VAT)
            </div>
            <base-button text="THANH TOÁN" customClass="btn-white btn-padding w-100" @click="goToCheckout">
                </base-button>
        </div>
        <confirm-dialog></confirm-dialog>
    </div>
</template>

<script>
import BaseButton from "@/components/button/BaseButton.vue";
import baseInput from '@/components/input/BaseInput.vue';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useFormat } from '@/commons/format.js';
import { usePrimeVue } from "primevue/config";

import { ref, getCurrentInstance, computed, onMounted } from 'vue';
export default {
    components: {
        baseInput,
        BaseButton,
        VueNumberInput,
        ConfirmDialog,
    },
    props: {

    },
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const { formatVND } = useFormat();
        const toast = useToast();
        const confirm = useConfirm();
        const changeToVietnamese = () => {
            const primevue = usePrimeVue();
            primevue.config.locale.accept = 'Có';
            primevue.config.locale.reject = 'Không';
        }
        const confirmDeleteAll = () => {
            confirm.require({
                message: 'Cảnh báo: Toàn bộ sản phẩm trong giỏi hàng hiện tại sẽ bị xóa đi',
                header: 'XÓA GIỎ HÀNG?',
                accept: () => {
                    proxy.$store.dispatch('emptyProductCart');
                    toast.add({severity:'info', summary:'Thông báo', detail:'Xóa thành công', life: 3000});
                },
                reject: () => {
                }
            });
        }
        const confirmDeleteProduct = (product) => {
            confirm.require({
                message: `Bạn có chắc chắn muốn xóa sản phẩm ${product.productName} khỏi giỏ hàng không?`,
                header: 'XÓA SẢN PHẨM?',
                accept: () => {
                    proxy.$store.dispatch('removeProductCart',product);
                    toast.add({severity:'info', summary:'Thông báo', detail:'Xóa thành công', life: 3000});
                },
                reject: () => {
                }
            });
        }
        const productList = computed(() => {
            return proxy.$store.state.productCartList;
        })
        const totalComputedMoney = computed(() => {
            let total = 0;
            if (proxy.$store.state.productCartList) {
                proxy.$store.state.productCartList.forEach(item => total += item.productQuantity * item.productPrice);
            }
            return total;
        });
        const goBackToHomepage = () =>{
            proxy.$router.push("/");
        }
        const confirmDeleteCart = () =>{
            confirmDeleteAll();
        }

        const goToCheckout = () =>{
            proxy.$router.push("/checkout");
        }

        onMounted(() => {
             changeToVietnamese();
        })
        return { productList,totalComputedMoney,formatVND,goBackToHomepage,confirmDeleteCart,confirmDeleteProduct,goToCheckout}
    }
}
</script>

<style lang="scss">
@import "./CartPage.scss";
</style>