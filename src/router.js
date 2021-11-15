import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import useAuth from "./composable/useAuth";

import Index from "./pages/index.vue";
import About from "./pages/about.vue";
import NotFound from "./pages/404.vue";
import Login from "./pages/login.vue";
import Applications from "./pages/applications.vue";
import Bugs from "./pages/bugs.vue";
import Solutions from "./pages/solutions.vue";

const {isAuthenticated} = useAuth();

const routes = [
    {
        path: "/",
        name: "Index",
        component: Index,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/applications",
        name: "Applications",
        component: Applications,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated.value) {
                next("/login");
            }
            next();
        }
    },
    {
        path: "/bugs",
        name: "Bugs",
        component: Bugs,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated.value) {
                next("/login");
            }
            next();
        }
    },
    {
        path: "/solutions",
        name: "Solutions",
        component: Solutions,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated.value) {
                next("/login");
            }
            next();
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;