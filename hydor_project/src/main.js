import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Login from './components/Login';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css';
import ES6Promise from 'es6-promise';
ES6Promise.polyfill()
Vue.use(VueRouter);
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
    router,
    render: h => h(App)
}).$mount('#app')