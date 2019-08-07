import Constant from '../Constant';
import axios from 'axios';
export default {
    [Constant.LOGIN_GO]: (store, payload) => {
        axios.post('http://203.229.206.16:12345/api/v1/login', {
                username: payload.account.id,
                password: payload.account.pw
            })
            .then((response) => {
                //alert(response.status);
                if (response.status == 200) {
                    alert('Login!!');
                    // alert(response.data.access_token);
                    // alert(response.data.refresh_token);
                    store.commit(Constant.TOKENING, { access: response.data.access_token, refresh: response.data.refresh_token });
                    store.dispatch(Constant.CHECK_TOKEN);
                }
            })
            .catch((e) => {
                if (e.response.status == 401) {
                    alert("올바르지않은 아이디 혹은 비밀번호");
                } else {
                    alert("[" + e.response.status + "]" + " Login Failed");
                }
            })

    },
    [Constant.CHECK_TOKEN]: (store) => {
        if (localStorage.access_token) {
            store.commit(Constant.VIEWING, { board: "boardList" });
            //지금은 자유게시판 하나밖에 없으니 여기로 분기
            //console.log(store.state.access_token);
        } else {
            store.commit(Constant.VIEWING, { board: "addLogin" });
        }

    }
}