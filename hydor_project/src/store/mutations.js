import Constant from '../Constant';
export default {
    [Constant.CERTIFICATE]: (state) => {
        state.login_ok = true;
    },
    [Constant.CHANGE_ISLOADING]: (state, payload) => {
        state.isloading = payload.isloading;
    },
    [Constant.TOKENING]: (state, payload) => {
        state.access_token = payload.access;
        state.refresh_token = payload.refresh;
        state.account.username = payload.username;
        //로컬스토리지에도 저장
        localStorage.access_token = payload.access;
        localStorage.refresh_token = payload.refresh;
        localStorage.username = payload.username;
        /* eslint-disable no-console */
        console.log(localStorage.access_token);
        console.log(localStorage.refresh_token);
    },
    [Constant.FETCH_POSTS]: (state, payload) => {
        state.post.posts = payload.postlist.posts;
        state.post.totalcount = payload.postlist.totalcount;
        state.post.count = payload.postlist.count;
        // console.log("mutations end");
        // console.log(state.post.posts);
    }
}