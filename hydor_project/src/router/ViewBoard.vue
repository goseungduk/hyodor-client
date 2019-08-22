<template>
    <div class="con mt-2" style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);padding: 20px;margin-bottom: 30px;">
        <div>
            <b-card :title="items.title" style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);padding: 40px;margin-bottom: 40px;">
                <v-wait for="contentloading">
            <template slot="waiting">
              <div class="text-center mt-5">
                <b-spinner variant="dark" label="Spinning"></b-spinner>
              </div>
            </template>
          </v-wait>
          <div v-wait:hidden="'contentloading'">
                <span style="float:right;color:#BF1B0C;">
                   <b-button   @click="goodbad(true)" style="background-color: rgba(0,0,0,0); border:none;">
                        <div class="imgswap" >
                            <div :class="[isUp ? 'is':'is_non']">
                        <img src="../assets/good_non.png" class="mb-2"  width="18px" height="18px" style="margin-right:5px;" >
                        <img src="../assets/good.png" class="mb-2"  width="18px" height="18px" style="margin-right:5px;">
                        </div>
                        </div>
                        </b-button>{{items.vote_up}}
                        <b-button  @click="goodbad(false)" style="background-color: rgba(0,0,0,0); border:none;">
                        <div class="imgswap" >
                        <div :class="[isDown ? 'is':'is_non']">
                    <img class="mb-2"  src="../assets/bad_non.png" width="18px" height="18px" style="margin-right:5px;" >
                    <img class="mb-2"  src="../assets/bad.png" width="18px" height="18px" style="margin-right:5px;">
                    </div>
                     </div>
                        </b-button>
                    {{items.vote_down}}
                </span>
                <b-card-text>
                    <p v-if="items.writer==null" style="font-size:16px">(탈퇴한유저)</p>
                    <p v-else style="font-weight:bold;font-size:16px"><img src ="../assets/profile2.png" style="border-radius:7px;margin-right:10px;" width="25px" height="25px">{{items.writer.nickname}}</p>
                    
                </b-card-text>
                <b-card-text>
                    <p style="font-size:16px">{{items.content}}</p>
                </b-card-text>
                <b-card-text>
                    <b-button class="delete" @click="con_alert()">삭제</b-button>
                    <b-button class="edit" @click="change(items.title,items.content)">수정</b-button> 
                </b-card-text>
                </div>
            </b-card>
            
        </div>
        
        <div>
            <div class="comments" style="display: block;">
                <article v-for="i in items.comments" :key="i.id" v-wait:hidden="'contentloading'" style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);padding: 30px;margin-bottom: 15px;">
                    <div v-if="i.writer==null" class="mb-1" style="font-weight:bold; font-size:15px "><img src ="../assets/profile2.png" style="border-radius:7px" width="25px" height="25px">(탈퇴한유저)</div>
                    <div v-else class="mb-1" style="font-weight:bold; font-size:15px ">
                        <img src ="../assets/profile2.png" style="border-radius:7px;margin-right:10px;" width="25px" height="25px">{{i.writer.nickname}}
                    </div>
                    <p style="font-size:16px;padding:5px;">{{i.content}}</p>
                    
                    <ul class="status commentvotestatus">
                        <li class="vote" style="display: list-item;">
                            <b-button class="delete" size="sm" @click="comment_alert(i.id)">삭제</b-button>
                            <b-button class="edit" size="sm">수정</b-button> 
                        <br></li>
                    </ul>
                </article>
            </div>
        </div>
        <b-form @submit.prevent="commenting()">
        <b-input-group>
          <!-- 텍스트 박스랑 작성 버튼이 한 줄에 들어가게 부탁드립니당 -->
          <b-form-input
            v-model="comment"
            style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);"
            placeholder="댓글을 입력하세요"
            :disabled="$wait.is('commentloading')"
          ></b-form-input>
          <b-input-group-append>
            <b-button class="btn-img" type="submit" :disabled="$wait.is('commentloading')">
              <img class="img" src="../assets/write.png">
              <v-wait for="commentwriteloading">
                <template slot="waiting">
                  <b-spinner variant="dark" label="Spinning" small></b-spinner>
                </template>
               
              </v-wait>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form> 
        <loading v-wait:visible="'withdrawloading'"></loading>
        <b-modal id="con_modal" :title="infobox.title" @ok="con_del()">{{ infobox.content }}</b-modal>
        <b-modal id="comment_modal" :title="infobox.title" @ok="comment_del()">{{ infobox.content }}</b-modal>
        <b-modal id="back_modal" :title="infobox.title">{{ infobox.content }}</b-modal>

    </div>
</template>

