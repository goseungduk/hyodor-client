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
import Login from './components/Login';
import Home from './components/Home';

ES6Promise.polyfill()
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Slider);
// Vue.use(BootstrapVue);
// 위에 이미
// import 해놨습니다 수정 NONO
Vue.config.productionTip = false




const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'login', component: Login },
        { path: '/home', name: 'home', component: Home }
    ]
})
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')