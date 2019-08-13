import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
//import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import ES6Promise from 'es6-promise';
import store from './store';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Slider from '@jeremyhamm/vue-slider'
import Login from './router/Login';
import Home from './router/Home';
import BoardList from './router/BoardList';
import FreeBoard from './router/FreeBoard';
// import GiftBoard from './router/GiftBoard';
// import GominBoard from './router/GominBoard';
// import LetterBoard from './router/LetterBoard';
// import PartyPlaceBoard from './router/PartyPlaceBoard';
//import Axios from 'axios';
import Constant from './Constant';
/* eslint-disable no-console */

ES6Promise.polyfill()
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Slider);

Vue.config.productionTip = true


const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'login', component: Login },
        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter: (to, from, next) => {
                store.dispatch(Constant.REFRESH_CHECK, { next });
            }
        },
        {
            path: '/boardlist',
            name: 'boardlist',
            // redirect: '/boardlist/freeboard/1',
            component: BoardList,
            beforeEnter: (to, from, next) => {
                store.dispatch(Constant.REFRESH_CHECK, { next });
            },
            children: [
                { path: 'freeboard/:no', name: 'free', component: FreeBoard, props: true }
            ]
        }
    ]
})
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')