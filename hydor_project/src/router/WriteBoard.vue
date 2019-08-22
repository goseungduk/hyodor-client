<template>
    <div style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);padding: 50px;margin-bottom: 30px;">
       <b-form-input class="mt-2" v-model="title" placeholder="제목을 입력하세요"></b-form-input>
        <b-form-textarea class="mt-2" :value="content" id="textarea"  v-model="content" rows="8" max-rows="8"></b-form-textarea>
        <b-button v-if="tit==''" class="mt-1 button"  @click="submit()">작성하기</b-button>
        <b-button v-else class="mt-1 button"  @click="update()">수정하기</b-button>
    
        <!-- <b-modal id="infomodal" :title="infobox.title" ok-only>{{ infobox.content }}</b-modal> -->
        
    </div>
</template>
<script>
import axios from 'axios';
import mapState from 'vuex';
import * as session from "../utils/loginService.js";
import Constant from '../Constant';
export default {
    props: {
        no: '',
        tit:'',
        con:'',
        con_no:'',
    },
    data: function() {
        return {
            test:'',
            title: '',
            content: '',
            conno:'',
            infobox: {
                title:"",
                content:""
            },
        }
    },
    mounted(){
        if(this.tit!=''&&this.con!=''){
            this.title=this.tit;
            this.content=this.con;
            this.conno=this.con_no;

        }
    },
    methods: {
        update(){
            session.patch(session.apiurl+"board/post/"+this.conno,{title:this.title,content:this.content})
            .then((response)=>{
                history.back();
            })
        },
        submit() {
            session.post(session.apiurl + "board/" + this.no, { title: this.title, content: this.content })
                .then((response) => {
                    this.$router.push(
                        { name: 'free', params: { no:this.no }}
                    )
                })
                .catch((e) => {
                    if (e.response.status == 401) {
                        alert("다시 로그인 해주세요!!");
                        this.items = [];
                        location.href = "/login";
                    } else {
                        // alert("서버오류!");
                    }
                })
        }
    }
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