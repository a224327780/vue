import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: 'Lists', component: () => import("../views/Lists.vue")},
    {path: '/:id', component: () => import("../views/Detail.vue")},
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import("../views/404.vue")
    }
]
export default createRouter({
    history: createWebHistory(),
    routes
})
