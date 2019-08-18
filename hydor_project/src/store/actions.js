import Constant from '../Constant';
import axios from 'axios';
import * as session from "../utils/loginService.js";
/* eslint-disable no-console */
//import rou from '../main.js';
// import router from 'vue-router';
export default {
    [Constant.FETCH_POSTS]: (store, payload) => {
        // console.log("actions");
        // console.log(store.state.post.posts);
        axios.get(session.apiurl + "board/" + payload.no)
            .then((response) => {
                console.log("actions");
                store.commit(Constant.FETCH_POSTS, { postlist: response.data });
                // response.data;
            })
    },
    [Constant.REFRESH_CHECK]: (store, payload) => {

        // eslint-disable-next-line no-empty
        axios.get(session.apiurl + "login-refresh", {
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
        return axios.post(session.apiurl + 'login', {
                username: payload.account.id,
                password: payload.account.pw
            })
            .then((response) => {
                console.log(response);
                session.setAccessToken(response.data.access_token);
                session.setRefreshToken(response.data.refresh_token);
                session.setUsername(response.data.username);
                session.setNickname(response.data.nickname);
                //store.commit(Constant.TOKENING, { access: response.data.access_token, refresh: response.data.refresh_token, username: response.data.username });
                store.dispatch(Constant.CHANGE_ISLOADING, { isloading: false });
            })


    },
    [Constant.CHANGE_ISLOADING]: (store, payload) => {
        store.commit(Constant.CHANGE_ISLOADING, payload);
    },
    [Constant.UPDATE_BOARD]: (store, payload) => {
        store.commit(Constant.CHANGE_BOARD, payload);
    }
}