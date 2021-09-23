import VueRouter from "vue-router";
import VuexRouterSync from "vuex-router-sync";
import store from "../store";
import routerMonitor from "./routerMonitor";

export const router = new VueRouter({
    base: "/",
    routes: [{
        path: "/index",
        name: "首页",
        component: () => import("../views/app/Index.vue"),
    }, ],
});
routerMonitor(router);

VuexRouterSync.sync(store, router, {
    moduleName: "routeModule",
});
export const asyncStore = store;