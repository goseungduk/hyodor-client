import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store';
import ES6Promise from 'es6-promise' //polyfill() 을 쓰기 위한 ES6Promise import
ES6Promise.polyfill()

Vue.config.productionTip = false
    //Vue.prototype.$axios = axios;
new Vue({
    store,
    render: h => h(App),
}).$mount('#app')