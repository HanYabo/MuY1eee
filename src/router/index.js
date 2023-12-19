import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: () => import('../views/Login.vue')
        },
        {
            // 主页跳转到登录页面
            path: '/',
            redirect: '/login',
            children: [
                {
                    path: '/home',
                    redirect: '/welcome',
                    component: () => import('../views/Home/Index.vue'),
                    children: [
                        {
                            path: '/welcome',
                            component: () => import('../views/Welcome.vue')
                        },
                        {
                            path: '/emp',
                            component: () => import('../views/Employee.vue')
                        },
                        {
                            path: '/category',
                            component: () => import('../views/Category.vue')
                        },
                        {
                            path: '/dish',
                            component: () => import('../views/Dish.vue')
                        },
                        {
                            path: '/combo',
                            component: () => import('../views/Combo.vue')
                        },
                        {
                            path: '/order',
                            component:  () => import('../views/Order.vue')
                        }
                    ]
                }
            ]
        }
    ]
})

export default router