<template>
    <div class="product-card" v-if="!hide">
        <card @click="cardClick"
        :productDiscount="productDiscount"
        >
            <template #card-sub-information >
                <div class="product-discount" >
                    {{productDiscount}}%
                </div>
            </template>
            <template #card-image>
                <img :src="productImage" alt="" style="width: 100%; height: 100%">
            </template>
            <template #card-name>
                <span>{{productName}}</span>
            </template>
            <template #card-detail-information>
                <div class="product-detail product-unit">
                    ĐVT: {{productUnit}}
                </div>
                <div class="product-detail product-price" v-if="productPrice > 0">
                    {{formatVND(productPrice)}}
                </div>
                <div class="product-detail product-old-price" v-if="productOldPrice > 0">
                    {{formatVND(productOldPrice)}}
                </div>
            </template>
            <template #button>
                <base-button text="Thêm vào giỏ hàng" customClass="w-100 btn-red" @click.stop="addProductCart">

                </base-button>
            </template>
        </card>
    </div>

</template>

<script>
import Card from './Card.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import {getCurrentInstance} from 'vue';
import {useFormat} from '@/commons/format.js';
import { useToast } from "primevue/usetoast";
export default {
    name: "ProductCard",
    components: {
        Card,
        BaseButton
    },
    props: {
        hide:{
            type: Boolean,
            default: false,
        },
        productId:{
            type: String,
            default: ""
        },
        productDiscount:{
            type: Number,
            default: 0,
        },
        productName:{
            type: String,
            default: "Tên sản phẩm",
        },
        productUnit:{
            type: String,
            default: ""
        },
        productPrice:{
            type: Number,
            default: 0,
        },
        productOldPrice:{
            type: Number,
            default: 0,
        },
        productImage:{
            type: String,
            default: ""
        }
    },
    emits:[
        "cardClick"
    ],
    setup(props, { emit }) {
        const toast = useToast();
        const {proxy} = getCurrentInstance();
        const {formatVND} = useFormat();
        const cardClick = (e) => {
            proxy.$router.push({ path: '/product' });
            proxy.$store.dispatch({
                type : 'changeProductView',
                productView : props.productId
            })
        }
        const addProductCart = (e)=>{
            e.preventDefault();
            let payload = {
                productId : props.productId,
                productName: props.productName,
                productUnit : props.productUnit,
                productQuantity : 1,
                productPrice : props.productPrice,
                productOldPrice: props.productOldPrice,
                productDiscount: props.productDiscount,
                productImage: props.productImage
            }
            proxy.$store.dispatch('addProductCart',payload);
            toast.add({severity:'info', summary:'Thông báo', detail:'Thêm thành công', life: 2500});
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