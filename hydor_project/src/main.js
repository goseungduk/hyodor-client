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
import GiftBoard from './router/GiftBoard';
import GominBoard from './router/GominBoard';
import LetterBoard from './router/LetterBoard';
import PartyPlaceBoard from './router/PartyPlaceBoard';
//import Axios from 'axios';
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
            path: '/login', name: 'login', component: Login 
        },
        {
            path: '/register', name: 'register', component: Register
        },
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
            // redirect: '/boardlist',
            component: BoardList,
            beforeEnter: (to, from, next) => {
                store.dispatch(Constant.REFRESH_CHECK, { next });
            },
            children: [{
                    // path: 'freeboard/:no',
                    path: 'freeboard',
                    name: 'free',
                    component: FreeBoard,
                    // beforeEnter: (to, from, next) => {
                    //     console.log("before");
                    //     console.log(to.params.no)
                    //         //store.dispatch(Constant.FETCH_POSTS, { no: to.params.no })
                    //     next();
                    // },
                    // props: true
                },
                { path: 'giftboard', name: 'gift', component: GiftBoard },
                { path: 'gominboard', name: 'gomin', component: GominBoard },
                { path: 'letterboard', name: 'letter', component: LetterBoard },
                { path: 'partyplaceboard', name: 'partyPlace', component: PartyPlaceBoard }
            ]
        }
    ]
})
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')