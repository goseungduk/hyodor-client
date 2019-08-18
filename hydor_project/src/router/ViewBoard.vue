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
        <div class="mother">
            <div class="comments" style="display: block;">
                <!-- 게시물 이나 댓글창에서 에브리타임 사람 아이콘 처럼 사진 비춰주는거 고려해봐도 괜찮을 것 같습니다 -->
                <article v-for="i in items.comments" :key="i.id" class="parent">
                    <h5>{{i.writer.nickname}}</h5>
                    <p>{{i.content}}</p>
                    <ul class="status commentvotestatus">
                        <li class="vote commentvote" style="display: list-item;">추천수 : {{i.vote_up}}</li>
                    </ul>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
//state에는 con_no가 있다.
import * as session from "../utils/loginService";
export default {
    props: {
        con_no:'',
        no:''
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
                }else if(e.response.status==404){
                    alert("존재하지않는 글입니다");
                    history.back();
                } 
                else {
                    alert("서버오류!");
                    history.back();
                }
            })
    },
    methods:{
        commenting(){
            console.log(this.comment);
            if(this.comment==''){
                alert('1자 이상 입력하세요!');
                location.href="/boardlist/viewboard/"+this.no+"/"+this.con_no;
            }
            else{
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

}
</script>
<style scoped>
#container > div.articles > article ul.status li {
    float: left;
    margin-left: 8px;
    padding: 0 2px;
    height: 20px;
    line-height: 20px;
    color: #a6a6a6;
    font-size: 12px;
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 12px 12px;
    cursor: pointer;
}
#container > div.articles > article > div.comments article ul.commentvotestatus {
    float: left;
}
#container > div.articles > article ul.status li.vote {
    padding-left: 15px;
    color: #c62917;
}
dl, ul, ol, menu, li {
    list-style: none;
}
element.style {
    display: list-item;
}
div.mother{
    border:1px solid gray;
}
article.parent {
    padding: 15px 15px 0 15px;
    border-top: 1px solid black;
}
#container > div.articles > article > div.comments {
    display: none;
}
element.style {
    display: block;
}
body, div, nav, aside, article, h1, h2, h3, h4, ol, ul, li, dl, dt, dd, p, span, form, th, td, input, textarea, select, pre, address {
    color: #666;
    font-family: "맑은 고딕",  tahoma;
    _font-family: 돋움, tahoma;
    font-size: 12px;
    letter-spacing: -1px;
}
</style>