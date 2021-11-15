import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import useAuth from "./composable/useAuth";

import Index from "./pages/index.vue";
import About from "./pages/about.vue";
import News from "./pages/news.vue";
import Contact from "./pages/contact.vue";
import NotFound from "./pages/404.vue";
import Login from "./pages/login.vue";
import Secret from "./pages/secret.vue";

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
        path: "/news",
        name: "News",
        component: News,
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/secret",
        name: "Secret",
        component: Secret,
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