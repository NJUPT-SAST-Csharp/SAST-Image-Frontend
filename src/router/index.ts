import auth from "@/stores/auth"
import { createRouter, createWebHistory } from "vue-router"
import ProfileView from "@/views/ProfileView.vue"
import { VueElement, render } from "vue"
import { i18n } from "@/locales/i18n"
import AppVue from "@/App.vue"

declare module "vue-router" {
  interface RouteMeta {
    // 每个路由都必须声明
    requiresAuth: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      redirect: "/",
      meta: { requiresAuth: false }
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresAuth: false }
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue"),
      meta: { requiresAuth: false }
    },
    {
      path: "/:username",
      name: "profile",
      component: ProfileView,
      props: true,
      meta: { requiresAuth: false }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { requiresAuth: false }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: { requiresAuth: false }
    },
    {
      path: "/recent",
      name: "recent",
      component: () => import("../views/LoginView.vue"),
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from) => {
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: "/login"
    }
  }
  const oriName: string = to.name?.toString()!
  console.log(oriName);
  window.document.title = oriName.charAt(0).toUpperCase() + oriName.substring(1) + " / SastImg"
})

export default router
