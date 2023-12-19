import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("../views/Login.vue"),
    },
    {
      // 主页跳转到登录页面
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      redirect: "/welcome",
      component: () => import("../views/Home/Index.vue"),
      children: [
        {
          path: "/welcome",
          name: "系统首页",
          component: () => import("../views/Welcome.vue"),
        },
        {
          path: "/emp",
          name: "员工管理",
          component: () => import("../views/Employee.vue"),
        },
        {
          path: "/category",
          name: "分类管理",
          component: () => import("../views/Category.vue"),
        },
        {
          path: "/dish",
          name: "菜品管理",
          component: () => import("../views/Dish.vue"),
        },
        {
          path: "/combo",
          name: "套餐管理",
          component: () => import("../views/Combo.vue"),
        },
        {
          path: "/order",
          name: "订单管理",
          component: () => import("../views/Order.vue"),
        },
      ],
    },
  ],
});

export default router;
