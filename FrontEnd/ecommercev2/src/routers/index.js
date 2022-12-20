import { createRouter, createWebHistory } from "vue-router";
import routerHomepage from "./routerHomepage";
import routerProductPage from "./routerProductPage.js";
import routerCart from "./routerCart.js";
import routerCheckout from "./routerCheckout.js";
import routerProfile from './routerProfile.js';
import routerDemo from "./routerDemo.js";
import routerAdmin from "./routerAdmin";
import store from '@/store/store.js';


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
        ...routerProfile,
      ]
    },
    {
      path : '/:pathMatch(.*)*',
      component: () => import('@/views/notfound/NotFound.vue'),
      meta:{
        anonymous : true
      }
    },{
      path: '/login:key?',
      component: () => import ('@/views/login/LoginPage.vue'),
      name: 'Login Page',
      meta:{
        anonymous : true
      }
    },{
      path: '/signup',
      component: () => import ('@/views/signup/SignupPage.vue'),
      name: 'Signup',
      meta:{
        anonymous : true
      }
    },{
      path: '/completeProfile',
      component: () => import ('@/views/signup/CompleteProfile.vue'),
      name: 'Complete Profile',
      meta:{
        anonymous : true
      }
    },{
      path: '/logout:key?',
      component: () => import ('@/views/logout/Logout.vue'),
      name: 'Logout',
      meta:{
        anonymous : true
      }
    },
    ...routerDemo,
    ...routerAdmin
  ],
});

router.beforeEach((to,from,next) =>{
  const publicPages = ['/login', '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.state.token;
  if (authRequired && !loggedIn) {
    next('/login');
  }
  document.title = to.name;
  next();
})

export default router;
