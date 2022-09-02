export default [
    {
        path: '/product/:key?',
        component: () => import("@/views/productpage/ProductPage.vue"),
        meta: {},
        name: 'Sản phẩm',
    }
]