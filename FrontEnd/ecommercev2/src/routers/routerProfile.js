export default [
    {
        path: '/profile/:key?',
        component: () => import("@/views/profile/Profile.vue"),
        meta: {},
        name: 'Trang cá nhân',
    }
]