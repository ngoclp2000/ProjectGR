<template>
    <div class="product-card" v-if="!hide">
        <card @click="cardClick">
            <template #card-sub-information>
                <div class="product-discount">
                    12%
                </div>
            </template>
            <template #card-image>
                <img src="~@/assets/images/product.jpg" alt="" style="width: 100%; height: 100%">
            </template>
            <template #card-name>
                <span>Sữa đậu nành hạnh nhân 1L</span>
            </template>
            <template #card-detail-information>
                <div class="product-detail product-unit">
                    ĐVT: Hộp
                </div>
                <div class="product-detail product-price">
                    41.900 đ
                </div>
                <div class="product-detail product-old-price">
                    66.500 đ
                </div>
            </template>
            <template #button>
                <base-button text="Thêm vào giỏ hàng" customClass="w-100 btn-red">

                </base-button>
            </template>
        </card>
    </div>

</template>

<script>
import Card from './Card.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import {getCurrentInstance} from 'vue';
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
        }
    },
    emits:[
        "cardClick"
    ],
    setup(props, { emit }) {

        const {proxy} = getCurrentInstance();

        const cardClick = (e) => {
            //proxy.$router.push({ path: '/product' });
            proxy.$store.dispatch({
                type : 'changeProductView',
                productView : "123"
            })
            console.log(proxy.$store.state.productView);
        }
        return {
            cardClick
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