export default [
    {
        path: '/homepage/:key?',
        name : 'homepage',
        component: () => import("@/views/homepage/homepage.vue"),
        meta: {}
    }
]