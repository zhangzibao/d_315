import Router from "vue-router";
import Vue from 'vue';

Vue.use(Router);

export default new Router({
    mode: "hash",
    base: process.env.NODE_ENV === 'production'
        ? "/315/"
        : "/",
    routes: [
        {
            path: "/",
            name: "index",
            redirect: "/login"
        },
        {
            path: "/login",
            name: "login",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Login.vue")
        },
        {
            path: "/home",
            name: "home",
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Home.vue"),
            redirect: "/user",
            children: [
                {
                    path: "/user",
                    name: "user",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./views/user/user.vue")
                },
                {
                    path: "/record",
                    name: "record",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./views/record/record.vue")
                }
            ]
        }
    ]
});
