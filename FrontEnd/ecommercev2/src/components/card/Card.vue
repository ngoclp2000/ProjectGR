<template>
    <div class="card flex-column" @click="cardClick">
        <div class="card-top">
            <div class="card-sub-information" v-if="productDiscount > 0">
                <slot name="card-sub-information">

                </slot>
            </div>
            <div class="card-image">
                <slot name="card-image">
                    
                </slot>
            </div>
        </div>
        <div class="card-bottom">
            <div class="card-name">
                <slot name="card-name"></slot>
            </div>
            <div class="card-detail-information">
                <slot name="card-detail-information">

                </slot>
            </div>
            <div class="card-button-container">
                <slot name="button">

                </slot>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    emits:[
        "click"
    ],
    props: {
        productDiscount:{
            type: Number,
            default: 0,
        }
    },  
    setup(props, {emit}){
        const cardClick = (e) =>{
            emit("click",e);
        }
        return{
            cardClick
        }
    }
}
</script>

<style lang="scss">
@import "./card.scss";
</style>