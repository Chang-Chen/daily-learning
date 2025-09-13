import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/view/func-list.vue')
        }, {
            path: '/testPage',
            component: () => import('@/view/testPage.vue')
        }, {
            path: '/useSortable_v1',
            component: () => import('@/view/sortablejs_v1.vue')
        }, {
            path: '/useSortable_v2',
            component: () => import('@/view/sortablejs_v2.vue')
        }, {
            path: '/asyncComponent',
            component: () => import('@/view/asyncComponent.vue')
        }
    ],
})

export default router
