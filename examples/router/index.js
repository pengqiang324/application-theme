import Vue from "vue";
import Router from "vue-router";
import App from '@/App'
import Table from '@/pages/Table'
Vue.use(Router);
export const constantRoutes = [
  {
    path: "/",
    component: App,
    name: "首页",
    redirect: '/test',
    children: [
        {
            path: '/test',
            component: Table,
            name: '表格测试'
        }
    ]
  }
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });
const router = createRouter();
export default router;
