<template>
    <div class="complete-profile-page">
        <div class="signup-container flex flex-row">
            <div class="signup-content-left  w-50">
                <div class="signup-content-left-title">
                    Hoàn thành hồ sơ
                </div>
                <div class="signup-field-container flex flex-column">
                    <div class="signup-field-label">
                        Email
                    </div>
                    <div class="signup-field-input">
                        <base-input placeholder="Nhập email" :modelValue="model.email" @update:modelValue="updateValue"
                            field="email"></base-input>
                    </div>
                </div>
                <div class="signup-field-container flex flex-column">
                    <div class="signup-field-label">
                        Số điện thoại
                    </div>
                    <div class="signup-field-input">
                        <base-input placeholder="Số điện thoại" :modelValue="model.phoneNumber"
                            @update:modelValue="updateValue" field="phoneNumber"></base-input>
                    </div>
                </div>
                <div class="signup-field-container flex flex-column">
                    <div class="signup-field-label">
                        Địa chỉ
                    </div>
                    <div class="signup-field-input">
                        <base-input placeholder="Địa chỉ" :modelValue="model.address" @update:modelValue="updateValue"
                            field="address"></base-input>
                    </div>
                </div>
                <div class="signup-field-container flex flex-column">
                    <div class="signup-field-label">
                        Ảnh đại diện
                    </div>
                    <div class="signup-field-input">
                        <div className="complete-profile__upload-photo">
                            <img :src="model.avatar" alt="" v-show="model.avatar"/>
                            <label htmlFor="upload-photo">
                                <Icon icon="carbon:cloud-upload" color="#373737" />
                                <span>Upload photo</span>
                            </label>
                            <input type="file" name="" id="upload-photo" @change=uploadPhotoHandler accept="image/gif, image/jpeg"/>
                        </div>
                    </div>
                </div>
                <div class="signup-button">
                    <base-button text="HOÀN THÀNH" customClass="btn-white btn-padding w-100" @click="completeProfile">
                    </base-button>
                </div>
            </div>
            <div class="signup-content-right  w-50 flex flex-center flex-column">
                <div class="logo-container flex-column flex-center">

                    <a href="/">
                        <div class="logo">

                        </div>
                    </a>
                    <div class="welcome-text">
                        Chào mừng bạn đến mới Tân Thời Shop
                    </div>
                </div>
                <div class="ask">
                    Bạn đã có tài khoản?
                </div>
                <div class="signup-button">
                    <base-button text="ĐĂNG NHẬP" customClass="btn-red btn-padding" @click="goToLogin">
                    </base-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '@/components/button/BaseButton.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import AccountAPI from '@/apis/components/accountAPI';
import { ref, getCurrentInstance } from 'vue';
import { useToast } from "primevue/usetoast";
export default {
    name: 'CompleteProfile',
    components: {
        BaseButton,
        BaseInput,
    },
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const model = ref({});
        const publicID = ref();
        const signature = ref();
        const apiKey = ref('539832413128967:CQeiFqkvX96PoGvFRliRruc43-o');
        const timestamp = ref();
        const toast = useToast();
        const updateValue = (value, field) => {
            model.value[field] = value;
        }
        const goToLogin = () => {
            proxy.$router.push("/login");
        }

        const uploadPhotoHandler = async (e) => {
            const file = e.target.files[0];
            try {
                model.value.avatar =  "./assets/giphy.gif";
                var formdata = new FormData();
                formdata.append("file", file);
                formdata.append("upload_preset", "zykutcrp");

                var requestOptions = {
                    method: "POST",
                    body: formdata,
                    // redirect: "follow",
                };

                // if(publicID.value){
                //     var requestDeleteOptions = {
                //         method : "POST",
                //         body: JSON.stringify({
                //             public_id: publicID.value,
                //             signature : signature.value,
                //             api_key : apiKey.value,
                //             timestamp : timestamp.value
                //         })
                //     }
                //     fetch("https://api.cloudinary.com/v1_1/mp32022/image/destroy", requestDeleteOptions)
                //     .then((response) => response.json())
                //     .then((result) => {
                        
                //     })
                //     .catch((error) => console.log("error", error));
                // }

                fetch("https://api.cloudinary.com/v1_1/mp32022/upload/", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        model.value.avatar = result.url;
                        publicID.value = result.public_id;
                        signature.value = result.signature;
                        timestamp.value = result.version;
                    })
                    .catch((error) => console.log("error", error));
            } catch (error) {

                console.log(error);
             }
        };

        const completeProfile = async () =>{
            if(model.value){
                let account = proxy.$store.state.account;
                model.value.userId = account.userId;
                let res = await AccountAPI.completeProfile(proxy.model);
                if(res && res.data && res.data.data && res.data.data.code == 200){
                    toast.add({severity:'info', summary:'Thông báo', detail:'Hoàn thành cập nhật tài khoản', life: 2500})
                    proxy.$router.push("/login");
                }
            }
        }

        return {
            model,
            updateValue,
            goToLogin,
            uploadPhotoHandler,
            completeProfile
        }
    }
}
</script>

<style lang="scss">
@import './CompleteProfile.scss';
</style>