export default [
    {
        path: '/product/:key?',
        name : 'product',
        component: () => import("@/views/productpage/ProductPage.vue"),
        meta: {}
    }
]