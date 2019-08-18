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
import Slider from '@jeremyhamm/vue-slider'
import Login from './router/Login';
import Register from './router/Register';
import Home from './router/Home';
import BoardList from './router/BoardList';
import FreeBoard from './router/FreeBoard';
import WriteBoard from './router/WriteBoard';
import ViewBoard from './router/ViewBoard';
import Constant from './Constant';
/* eslint-disable no-console */

ES6Promise.polyfill()
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Slider);
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
                //store.dispatch(Constant.REFRESH_CHECK, { next });
                next();
            }
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
                path: 'viewboard/:con_no',
                name: 'view',
                component: ViewBoard,
                props: true
            }]
        }
    ]
})
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')