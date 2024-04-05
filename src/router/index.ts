import { createRouter, createWebHistory } from "vue-router";
import ProfileView from "@/views/ProfileView.vue";
import useAuthStore from "@/stores/auth";
import SquareView from "@/views/SquareView.vue";
import TopicView from "@/views/TopicView.vue";

declare module "vue-router" {
  interface RouteMeta {
    // 每个路由都必须声明
    requiresAuth: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 重定向
      path: "/home",
      redirect: "/",
    },
    {
      path: "/",
      name: "home",
      redirect: "/square",
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/albums",
      name: "albums",
      component: () => import("../views/AlbumsView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/@:username",
      name: "profile",
      component: ProfileView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/square",
      name: "square",
      component: SquareView,
      meta: { requiresAuth: false },
    },
    {
      path: "/topic/:id",
      name: "topic",
      component: TopicView,
      props: true,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: "/login",
    };
  }

  const oriName: string = to.name?.toString()!;
  console.log(oriName);
  window.document.title =
    oriName.charAt(0).toUpperCase() + oriName.substring(1) + " / SastImg";
});

export default router;
