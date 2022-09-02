export default [
    {
        path: '/checkout/:key?',
        component: () => import("@/views/checkout/CheckOut.vue"),
        meta: {},
        name: 'Thanh toán',
    }
]