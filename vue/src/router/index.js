import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
    mode:"history",
    routes: [
        {
            path: '/',
            component: () => import('@/components/common/Home.vue'),
            meta: { title: '' },
            children:[
                {
                    path: '/welcome',
                    component: () => import('@/components/page/Welcome.vue'),
                    meta: { title: 'menus.home' }
                },
                {
                    path: '/reference',
                    component: () => import('@/components/page/Reference.vue'),
                    meta: { title: 'menus.reference' }
                },
                {
                    path: '/implement',
                    component: () => import('@/components/page/Implement.vue'),
                    meta: { title: 'menus.implement' }
                },
                {
                    path: '/404',
                    component: () => import('@/components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('@/components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/components/page/Login.vue'),
            meta: { title: 'account.login' }
        },
        {
            path: '*',
            redirect: '/404'
        },
    ]
})
