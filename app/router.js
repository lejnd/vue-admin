import VueRouter from 'vue-router';

// components
import Layout from './views/layout';
import Login from './views/login';
import Index from './views/index';
import ErrorPage from './views/error';
import AgentList from './views/agents/agent-list';
import AgentDetail from './views/agents/agent-detail';

const router = new VueRouter({
    routes: [{
        path: '/login',
        component: Login,
    },
    {
        path: '/',
        redirect: 'index',
        component: Layout,
        meta: {
            requiresAuth: true,
            keepAlive: false,
        },
        children: [{
            path: '/index',
            component: Index,
        }, {
            path: 'agents',
            component: AgentList,
            meta: {
                breadcrumbs: [{
                    name: '查看代办员',
                }],
                keepAlive: false,
            },
        }, {
            path: 'agents/:id',
            component: AgentDetail,
            meta: {
                breadcrumbs: [{
                    name: '查看代办员',
                    to: '/agents',
                }, {
                    name: '代办员详情',
                }],
                keepAlive: false,
            },
        }, {
            path: '/error/:num',
            component: ErrorPage,
            meta: {
                breadcrumbs: [{
                    name: '错误页面',
                }],
                keepAlive: false,
            },
        }],
    }],
    mode: 'history',
});

// authorization verify
router.beforeEach((to, from, next) => {
    if (to.fullPath === '/') {
        next({
            path: '/index',
        });
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        const sessionToken = localStorage.getItem('token') || sessionStorage.getItem('token');    // eslint-disable-line no-undef
        if (!sessionToken) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
        next();
    } else {
        next();
    }
});

export default router;
