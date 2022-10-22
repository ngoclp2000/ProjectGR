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
                    <base-radio :listRadio="listMethodPayment" :modelValue="model.paymentMethod"
                        @update:modelValue="updateValue" field="paymentMethod"></base-radio>
                </div>
            </div>
            <div class="checkout-page-shipping-method checkout-page-radio-container">
                <div class="checkout-page-shipping-method-title checkout-page-radio-title">
                    LỰA CHỌN HÌNH THỨC NHẬN HÀNG
                </div>
                <div class="shipping-method-container radio-container">
                    <base-radio :listRadio="listMethodShipping" :modelValue="model.shippingMethod"
                        @update:modelValue="updateValue" field="shippingMethod"></base-radio>
                </div>
            </div>
            <div class="checkout-page-address">
                <div class="address-checkout-form">
                    <div class="name-input flex flex-row flex-center mb-20px">
                        <div class="name-input-title flex1">
                            Họ và tên<span class="color-red">*</span>
                        </div>
                        <div class="name-input-field flex5">
                            <base-input placeholder="Nhập họ và tên đầy đủ" :modelValue="model.name"
                                @update:modelValue="updateValue" field="name"></base-input>
                        </div>
                    </div>
                    <div class="phone-input flex flex-row flex-center mb-20px">
                        <div class="phone-input-title flex1">
                            Số điện thoại<span class="color-red">*</span>
                        </div>
                        <div class="phone-input-field flex5">
                            <base-input placeholder="Nhập số điện thoại" :modelValue="model.phone"
                                @update:modelValue="updateValue" field="phone"></base-input>
                        </div>
                    </div>
                    <div class="address-city flex flex-row flex-center mb-20px">
                        <div class="address-city-title flex1">Tỉnh/ Thành phố<span class="color-red">*</span></div>
                        <div class="address-city-field flex5">
                            <base-combobox placeholder="Chọn tỉnh/ thành phố" :width="400"
                                :listDropdownData="dataProvince" :chosenValue="model.city"
                                @update:modelValue="updateValue" field="city" @update:chosenObj="changeProvince">
                            </base-combobox>
                        </div>
                    </div>
                    <div class="address-ward flex flex-row flex-center mb-20px">
                        <div class="address-ward-title flex1">Quận/ Huyện<span class="color-red">*</span></div>
                        <div class="address-ward-field flex5">
                            <base-combobox placeholder="Chọn quận/ huyện" :width="400" :listDropdownData="dataDistricts"
                                @update:modelValue="updateValue" field="ward" @update:chosenObj="changeDistricts">
                            </base-combobox>
                        </div>
                    </div>
                    <div class="address-commune flex flex-row flex-center mb-20px">
                        <div class="address-commune-title flex1">Phường/ Xã<span class="color-red">*</span></div>
                        <div class="address-commune-field flex5">
                            <base-combobox placeholder="Chọn phường/ xã" :width="400" :listDropdownData="dataWards"
                                @update:modelValue="updateValue" field="commune">
                            </base-combobox>
                        </div>
                    </div>
                    <div class="address-detail flex flex-row flex-center mb-20px">
                        <div class="address-detail-input-title flex1">
                            Số nhà, tên đường<span class="color-red">*</span>
                        </div>
                        <div class="address-detail-input-field flex5">
                            <base-input placeholder="Nhập Số,nhà tên đường" :modelValue="model.addressDetail"
                                @update:modelValue="updateValue" field="addressDetail"></base-input>
                        </div>
                    </div>
                    <div class="email-input flex flex-row flex-center mb-20px">
                        <div class="email-input-title flex1">
                            Địa chỉ email
                        </div>
                        <div class="email-input-field flex5">
                            <base-input placeholder="Nhập địa chỉ email" :modelValue="model.email"
                                @update:modelValue="updateValue" field="email"></base-input>
                        </div>
                    </div>
                    <div class="note-input flex flex-row flex-center">
                        <div class="note-input-title flex1">
                            Ghi chú
                        </div>
                        <div class="note-input-field flex5">
                            <textarea rows="3"
                                placeholder="Khách hàng yêu cầu khác vui lòng nhập vào đây để cửa hàng có thể phục vụ tốt nhất"
                                v-model="model.note"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="note-detail-checkout">
                <div class="note-detail-checkout-content" v-html="detailNoteCart">

                </div>
                <div class="flex flex-center">
                    <base-button text="THANH TOÁN" customClass="btn-white btn-padding" @click.stop="takePayment">
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
import axios from 'axios';
import OrderAPI from '@/apis/components/orderAPI';

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
        const dataProvince = ref([]);
        const dataDistricts = ref([]);
        const dataWards = ref([]);
        const BASE_API_URL = 'https://provinces.open-api.vn/api';
        onMounted( async ()=>{
            proxy.$store.dispatch({
                type : 'updateIsLoading',
                loading : true
            })
            const res = await axios.get(`${BASE_API_URL}/p/`);
            if(res && res.data){
                dataProvince.value = res.data;
                dataProvince.value.forEach(item => {
                    item.content = item.name;
                    item.id = item.code;
                })
            }
            proxy.$store.dispatch({
                type : 'updateIsLoading',
                loading : false
            })
        })



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
        async function fetchDistricts(provinceCode) {
            const res = await axios.get(`${BASE_API_URL}/p/${provinceCode}?depth=2`);
            if(res && res.data ){
                return res.data;
            }
            return [];
        }

        async function fetchWards(districtCode) {
            const res = await axios.get(`${BASE_API_URL}/d/${districtCode}?depth=2`);
            if(res && res.data ){
                return res.data;
            }
            return [];
        }

        async function changeProvince (obj){
            proxy.$store.dispatch({
                type : 'updateIsLoading',
                loading : true
            })
            if(obj){
                dataDistricts.value = [];
                dataWards.value = [];
                let res = await fetchDistricts(obj.code);
                if(res && Array.isArray(res.districts)){
                    dataDistricts.value = res.districts;
                    dataDistricts.value.forEach(item => {
                    item.content = item.name;
                    item.id = item.code;
                })
                }
            }
            proxy.$store.dispatch({
                type : 'updateIsLoading',
                loading : false
            })
        }

        async function changeDistricts(obj){
            proxy.$store.dispatch({
                type : 'updateIsLoading',
                loading : true
            })
            if(obj){
                dataWards.value = [];
                let res = await fetchWards(obj.code);
                if(res && Array.isArray(res.wards)){
                    dataWards.value = res.wards;
                    dataWards.value.forEach(item => {
                    item.content = item.name;
                    item.id = item.code;
                    
                })
                }
            }
            proxy.$store.dispatch({
                type : 'updateIsLoading',
                loading : false
            })
            
        }

        const updateValue = (value,field) =>{
            model.value[field] = value;
        }


        const takePayment = async () =>{
            proxy.model.orderTotalAmount = totalComputedMoney;
            const res = await OrderAPI.takePayment(proxy.model);
        }

        return {
            dataProvince,
            dataDistricts,
            dataWards,
            totalComputedMoney,
            totalProductCart,
            detailNoteCart,
            listMethodPayment,
            listMethodShipping,
            model,
            updateValue,
            changeProvince,
            changeDistricts,
            takePayment
        }
    }
}
</script>

<style lang="scss" scoped>
@import './Checkout.scss';
</style>