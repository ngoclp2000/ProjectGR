<template>
    <div class="checkout-page flex">
        <div class="checkout-page-title">
            Thanh toán
        </div>
        <div class="checkout-page-payment-method checkout-page-radio-container">
            <div class="checkout-page-payment-method-title checkout-page-radio-title">
                LỰA CHỌN HÌNH THỨC THANH TOÁN
            </div>
            <div class="payment-method-container radio-container">
                <base-radio :listRadio="listMethodPayment" :modelValue="model.paymentMethod" @update:modelValue="updateValue" field="paymentMethod"></base-radio>
            </div>
        </div>
        <div class="checkout-page-shipping-method checkout-page-radio-container">
            <div class="checkout-page-shipping-method-title checkout-page-radio-title">
                LỰA CHỌN HÌNH THỨC NHẬN HÀNG
            </div>
            <div class="shipping-method-container radio-container">
                <base-radio :listRadio="listMethodShipping" :modelValue="model.shippingMethod" @update:modelValue="updateValue" field="shippingMethod"></base-radio>
            </div>
        </div>
        <div class="checkout-page-address">
            <div class="address-checkout-form">
                <div class="name-input flex flex-row flex-center mb-20px">
                    <div class="name-input-title flex1">
                        Họ và tên<span class="color-red">*</span>
                    </div>
                    <div class="name-input-field flex5">
                        <base-input placeholder="Nhập họ và tên đầy đủ" :modelValue="model.name" @update:modelValue="updateValue" field="name"></base-input>
                    </div>
                </div>
                <div class="phone-input flex flex-row flex-center mb-20px">
                    <div class="phone-input-title flex1">
                        Số điện thoại<span class="color-red">*</span>
                    </div>
                    <div class="phone-input-field flex5">
                        <base-input placeholder="Nhập số điện thoại" :modelValue="model.phone" @update:modelValue="updateValue" field="phone"></base-input>
                    </div>
                </div>
                <div class="address-city flex flex-row flex-center mb-20px">
                    <div class="address-city-title flex1">Tỉnh/ Thành phố<span class="color-red">*</span></div>
                    <div class="address-city-field flex5">
                        <base-combobox placeholder="Chọn tỉnh/ thành phố" :width="400" :listDropdownData="dataWard" 
                        :chosenValue="model.city" @update:modelValue="updateValue" field="city">
                        </base-combobox>
                    </div>
                </div>
                <div class="address-ward flex flex-row flex-center mb-20px">
                    <div class="address-ward-title flex1">Quận/ Huyện<span class="color-red">*</span></div>
                    <div class="address-ward-field flex5">
                        <base-combobox placeholder="Chọn quận/ huyện" :width="400" :listDropdownData="dataWard1"
                        @update:modelValue="updateValue" field="ward"
                        >
                        </base-combobox>
                    </div>
                </div>
                <div class="address-commune flex flex-row flex-center mb-20px">
                    <div class="address-commune-title flex1">Phường/ Xã<span class="color-red">*</span></div>
                    <div class="address-commune-field flex5">
                        <base-combobox placeholder="Chọn phường/ xã" :width="400" :listDropdownData="dataWard2"
                        @update:modelValue="updateValue" field="commune"
                        >
                        </base-combobox>
                    </div>
                </div>
                <div class="address-detail flex flex-row flex-center mb-20px">
                    <div class="address-detail-input-title flex1">
                        Số nhà, tên đường<span class="color-red">*</span>
                    </div>
                    <div class="address-detail-input-field flex5">
                        <base-input placeholder="Nhập Số,nhà tên đường" :modelValue="model.addressDetail" @update:modelValue="updateValue" field="addressDetail"></base-input>
                    </div>
                </div>
                <div class="email-input flex flex-row flex-center mb-20px">
                    <div class="email-input-title flex1">
                        Địa chỉ email
                    </div>
                    <div class="email-input-field flex5">
                        <base-input placeholder="Nhập địa chỉ email" :modelValue="model.email" @update:modelValue="updateValue" field="email"></base-input>
                    </div>
                </div>
                <div class="note-input flex flex-row flex-center">
                    <div class="note-input-title flex1">
                        Ghi chú
                    </div>
                    <div class="note-input-field flex5">
                        <textarea rows="3" placeholder="Khách hàng yêu cầu khác vui lòng nhập vào đây để cửa hàng có thể phục vụ tốt nhất" v-model="model.note"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="note-detail-checkout">
            <div class="note-detail-checkout-content" v-html="detailNoteCart">
                
            </div>
            <div class="flex flex-center">
                <base-button text="THANH TOÁN" customClass="btn-white btn-padding">
                </base-button>
            </div>
        </div>
    </div>
