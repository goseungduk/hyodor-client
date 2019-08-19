<template>
    <div>
       <b-form-input class="mt-2" v-model="title" placeholder="제목을 입력하세요"></b-form-input>
        <b-form-textarea class="mt-2" id="textarea" v-model="content" placeholder="내용을 입력하세요" rows="8" max-rows="8"></b-form-textarea>
        <b-button class="mt-1 button"  @click="submit()">작성하기</b-button>
    </div>
</template>
<script>
import axios from 'axios';
import mapState from 'vuex';
import * as session from "../utils/loginService.js";
import Constant from '../Constant';
export default {
    props: {
        no: ''
    },
    data: function() {
        return {
            title: '',
            content: ''
        }
    },
    methods: {
        submit() {
            session.post(session.apiurl + "board/" + this.no, { title: this.title, content: this.content })
                .then((response) => {
                    alert('게시글작성 완료!');
                    // this.$store.dispatch(Constant.UPDATE_BOARD, {
                    //     currentView: "FreeBoard"
                    // });
                    this.$router.push(
                        { name: 'free', params: { no:this.no }}
                    )
                    return response;
                })
                .catch((e) => {
                    if (e.response.status == 401) {
                        alert("다시 로그인 해주세요!!");
                        this.items = [];
                        location.href = "/login";
                    } else {
                        alert("서버오류!");
                    }
                })
        }
    }
    // computed:mapState(['no'])
};
</script>
<style scoped>
.button{
    border: 2px solid #58B4FB;
            color: #2B75AD;
    background-color: rgba(0,0,0,0);
    font-weight:bold;
    float: right;
}
.button:hover{
            color:white;
            background-color: #58B4FB;
}
</style>