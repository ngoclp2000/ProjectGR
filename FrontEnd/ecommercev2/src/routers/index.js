import { createRouter, createWebHistory } from "vue-router";
import routerHomepage from "./routerHomepage";
import routerProductPage from "./routerProductPage.js";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      redirect: '/homepage',
      component: () => import('@/layouts/MainLayout/MainLayout.vue'),
      meta : {

      },
      children: [
        ...routerHomepage,
        ...routerProductPage
      ]
    },
    {
      path : '/:pathMatch(.*)*',
      component: () => import('@/views/notfound/NotFound.vue'),
      meta:{
        anonymous : true
      }
    }
  ],
});

export default router;
