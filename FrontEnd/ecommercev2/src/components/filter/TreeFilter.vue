<template>
    <div class="tree-filter" >
        <div class="header-filter" @click="triggerToggle">
            <div class="name-filter">
                {{ objectData?.name }}
            </div>
            <div class="icon-toggle icon24 next" :class="{ 'toggle': toggle }">

            </div>
        </div>
        <div class="filter-content" :class="{ 'toggle': toggle }">
            <div class="master-option" v-for="(master, index) in objectData.data" :key="index"
                >
                <div class="master-header" @click.prevent="handleMasterClick(master)">
                    <div class="master-header-content">
                        {{ master[objectData.nameField] }}
                    </div>
                    <div class="icon24 icon-toggle next" :class="{ 'toggle': !master.toggle }"
                        v-if="(master.children != null && master.children.length > 0)">

                    </div>
                    <div v-else>

                    </div>
                </div>
                <div class="detail-option" :class="{ 'toggle': !master.toggle}" >
                    <div class="detail-option-item" :class="{'chosen' : detail.chosen}" v-for="(detail, index1) in master.children" :key="(index + index1)" @click="(e) => itemClick(detail,e)">
                        {{ detail[objectData.nameField] }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'TreeFilter',
    props: {
        objectData: {
            type: Object,
            default: null
        }
    },
    emits:['filterChange'],
    setup(props, { emit }) {
        const toggle = ref(false);
        const keepingChosen = ref({});
        const triggerToggle = () => {
            toggle.value = !toggle.value;
        }

        const itemClick = (item,event) =>{
            event.preventDefault();
            keepingChosen.value.chosen = false;
            item.chosen = true;
            keepingChosen.value = item;
            emit('filterChange',item,props.objectData.field,props.objectData.type);
        }

        const handleMasterClick = (master) =>{
            if(master && master.children && Array.isArray(master.children)){
                let chosenItem = master.children.find(item => item.chosen == true);
                if(chosenItem){
                    return;
                }
            }
            master.toggle = !master.toggle;
        }

        return {
            toggle,
            triggerToggle,
            itemClick,
            handleMasterClick
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.tree-filter {

    margin-top: 20px;
    background: #ffffff;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .icon-toggle {
        transition: all 0.3s ease;
        rotate: 90deg;

        &.toggle {
            rotate: 270deg;
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

    .filter-content {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 5px 10px;
        padding-right: 0px;
        height: auto;
        transition: all 0.15s ease-out;
        overflow: hidden;

        &.toggle {
            height: 0px;
            padding: 0;
            transition: all 0.25s ease-in;
        }

        .master-option {
            display: flex;
            flex-direction: column;

            .detail-option {
                padding: 10px 20px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                cursor: pointer;
                height: auto;
                transition: all 0.15s ease-out;
                overflow: hidden;

                &.toggle {
                    height: 0px;
                    padding: 0;
                    transition: all 0.15s ease-in;
                }

                .detail-option-item {
                    &:hover {
                        color: #ffd55d;
                    }
                    &.chosen{
                        color: #ffd55d;
                    }
                }
            }

            .master-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;

                &:hover {
                    .master-header-content {
                        color: #ffd55d;
                    }
                }

                .master-header-content {
                    font-weight: 500;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>