<template>
    <div class="con mt-2">
        <div>
            <b-card :title="items.title" :sub-title="items.writer.nickname">
                <b-card-text>
                    <p style="font-size:16px">{{items.content}}</p>
                </b-card-text>
            </b-card>
        </div>
        
        <div class="mother mt-1">
            <div class="comments" style="display: block;">
                <!-- 게시물 이나 댓글창에서 에브리타임 사람 아이콘 처럼 사진 비춰주는거 고려해봐도 괜찮을 것 같습니다 -->
                <article v-for="i in items.comments" :key="i.id" class="parent">
                    <div class="mb-1" style="font-weight:bold; font-size:13px "><img src ="../assets/profile2.png" style="border-radius:7px" width="25px" height="25px">{{i.writer.nickname}}</div>
                    <p>{{i.content}}</p>
                    <ul class="status commentvotestatus">
                        <li class="vote" style="display: list-item;"><img class="mb-2" src="../assets/good.png" width="16px" height="16px"> : {{i.vote_up}}</li>
                    </ul>
                </article>
            </div>
        </div>
        <b-input-group> 
 
            <!-- 텍스트 박스랑 작성 버튼이 한 줄에 들어가게 부탁드립니당 -->
            <b-form-input v-model="comment" placeholder="댓글을 입력하세요"></b-form-input>
           <b-input-group-append>
           <b-button @click="commenting()" class="btn-img" type="submit"><img class="img" src="../assets/write.png"></b-button>
           </b-input-group-append>
            </b-input-group>     
       
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
                    alert("작성되었습니다!");
                    session.get(session.apiurl + "board/post/" + this.con_no)
                    .then((response) => {
                        history.go();
                    })
                    .catch((e) => {
                        if (e.response.status == 401) {
                            alert("다시 로그인 해주세요!!");
                            this.items = [];
                            location.href = "/login";
                        }
                        else {
                            alert("서버오류!");
                        }
                    })
                })
                .catch((e)=>{
                    if(e.response.status==401){
                        alert("다시 로그인 해주세요!!");
                        this.items=[];
                        location.href="/login";
                    }else if(e.response.status==404){
                        alert("존재하지않는 글입니다.");
                        history.back();
                    }
                    else{
                        alert("서버오류!");
                    }
                })
            }
        }
    }

}
</script>
<style scoped>

#container > div.articles > article > div.comments article ul.commentvotestatus {
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
.vote {
    padding-left: 1px;
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
.con {
    color: #666;
    font-family: "맑은 고딕",  tahoma;
    font-size: 12px;
    letter-spacing: -1px;
}
.img{
    
    border: none;
    width: 33px;
    height: 25px;
    cursor: pointer;
}
.btn-img{
    border: none;
    background-color: #58b4fb;
}
</style>