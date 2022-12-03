export default [{
    path: '/admin',
    component: () => import("@/views/admin/AdminPage.vue"),
    meta: {},
    name: 'Trang tổng quan',
    redirect: '/admin/dashboard',
    children: [{
        path: 'dashboard',
        component: () => import("@/views/admin/dashboard/Dashboard.vue"),
        name: 'Dashboard',
    },{
        path: 'product',
        component: () => import("@/views/admin/productmanagement/ProductManage.vue"),
        name: 'Product',
    },{
        path: 'category',
        component: () => import("@/views/admin/categorymanagement/CategoryManage.vue"),
        name: 'Category',
    },{
        path: 'order',
        component: () => import("@/views/admin/ordermanagement/OrderManage.vue"),
        name: 'Order',
    },{
        path: 'sales',
        component: () => import("@/views/admin/salesmanagement/SalesManage.vue"),
        name: 'Sales',
    },{
        path: 'customer',
        component: () => import("@/views/admin/customermanagement/CustomerManage.vue"),
        name: 'Customer',
    },{
        path: 'supplier',
        component: () => import("@/views/admin/suppliermanagement/SupplierManage.vue"),
        name: 'Supplier',
    },{
        path: 'accounting',
        component: () => import("@/views/admin/accountingmanagement/AccountingManage.vue"),
        name: 'Accounting',
    }]
}]