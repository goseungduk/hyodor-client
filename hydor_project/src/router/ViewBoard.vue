<template>
    <div>
        <div>
        
            <b-card :title="items.title" :sub-title="items.writer.nickname">
        
                <b-card-text>
        
                    {{items.content}}
        
                </b-card-text>
        
            </b-card>
        
        </div>
        <span> 
            <!-- 텍스트 박스랑 작성 버튼이 한 줄에 들어가게 부탁드립니당 -->
            <b-form-input v-model="comment" placeholder="댓글을 입력하세요"></b-form-input>
            <b-button variant="outline-primary" @click="commenting()">작성</b-button>
        </span>
        <div>
            <article v-for="i in items.comments" :key="i.id">
                <h5>{{i.writer.nickname}}</h5>
                <p>{{i.content}}</p>
                <ul>
                    <li>추천수 : {{i.vote_up}}</li>
                </ul>
            </article>
        </div>
    </div>
</template>

<script>
//state에는 con_no가 있다.
import * as session from "../utils/loginService";
export default {
    props: {
        con_no: Number
    },
    data: function() {
        return {
            items: [], //axios 응답 데이터 다 때려박아!!!
            comment:''
        }
    },
    mounted: function() {
        session.get(session.apiurl + "board/post/" + this.con_no)
            .then((response) => {
                this.items = response.data;
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
    },
    methods:{
        commenting(){
            session.post(session.apiurl+"board/comment",{post_id:this.con_no,content:this.comment})
            .then((response)=>{
                // console.log(this.comment);
                console.log(response);
                alert("작성되었습니다!");
                session.get(session.apiurl + "board/post/" + this.con_no)
                .then((response) => {
                    this.items = response.data;
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
            .catch((e) => {
                if (e.response.status == 401) {
                    alert("다시 로그인 해주세요!!");
                    this.items = [];
                    location.href = "/login";
                } else {
                    alert("서버오류!");
                }
            })
            })
            .catch((e)=>{
                if(e.response.status==401){
                    alert("다시 로그인 해주세요!!");
                    this.items=[];
                    location.href="/login";
                }else{
                    alert("서버오류!");
                }
            })
        }
    }

}
</script>
<style scoped>

</style>