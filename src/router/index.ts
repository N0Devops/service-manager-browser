import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home-view/HomeView.vue'
import ProgramManage from "@/views/home-view/program/program-manage/ProgramManage.vue";
import ProgramConfig from "@/views/home-view/program/program-config/ProgramConfig.vue";
import LoginView from "@/views/login-view/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: '/home',
    component: HomeView,
    meta: {
      requireAuth: true,
    },
    children: [
      { path: "", redirect: "/home/manage" },
      { path: "manage", component: ProgramManage },
      { path: "config", component: ProgramConfig },
    ],
  },
  {
    path: "/login",
    component: LoginView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta?.requireAuth && !window.localStorage.getItem("token")) {
    return next("/")
  }
  return next()
})

export default router
