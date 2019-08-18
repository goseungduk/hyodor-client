<template>
    <div>
        <b-form-input v-model="title" placeholder="제목을 입력하세요"></b-form-input>
        <b-form-textarea id="textarea" v-model="content" placeholder="내용을 입력하세요" rows="3" max-rows="6"></b-form-textarea>
        <b-button variant="outline-primary" @click="submit()">Button</b-button>
    </div>
</template>
<script>
import axios from 'axios';
import mapState from 'vuex';
import * as session from "../utils/loginService.js";
import Constant from '../Constant';
export default {
    props: {
        no: { type: Number }
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
                    this.$store.dispatch(Constant.UPDATE_BOARD, {
                        currentView: "FreeBoard"
                    });
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

</style>