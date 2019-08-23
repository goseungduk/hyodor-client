import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
//import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import ES6Promise from 'es6-promise';
import store from './store';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@fortawesome/fontawesome-free/css/all.css"
import Slider from '@jeremyhamm/vue-slider'
import VueWait from 'vue-wait';


import Login from './router/Login';
import Register from './router/Register';
import Home from './router/Home';
import BoardList from './router/BoardList';
import FreeBoard from './router/FreeBoard';
import WriteBoard from './router/WriteBoard';
import ViewBoard from './router/ViewBoard';
import AdminConsole from './router/AdminConsole.vue';
import ServiceInfo from './router/ServiceInfo';
import OldWelfare from './router/OldWelfare';
import OldPlace from './router/OldPlace';
import MyPage from './router/Mypage.vue';
import NotFound from './router/NotFound';
import Constant from './Constant';

import * as session from './utils/loginService'
/* eslint-disable no-console */

ES6Promise.polyfill()
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Slider);
Vue.use(VueWait);
// Vue.use(BootstrapVue);
// 위에 이미
// import 해놨습니다 수정 NONO
Vue.config.productionTip = true


const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/login' },
        //계정인증 루틴 넣기
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter: (to, from, next) => {
                if (session.isLoggedIn()) {
                    next();
                }
                else {
                    next('/login');
                }
            }
        },
        {
            path: '/mypage',
            name: 'mypage',
            component: MyPage,
        },
        {
            path: '/boardlist',
            name: 'boardlist',
            redirect: '/boardlist/freeboard/1',
            component: BoardList,
            props: true,
            children: [{
                // path: 'freeboard/:no',
                path: 'freeboard/:no',
                name: 'free',
                component: FreeBoard,
                props: true
            }, {
                path: 'writeboard/:no',
                name: 'write',
                component: WriteBoard,
                props: true
            }, {
                path: 'viewboard/:no/:con_no',
                name: 'view',
                component: ViewBoard,
                props: true
            }]
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminConsole,
            beforeEnter: (to, from, next) => {
                session.isAdmin()
                    .then(function() {
                        next();
                    })
                    .catch(function() {
                        next('/home');
                    })

            }
        },
        {
            path: '/serviceinfo',
            name: 'service',
            redirect: '/serviceinfo/oldplace',
            component: ServiceInfo,
            children: [{
                path: 'oldwelfare',
                name: 'oldwelfare',
                component: OldWelfare,
                props: true
            }, {
                path: 'oldplace',
                name: 'oldplace',
                component: OldPlace,
                props: true
            }]
        },
        { path: '*', component: NotFound }
    ]
})
new Vue({
    store,
    router,
    render: h => h(App),
    wait: new VueWait({
        useVuex: true
    })
}).$mount('#app')