<script>
//state에는 con_no가 있다.
import * as session from "../utils/loginService";
import Loading from '../components/Loading.vue';
export default {
    components: {
        loading: Loading
    },
    props: {
        con_no:'',
        no:'',
        
    },
    data: function() {
        return {
            commnet_num:'',
            items: {
                writer:{
                    'nickname':''
                }
            }, //axios 응답 데이터 다 때려박아!!!
            comment:'',
            isUp:'',
            isDown:'',
            infobox: {
                title:"",
                content:""
            },
        }
    },
    mounted: function() {
        this.updatePostView();
    },
    methods:{
        updatePostView() {
      this.$wait.start("contentloading");
      session
        .get(session.apiurl + "board/post/" + this.con_no)
        .then(response => {
          this.items = response.data;
          session
            .get(session.apiurl + "board/vote/" + this.con_no)
            .then(response => {
              if (response.data.up == true) {
                this.isUp = response.data.up;
              }
              if (response.data.down == true) {
                this.isDown = response.data.down;
              }
              this.$wait.end("contentloading");
            });
        })
        .catch(e => {
          if (e.response.status == 401) {
            alert("다시 로그인 해주세요!!");
            this.items = [];
            location.href = "/login";
          } else if (e.response.status == 404) {
            alert("존재하지않는 글입니다");
            history.back();
          } else {
            alert("서버오류!");
            history.back();
          }
          this.$wait.end("contentloading");
        });
    },
        a(){
            alert('추천완료');
        },
        goodbad(what){
            if(what==true){
                session.post(session.apiurl+"board/vote/"+this.con_no,{isup:true})
                .then((response)=>{
                    alert("추천완료");
                    location.reload();
                })
            }
            else if(what==false){
                session.post(session.apiurl+"board/vote/"+this.con_no,{isup:false})
                .then((response)=>{
                    alert("추천완료");
                    location.reload();
                })
            }
            console.log(what);
        },
        comment_alert(id){
            this.comment_num=id;
            this.infobox.title="알림";
            this.infobox.content="댓글을 삭제하시겠습니까?";
            this.$bvModal.show('comment_modal');
        },
        con_alert(){
            this.infobox.title="알림";
            this.infobox.content="게시글을 삭제하시겠습니까?";
            this.$bvModal.show('con_modal');
        },
        comment_del(){
            session.del(session.apiurl+"board/comment/"+this.comment_num)
            .then((response)=>{
                // alert("삭제되었습니다!!");
                location.href="/boardlist/viewboard/"+this.no+"/"+this.con_no;
            })
            .catch((e)=>{
                if(e.response.status==403){
                    alert('권한이 없습니다');
                }else {
                    alert("탈퇴한 회원이거나 연결이 원활하지 않습니다.");
                }
            })
        },
        con_del(){
            this.$wait.start("withdrawloading");
            session.del(session.apiurl+"board/post/"+this.con_no)
            .then((response)=>{
                // location.href="/boardlist/freeboard/"+this.no;
                this.$wait.end("withdrawloading");
                this.$router.push({name:'free',params:{no:this.no},query:{p:'1'}});
            })
            .catch((e)=>{
                this.$wait.end("withdrawloading");
                if(e.response.status==403){
                    alert('권한이 없습니다');
                }
                else {
                    alert("탈퇴한 회원이거나 연결이 원활하지 않습니다.");
                }
            })
        },
        change(tit,con) {
            if(localhost.username!=this.items.writer.username){
                this.infobox.title="알림";
                this.infobox.content="권한이 없습니다";
                this.$bvModal.show('back_modal');
            }           
            this.$router.push({
                name:'write',params: { no:this.no, tit:tit ,con:con, con_no:this.con_no }
            })

        },
        commenting(){
            if(this.comment==''){
                
            }
            else{
                this.$wait.start("commentwriteloading");
        session
          .post(session.apiurl + "board/comment", {
            post_id: this.con_no,
            content: this.comment
          })
          .then(response => {
            // console.log(this.comment);
            this.$wait.end("commentwriteloading");
            this.comment = "";
            this.updatePostView();
          })
          .catch(e => {
            this.$wait.end("commentwriteloading");
            if (e.response.status == 401) {
              alert("다시 로그인 해주세요!!");
              this.items = [];
              location.href = "/login";
            } else if (e.response.status == 404) {
              alert("존재하지않는 글입니다.");
              history.back();
            } else {
              alert("서버오류!");
            }
          });
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
    background-color: #5f90df;
}
.delete{
  border: 1px solid red;
  color : red;
  background-color: rgba(0,0,0,0);
  float:right;
}
.delete:hover{
  background-color: #DA0202;
  border: 1px solid #DA0202;
  color: white;
}
.edit{
  border: 1px solid #017F0C;
  color : #017F0C ;
  background-color: rgba(0,0,0,0);
  float:right;
}
.edit:hover{
    background-color: #00970D ;
  border: 1px solid #00970D;
  color: white;

}
h4{
    color: rgb(71, 70, 70);
    font-weight: bold;
    font-size: 30px;
}
.imgswap img:last-child{display:none} 
.imgswap:hover img:first-child{display:none} 
.imgswap:hover img:last-child{display:inline-block}
.is img:last-child {
    display:inline-block
}
.is img:first-child{
    display:none
}
.is_non img:last-child{
    display:none
}
.is_non img:first-child{
    display:inline-block
}

</style>
