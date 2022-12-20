<template>
    <div class="star-filter">
        <div class="header-filter" @click="triggerToggle">
            <div class="name-filter">
                {{ objectData?.name }}
            </div>
            <div class="icon-toggle icon24 next" :class="{ 'toggle': toggle }">

            </div>
        </div>
        <div class="filter-content" :class="{ 'toggle': toggle }">
            <star-rating :rating="rating" :increment="0.5" :star-size="25" :show-rating="false"
                @update:rating="ratingChange" @rating-selected="syncRating" ></star-rating>
        </div>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import { ref, onMounted, getCurrentInstance } from 'vue';
export default {
    components: {
        StarRating
    },
    props: {
        objectData: {
            type: Object,
            default: null
        }
    },
    emits: ["filterChange"],
    setup(props, { emit }) {
        const rating = ref(0);
        const { proxy } = getCurrentInstance();

        const ratingChange = (rating) => {
            emit("filterChange", rating, props.objectData.field, props.objectData.type);
        }
        const toggle = ref(false);
        const triggerToggle = () => {
            toggle.value = !toggle.value;
        }
        onMounted(() => {
        })


        return {
            rating,
            ratingChange,
            toggle,
            triggerToggle,
        }
    }, methods: {
        syncRating(rating) {
            this.rating = rating;
        },
        resetRating() {
            this.rating = 0;
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.star-filter {
    margin-top: 20px;
    background: #ffffff;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;

    .icon-toggle {
        transition: all 0.3s ease;
        rotate: 90deg;

        &.toggle {
            rotate: 270deg;
        }
    }

    .filter-content {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 5px 10px;
        padding-right: 0px;
        height: auto;
        transition: all 0.15s ease-out;

        &.toggle {
            height: 0px;
            padding: 0;
            overflow: hidden;
            margin-top: 0px;
            transition: all 0.25s ease-in;
        }
    }

    .header-filter {
        cursor: pointer;

        &:hover {
            .name-filter {
                color: #ffd55d;
            }
        }

        .name-filter {
            font-weight: $font-weight-bold;
            font-size: 16px;

        }

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>