<template>
    <div class="admin-container">
        <div class="nav-bar" :class="{'toggle-navbar' : !toggleNavbarValue}">

            <div class="information">
                <div class="avatar">
                    <img :src="$store.state.account['avatar']" alt="">
                </div>
                <div class="main-information " v-if="toggleNavbarValue">
                    <div class="name">
                        {{ $store.state.account['fullName'] }}
                    </div>
                    <div class="email">
                        {{ $store.state.account['email'] }}
                    </div>
                </div>

            </div>
            <div class="main-menu">
                <main-menu-item v-for="(menuItem) in menuList" :key="menuItem.key" :menuItemObject="menuItem" :toggleNavbarValue="toggleNavbarValue"
                    @click="menuItemClick">

                </main-menu-item>
            </div>
        </div>
        <div class="main-content-admin" :class="{'toggle-navbar' : !toggleNavbarValue}" >
            <div class="label-container">
                <div class="icon24 three-line" @click="toggleNavbar">

                </div>
                
            </div>
            <Suspense>
                <router-view />
                <template #fallback> Loading </template>
            </Suspense>
        </div>
    </div>
</template>

<script>
import MainMenuItem from '@/components/mainMenuItem/MainMenuItem.vue';
import { useAdminPage } from './AdminPage.js';
import { getCurrentInstance, onMounted,ref } from 'vue';
export default {
    components: {
        MainMenuItem
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const { menuList } = useAdminPage();
        const toggleNavbarValue = ref(true);
        onMounted(() => {
        })
        
        const menuItemClick = async (key) => {
            let url = "";
            menuList.forEach(item => {
                if (item.key == key) {
                    item.isSelected = true;
                    url = item.route;
                } else {
                    item.isSelected = false;
                }
            });
            await proxy.$store.dispatch('updateMenuItems', menuList);
            proxy.$router.push(url);
        }

        const toggleNavbar = () =>{
            proxy.toggleNavbarValue = !proxy.toggleNavbarValue;
        }

        return {
            menuList,
            menuItemClick,
            toggleNavbar,
            toggleNavbarValue
        }
    }
}
</script>

<style lang="scss">
@import './AdminPage.scss';
</style>