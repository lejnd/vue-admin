import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import Meta from 'vue-meta';

import axios from './utilities/custom-axios';
import router from './router';
import store from './vuex/store';
import * as GlobalDirectives from './directives';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(Meta);
Vue.use(VueAxios, axios);

// axios interceptors
Vue.axios.interceptors.request.use(config => Object.assign({}, config, {
    headers: {
        token: store.getters.token,
    },
}));

Vue.axios.interceptors.response.use((res) => {
    if (res.status === 401) {
        store.dispatch('signOut').then(() => {
            router.replace('/login');
        });
    }
    if (res.status === 403) {
        router.replace('/index');
        return Promise.reject('无权限！');
    }
    if (res.status === 500) {
        return Promise.reject('服务器错误！');
    }
    if (res.status >= 400) {
        return Promise.reject(res.data);
    }
    return res.data;
}, (err) => {
    if (String(err).indexOf('Network Error') !== -1) {
        return Promise.reject('网络错误！');
    }
    return null;
});


Vue.config.debug = (process.env.NODE_ENV !== 'production');

// directives
Object.keys(GlobalDirectives.default).forEach((name) => {
    const config = GlobalDirectives.default[name];
    Vue.directive(config.name, config.directive);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<router-view></router-view>',
});
