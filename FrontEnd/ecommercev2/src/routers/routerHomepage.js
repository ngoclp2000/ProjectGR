export default [
    {
        path: '/homepage/:key?',
        component: () => import("@/views/homepage/homepage.vue"),
        meta: {},
        name: 'Trang chủ',
    }
]