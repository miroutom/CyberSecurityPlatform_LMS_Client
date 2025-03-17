import { createRouter, createWebHashHistory } from "vue-router";
import TaskPage from "@/components/TaskPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: TaskPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
