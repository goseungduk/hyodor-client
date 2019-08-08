import Constant from '../Constant';
import axios from 'axios';
//import rou from '../main.js';
// import router from 'vue-router';
export default {
    [Constant.LOGIN_GO]: (store, payload) => {
        return axios.post('http://203.229.206.16:12345/api/v1/login', {
                username: payload.account.id,
                password: payload.account.pw
            })
            .then((response) => {
                /* eslint-disable no-console */
                console.log(response);
            })
            .catch((e) => {
                console.log(e.response);
            })
            // .catch((e) => {
            //     // if (e.response.status == 401) {
            //     //     alert("올바르지않은 아이디 혹은 비밀번호");
            //     // } else {
            //     alert("[" + e.response.status + "]" + " Login Failed");
            //     return false;

        // })

    }
}