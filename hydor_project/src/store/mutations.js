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
        
    },
    [Constant.FETCH_POSTS]: (state, payload) => {
        state.post.posts = payload.postlist.posts;
        //array
        state.post.totalcount = payload.postlist.totalcount;
        state.post.count = payload.postlist.count;
        // console.log("mutations end");
        // console.log(state.post.posts);
    },
    [Constant.CHANGE_BOARD]: (state, payload) => {
        state.currentView = payload.currentView;
        if (payload.num)
            state.no = payload.num;
    }
}