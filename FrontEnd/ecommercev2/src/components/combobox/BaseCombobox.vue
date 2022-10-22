<template>
    <div class="base-dropdown">
        <div class="dropdown-container">
            <base-input ref="inputdropdown" :placeholder="placeholder" @update:modelValue="updateValue"
                @input="filterOption" @baseKeydown="tabPress" :modelValue="modelValue">
            </base-input>
            <div ref="select" style="z-index:4" v-show="isShow && listData.length > 0" class="select-custom"
                :class="directionDrop" :style="[{ width: width + 'px' }]">
                <div v-for="(option, index) in listData" :key="index"
                    @click="evtMouseChoosingOption(option, option['id'])" class="option"
                    :class="[option.isPointed ? 'point-option' : '', option.isChosen ? 'show-select' : '']"
                    :ref="'option' + index">
                    <div class="option-content none-pointer" :style="{ 'textAlign': textAlign }">
                        {{ option.content }}</div>
                </div>
            </div>
            <div class="dropdown-icon icon24 arrow-down" @click="toggleDropdown" ref="dropdownIcon">
            </div>
        </div>
    </div>
</template>

<script>
import {
    defineComponent,
    ref,
    onMounted,
    computed,
    watch,
    nextTick,
    getCurrentInstance
} from 'vue';
import baseInput from '@/components/input/BaseInput.vue';
export default defineComponent({
    name: "BaseCombobox",
    components: {
        baseInput
    },
    props: {
        placeholder: {
            default: null,
            type: [Number, String]
        },
        listDropdownData: {
            default: null,
            type: Object
        },
        directionDrop: {
            default: null,
            type: String
        },
        width: {
            default: null,
            type: Number
        },
        textAlign: {
            default: null,
            type: String
        },
        chosenValue:{
            default :null,
            type: Object
        },
        field:{
            default: null,
            type: String
        }
    },
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const modelValue = ref();
        const isShow = ref(false);
        const listData = ref([]);
        const indexPointedOption = ref(0);
        function toggleDropdown() {
            this.isShow = !this.isShow;
        }
        /**
            * Sự kiện click chuột vào option
            * Created by TBN (22/7/2021)
            */
        function evtMouseChoosingOption(obj, id) {
            modelValue.value = obj.content;
            listData.value.forEach((item) => {
                if (item.id == id) {
                    item.isChosen = true;
                } else {
                    item.isChosen = false;
                }
            })
            isShow.value = false;
            emit('update:chosenObj',obj,props.field);
        }
        onMounted(() => {
            listData.value = props.listDropdownData;
            modelValue.value = props.chosenValue;
            if (listData.value.length > 0) {
                let firstElement = listData.value[0];
                evtMouseChoosingOption(firstElement, firstElement.id);
            }
        });

        watch(() => isShow.value, (newVal, oldVal) => {
            if (newVal) {
                proxy.$refs.inputdropdown.$refs.input.focus();
                document.addEventListener('click', documentClick);
            } else {
                document.removeEventListener('click', documentClick);
            }
        });

        watch(() => modelValue.value, (newVal)=>{
            emit('update:modelValue',newVal,props.field);
        })

        watch(() => props.listDropdownData, (newVal)=>{
            listData.value = newVal;
            modelValue.value = props.chosenValue;
            if (listData.value.length > 0) {
                let firstElement = listData.value[0];
                evtMouseChoosingOption(firstElement, firstElement.id);
            }
        })

        function documentClick(e) {
            let dropdownInput = proxy.$refs.inputdropdown,
                dropdownIcon = proxy.$refs.dropdownIcon;
            let target = e.target;

            if (dropdownInput && target != dropdownIcon && !dropdownInput.$el.contains(target)) {
                isShow.value = false;
            }
        }
        function tabPress(e) {
            if (e.code == "Tab") {
                isShow.value = false; // Ẩn combobox
            } else {
                if(e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13){
                    evtKeyboardChoosingOption(e.keyCode);
                }
            }
        }
        function filterOption(content) {
            modelValue.value = content;
            isShow.value = true;
            let check = content.replace(/\\$/, "");
            let initialContent = content;
            content = content.toString().replace('\\', '');
            listData.value = props.listDropdownData.filter(element => element.content.toString()
                .toLowerCase()
                .search(content.toLowerCase()) != -1 || content == "")
            // Chuyển tất cả trạng thái được chọn và được trỏ về false
            listData.value.forEach(element => {
                element['isChosen'] = false
            });
            listData.value.forEach(element => {
                element['isPointed'] = false
            });
            // Nếu không có dữ liệu sẽ hiển thị lỗi
            // if (listData.value.length == 0 || check != initialContent) {
            //     this.$refs.inputCombobox.errorContentData = this.dictionaryError[this.name].noOption;
            //     this.$refs.inputCombobox.isError = true;
            //     if (check != initialContent) {
            //         this.data = [];
            //     }
            // } else {
            //     this.$refs.inputCombobox.isError = false;
            // }
        }
        function updateValue(value) {
            modelValue.value = value;
        }
        function evtKeyboardChoosingOption(keyCode, event) {
            let amountScroll = 20; // Số lượng fixel scrolled
            let initialValue = isShow.value;
            // if(this.data.length > 12) {
            //     amountScroll = 45;
            // }
            // Sự kiên ẩn hiện dropdown của combobox
            if (keyCode != 13) {
                // Nếu là nút lên, xuống thì hiện dropdown và thiết lập ô được chỉ đến
                if (isShow.value == false) {
                    // Nếu trước đó dropdown đang đóng
                    indexPointedOption.value = 0 // Set option đầu tiên được trỏ đến
                    setPointedOption(listData.value[indexPointedOption.value].id)
                }
                isShow.value = true;
            } else {
                // Sự kiên Enter
                // Toggle dropdown
                isShow.value = !isShow.value
                if (listData.value.length == 0) return;
                // Chờ một khoảng thời gian
                if (isShow.value == false) {
                    // Nếu trước đó dropdown đang hiện
                    if (indexPointedOption.value >= 0) {
                        // Mượn sự kiện click chuột vào option
                        evtMouseChoosingOption(listData.value[indexPointedOption.value],listData.value[indexPointedOption.value].id)
                    }
                    // Chuyển trạng thái được trỏ tới của option về false
                    //this.resetPointedOption();
                } else {
                    // Nếu trước đó dropdown đang đóng
                    indexPointedOption.value = 0 // Set option đầu tiên được trỏ đến
                    setPointedOption(listData.value[indexPointedOption.value].id)
                }
                // this.$nextTick(() => {
                //     if (!initialvalue) {
                //         this.focusChosenOption(event, amountScroll);
                //     }
                // })
                return;
            }
            if (initialValue) {
                // Sự kiện mũi tên lên,xuống sau khi đã hiện dropdown
                setTimeout(() => {
                    let maxIndex = listData.value.length - 1
                    if (keyCode == 38) {
                        // Nút lên kiểm tra xem có đang ở option đầu tiên
                        indexPointedOption.value = indexPointedOption.value <= 0 ? maxIndex : indexPointedOption.value - 1
                    } else if (keyCode == 40) {
                        // Nút xuống kiểm tra xem có đang ở option cuối cùng k
                        indexPointedOption.value = indexPointedOption.value == maxIndex ? 0 : indexPointedOption.value + 1
                    }
                    // Chuyển pointed option sang option mới
                    setPointedOption(listData.value[indexPointedOption.value].id)
                    // Scroll nội dung xuống option hiện tại
                    let option = proxy.$refs["option" + (indexPointedOption.value >= 0 ? indexPointedOption.value : 0)][0];
                    let topOps = option.offsetTop;
                    proxy.$refs.select.scrollTop = topOps;
                    // Chỉnh scroll cho vừa tầm nhìn
                    // if (indexPointedOption.value != maxIndex) {
                    //     proxy.$refs.select.scrollBy({
                    //         top: -(amountScroll)
                    //     });
                    // } else {
                    //     proxy.$refs.select.scrollBy({
                    //         top: -(amountScroll)
                    //     });
                    // }
                }, 20)
            }
        }
        function setPointedOption(id) {
            listData.value.forEach(element => {
                if (element.id == id) {
                    element.isPointed = true
                } else {
                    element.isPointed = false
                }
            })
        }
        return {
            modelValue,
            isShow,
            listData,
            toggleDropdown,
            evtMouseChoosingOption,
            tabPress,
            filterOption,
            updateValue,
            evtKeyboardChoosingOption
        }
    }
}) 
</script>

<style lang="scss" scoped>
@import './BaseCombobox.scss';

.p-dropdown {
    width: 14rem;
}

.country-item {
    img {
        width: 17px;
        margin-right: 0.5rem;
    }
}
</style>