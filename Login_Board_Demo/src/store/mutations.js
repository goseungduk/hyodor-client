import Constant from '../Constant';
export default {
    [Constant.TOKENING]: (state, payload) => {
        state.access_token = payload.access;
        state.refresh_token = payload.refresh;
        //로컬스토리지에도 저장
        localStorage.access_token = payload.access;
        localStorage.refresh_token = payload.refresh;
        console.log(localStorage.access_token);
        console.log(localStorage.refresh_token);
        console.log(state.access_token === localStorage.access_token);
    },
    [Constant.VIEWING]: (state, payload) => {
        state.currentView = payload.board;
    }
}