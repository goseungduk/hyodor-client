import Constant from '../Constant';
import axios from 'axios';
/* eslint-disable no-console */
//import rou from '../main.js';
// import router from 'vue-router';
export default {
    [Constant.FETCH_POSTS]: (store, payload) => {
        // console.log("actions");
        // console.log(store.state.post.posts);
        axios.get("http://203.229.206.16:12345/api/v1/board/" + payload.no)
            .then((response) => {
                console.log("actions");
                store.commit(Constant.FETCH_POSTS, { postlist: response.data });
                // response.data;
            })
    },
    [Constant.REFRESH_CHECK]: (store, payload) => {

        // eslint-disable-next-line no-empty
        axios.get("http://203.229.206.16:12345/api/v1/login-refresh", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.refresh_token
            }
        }).then((response) => {
            // console.log(response);
            payload.next();
        }).catch((e) => {
            console.log(e);
            alert("비정상적인 접근입니다!");
            payload.next('/login');
        })

    },
    [Constant.LOGIN_GO]: (store, payload) => {
        store.dispatch(Constant.CHANGE_ISLOADING, { isloading: true });
        return axios.post('http://203.229.206.16:12345/api/v1/login', {
                username: payload.account.id,
                password: payload.account.pw
            })
            .then((response) => {
                console.log(response);
                store.commit(Constant.TOKENING, { access: response.data.access_token, refresh: response.data.refresh_token, username: response.data.username });
                store.dispatch(Constant.CHANGE_ISLOADING, { isloading: false });
            })
    },
    [Constant.CHANGE_ISLOADING]: (store, payload) => {
        store.commit(Constant.CHANGE_ISLOADING, payload);
    }
}