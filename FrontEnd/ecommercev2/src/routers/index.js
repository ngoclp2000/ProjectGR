import { createRouter, createWebHistory } from "vue-router";
import routerHomepage from "./routerHomepage";
import routerProductPage from "./routerProductPage.js";
import routerCart from "./routerCart.js";
import routerCheckout from "./routerCheckout.js";
import routerProfile from './routerProfile.js';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      redirect: '/homepage',
      name: 'Trang chủ',
      component: () => import('@/layouts/MainLayout/MainLayout.vue'),
      meta : {

      },
      children: [
        ...routerHomepage,
        ...routerProductPage,
        ...routerCart,
        ...routerCheckout,
        ...routerProfile
      ]
    },
    {
      path : '/:pathMatch(.*)*',
      component: () => import('@/views/notfound/NotFound.vue'),
      meta:{
        anonymous : true
      }
    },{
      path: '/login',
      component: () => import ('@/views/login/LoginPage.vue'),
      name: 'Đăng nhập',
      meta:{
        anonymous : true
      }
    },{
      path: '/signup',
      component: () => import ('@/views/signup/SignupPage.vue'),
      name: 'Đăng ký',
      meta:{
        anonymous : true
      }
    },{
      path: '/completeProfile',
      component: () => import ('@/views/signup/CompleteProfile.vue'),
      name: 'Hoàn thành hồ sơ',
      meta:{
        anonymous : true
      }
    }
  ],
});

router.beforeEach((to,from,next) =>{
  document.title = to.name;
  next();
})

export default router;
