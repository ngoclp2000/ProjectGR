export default [
    {
        path: '/cart/:key?',
        component: () => import("@/views/cart/CartPage.vue"),
        meta: {},
        name: 'Giỏ hàng',
    }
]