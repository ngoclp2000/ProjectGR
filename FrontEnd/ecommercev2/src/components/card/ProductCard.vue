<template>
    <div class="product-card" v-if="!hide">
        <card @click="cardClick" :productDiscount="productDiscount">
            <template #card-sub-information>
                <div class="product-discount">
                    {{ objectProduct?.productDiscount || productDiscount }}%
                </div>
            </template>
            <template #card-image>
                <img :src="objectProduct?.productImageLink || productImage" alt="" style="width: 100%; height: 100%">
            </template>
            <template #card-name>
                <span>{{ objectProduct?.productName || productName }}</span>
                <div v-if="objectProduct?.productRate" class="product-rate">
                    <star-rating :rating="objectProduct?.productRate" :star-size="15" :show-rating="false" read-only
                        v-bind:max-rating="5"></star-rating>
                </div>
            </template>
            <template #card-detail-information>
                <div class="product-detail product-unit">
                    ĐVT: {{ objectProduct?.productUnit || productUnit }}
                </div>
                <div class="product-detail product-price" v-if="(objectProduct?.productPrice || productPrice) > 0">
                    {{ formatVND(objectProduct?.productPrice || productPrice) }}
                </div>
                <div class="product-detail product-old-price"
                    v-if="(objectProduct?.productOldPrice || productOldPrice) > 0">
                    {{ formatVND(objectProduct?.productOldPrice || productOldPrice) }}
                </div>
            </template>
            <template #button v-if="hasButton">
                <base-button text="Thêm vào giỏ hàng" customClass="w-100 btn-red" @click.stop="addProductCart">

                </base-button>
            </template>
        </card>
    </div>

</template>

<script>
import Card from './Card.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import { getCurrentInstance } from 'vue';
import { useFormat } from '@/commons/format.js';
import { useToast } from "primevue/usetoast";
import StarRating from 'vue-star-rating';
export default {
    name: "ProductCard",
    components: {
        Card,
        BaseButton,
        StarRating
    },
    props: {
        hide: {
            type: Boolean,
            default: false,
        },
        objectProduct: {
            type: Object,
            default: null
        },
        productId: {
            type: String,
            default: ""
        },
        productDiscount: {
            type: Number,
            default: 0,
        },
        productName: {
            type: String,
            default: "Tên sản phẩm",
        },
        productUnit: {
            type: String,
            default: ""
        },
        productPrice: {
            type: Number,
            default: 0,
        },
        productOldPrice: {
            type: Number,
            default: 0,
        },
        productImage: {
            type: String,
            default: ""
        },
        hasButton: {
            type: Boolean,
            default: true
        },
        customClickEvent: {
            type: Function,
            default: null
        }
    },
    emits: [
        "cardClick"
    ],
    setup(props, { emit }) {
        const toast = useToast();
        const { proxy } = getCurrentInstance();
        const { formatVND } = useFormat();
        const cardClick = (e) => {
            if (props.customClickEvent && typeof props.customClickEvent === "function") {
                props.customClickEvent(props.objectProduct);
            } else {
                proxy.$router.push({ path: '/product' });
                proxy.$store.dispatch({
                    type: 'changeProductView',
                    productView: props.productId
                })
            }
        }
        const addProductCart = (e) => {
            e.preventDefault();
            let payload = {
                productId: props.productId,
                productName: props.productName,
                productUnit: props.productUnit,
                productQuantity: 1,
                productPrice: props.productPrice,
                productOldPrice: props.productOldPrice,
                productDiscount: props.productDiscount,
                productImage: props.productImage
            }
            proxy.$store.dispatch('addProductCart', payload);
            toast.add({ severity: 'info', summary: 'Thông báo', detail: 'Thêm thành công', life: 2500 });
        }
        return {
            cardClick,
            formatVND,
            addProductCart
        }
    }
}
</script>

<style lang="scss">
.product-card {
    font-size: 12px;

    .product-rate {
        display: flex;
        gap: 10px;
        margin-top: 5px;
    }

    .product-detail {
        margin-bottom: 5px;
    }

    .product-price {
        font-weight: 700;
    }

    .product-old-price {
        text-decoration: line-through;

        color: #82869e;
    }
}
</style>