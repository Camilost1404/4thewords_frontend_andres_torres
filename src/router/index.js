import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/legend/:id',
        name: 'Legend',
        component: () => import('@/views/LegendUpdate.vue'),
    },
    {
        path: '/legend/create',
        name: 'LegendCreate',
        component: () => import('@/views/LegendCreate.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;