</template>

<script>
import baseInput from '@/components/input/BaseInput.vue';
import BaseCombobox from '@/components/combobox/BaseCombobox.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import { useFormat } from '@/commons/format.js';
import BaseRadio from '@/components/radio/BaseRadio.vue';
import { ref,computed,getCurrentInstance,onMounted} from 'vue';
export default {
    components: {
        baseInput,
        BaseCombobox,
        BaseButton,
        BaseRadio
    },
    setup() {
        const { formatVND } = useFormat();
        const {proxy} = getCurrentInstance();
        const model = ref({
            paymentMethod: 1,
            shippingMethod : 1
        });
        const dataWard = ref([{
            content: 'Hello',
            id: 1,
        }, {
            content: 'World1',
            id: 2
        }, {
            content: 'World2',
            id: 3
        }, {
            content: 'World3',
            id: 4
        }, {
            content: 'World4',
            id: 5
        }, {
            content: 'World5',
            id: 6
        }, {
            content: 'World6',
            id: 7
        }, {
            content: 'World7',
            id: 8
        }, {
            content: 'World8',
            id: 9
        }, {
            content: 'World9',
            id: 10
        }]);
        const dataWard1 = ref([{
            content: 'Hello',
            id: 1,
        }, {
            content: 'World1',
            id: 2
        }, {
            content: 'World2',
            id: 3
        }, {
            content: 'World3',
            id: 4
        }, {
            content: 'World4',
            id: 5
        }, {
            content: 'World5',
            id: 6
        }, {
            content: 'World6',
            id: 7
        }, {
            content: 'World7',
            id: 8
        }, {
            content: 'World8',
            id: 9
        }, {
            content: 'World9',
            id: 10
        }]);
        const dataWard2 = ref([{
            content: 'Hello',
            id: 1,
        }, {
            content: 'World1',
            id: 2
        }, {
            content: 'World2',
            id: 3
        }, {
            content: 'World3',
            id: 4
        }, {
            content: 'World4',
            id: 5
        }, {
            content: 'World5',
            id: 6
        }, {
            content: 'World6',
            id: 7
        }, {
            content: 'World7',
            id: 8
        }, {
            content: 'World8',
            id: 9
        }, {
            content: 'World9',
            id: 10
        }]);
        const listMethodPayment = ref([{
            value : 1,
            label: 'Thanh toán trực tuyến(ONLINE)',
            group: 'methodPayment'
        },{
            value : 2,
            label: 'Thanh toán khi nhận hàng(COD)',
            group: 'methodPayment'
        }]);
        const listMethodShipping = ref([{
            value : 1,
            label: 'Giao hàng tận nơi',
            group: 'methodShipping'
        }]);
        const totalComputedMoney = computed(() => {
            return proxy.$store.getters.totalMoneyCart;
        });

        const totalProductCart = computed(() => {
            return proxy.$store.state.productCartList ? proxy.$store.state.productCartList.length : 0;
        })

        const detailNoteCart = computed(()=>{
            let message = `Tóm tắt: Khách hàng đặt đơn hàng giá trị <strong> ${formatVND(totalComputedMoney.value)} </strong> gồm <strong> ${totalProductCart.value} </strong> 
            sản phẩm, vui lòng kiểm tra lại đơn hàng.`;
            return message;
        })

        const updateValue = (value,field) =>{
            model.value[field] = value;
        }
        
        return {
            dataWard,
            dataWard1,
            dataWard2,
            totalComputedMoney,
            totalProductCart,
            detailNoteCart,
            listMethodPayment,
            listMethodShipping,
            model,
            updateValue
        }
    }
}
</script>

<style lang="scss" scoped>
@import './Checkout.scss';
</style>