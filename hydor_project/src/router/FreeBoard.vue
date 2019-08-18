<template>
    <div>
        <div class="container">
            <div class="mt-4"></div>
            <article v-for="i in paginatedData" :key="i.id">
                <!-- <a @click="moveToCon(i.id)" href="#"> -->
                <router-link :to="{name:'view',params:{no:no,con_no:i.id}}">
                    <!-- 게시물 각각은 stacked view --> 
                    <!-- 제목 - 내용 - 닉네임 순으로 쌓여진 형태 -->
                    <b-container style="border:1px solid #cecece;">
                        <b-row>
                            <b-col class="ml-md-auto p-2 hov">
                                <h5 style="color:black;">{{i.title}}</h5>
                                <h6 style="color:grey;">{{i.content}}</h6>    
                                <p style="color:black;">{{i.writer.nickname}}</p>   
                            </b-col>
                        </b-row>
                    </b-container>
                </router-link>
                <!-- </a> -->
            </article>
            <div class="mt-3">    
                <b-button class="page" :disabled="pageNum === 0" @click="prevPage">이전</b-button>    
                <span class="pagenum">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
                <b-button class="page" :disabled="pageNum >= pageCount - 1" @click="nextPage">다음</b-button>
                <span class="right-box">
                    <b-button block class="button"  @click="change()">글쓰기</b-button>
                    <!-- <router-link :to="{name:'write',params:{no:this.no}}">글쓰기</router-link> -->
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import Constant from "../Constant";
import axios from "axios";
import mapState from "vuex";
import * as session from "../utils/loginService.js";
export default {
    name: "freeboard",
    props: {
        no: '', // 게시판 번호 받아오는 props
        pageSize: {
            // 한 페이지당 보여줄 게시물 개수
            type: Number,
            required: false,
            default: 5 // 디폴트 값은 5개
        }
    },
    data: function() {
        return {
            items: [], // 게시판 post 모아두는 변수
            pageNum: 0, // 기본 pageNumber
            length: ""
            // 전체 post 개수 , totalcount가 아닌 count 값(현재 삭제되지않고 유지되고 있는 게시물)을 가져옴
        };
    },
    methods: {
        nextPage() {
            // 다음 페이지로 가는 함수
            this.pageNum += 1;
        },
        prevPage() {
            // 이전 페이지로 가는 함수
            this.pageNum -= 1;
        },
        change() {           
            this.$router.push({
                name:'write',params: { no:this.no }
            })
        },
    },
    computed: {
        pageCount() {
            // 게시물 개수는 변화가 있을 때마다 실시간으로 compute 해준다
            let listLeng = this.length;
            let listSize = this.pageSize;
            let page = Math.floor(listLeng / listSize);
            if (listLeng % listSize > 0) page += 1;

            /*
            아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
            이런식으로 if 문 없이 고칠 수도 있다!
            */
            return page;
        },
        paginatedData() {
            // 전체 게시물에서 pageSize 만큼 slicing된 posts
            const start = this.pageNum * this.pageSize,
                end = start + this.pageSize;
            return this.items.slice(start, end);
        },
    },
    mounted: function() { //로딩 표시 띄워줘야함.
        session
            .get(session.apiurl + "board/" + this.no)
            .then(response => {
                this.items = response.data.posts;
                this.length = response.data.count;
            })
            .catch(e => {
                
                alert("서버오류!" + e);
                this.items = [];
            });
        
    },
    watch: {
        // 게시판 번호의 변화에 따라 즉각적으로 게시물 업뎃 하기위한 watch
        no: function() {
            // 게시판이 바뀔때마다 첫페이지로 바꿔주자
            session
                .get(session.apiurl + "board/" + this.no)
                .then(response => {
                    this.items = response.data.posts;
                    this.length = response.data.count;
                    this.pageNum = 0;
                    this.pageSize=5;
                })
                .catch(e => {
                  // console.log(e.response.status); 에러코드
                  if(e.response.status==401){
                    alert("다시 로그인 해주세요!!");
                    this.items = [];
                    location.href="/login";
                  }else{
                    alert("서버오류!");
                  }
                    
                });
        }
    }
};
</script>
<style scoped>
.addnew {
    margin: 1px auto;
    max-width: 820px;
    min-width: 820px;
    padding: 14px 0px 0px 0px;
    text-align: left;
}

#example {
    margin: 1px auto;
    max-width: 820px;
    min-width: 820px;
    padding: 40px;
    position: absolute;
    font: 13px "verdana";
}

#example .long {
    width: 100%;
}

#example .short {
    width: 50%;
}

#example input,
textarea,
select {
    box-sizing: border-box;
    border: 1px solid #bebebe;
    padding: 7px;
    margin: 0px;
    outline: none;
}

#list {
    width: 1000px;
    font: 13px "verdana";
}

#list thead tr {
    color: black;
    background-color: gray;
}

#list th:nth-child(5n + 1),
#list td:nth-child(5n + 1) {
    width: 50px;
}

/* 글번호 */

#list th:nth-child(5n + 2),
#list td:nth-child(5n + 2) {
    width: 300px;
}

/* 제목 */

#list th:nth-child(5n + 3),
#list td:nth-child(5n + 3) {
    width: 50px;
}

/* 추천수 */

#list th:nth-child(5n + 4),
#list td:nth-child(5n + 4) {
    width: 60px;
}

#list th:nth-child(5n),
#list td:nth-child(5n) {
    width: 150px;
}

#list th {
    padding: 10px 5px 10px 5px;
}

#list td,
#list th {
    text-align: center;
    vertical-align: middle;
}

img.thumbnail {
    width: 48px;
    height: 48px;
    margin-top: auto;
    margin-bottom: auto;
    display: block;
    cursor: pointer;
}

.right-box {
    background: white;
    float: right;
}

.container {
    margin: 0 auto;
    width: 820px;
}

.hov:hover {
    background-color: #F4FCFF;
}

.button {
    border: 1px solid #A2D3F9;
    color: #A2D3F9;
    background-color: rgba(0, 0, 0, 0);
}

.button:hover {
    color: white;
    background-color: #A2D3F9;
}

.page {
    text-decoration: none;
    border: 1px solid #3764CC;
    color: #3764CC;
    background-color: rgba(0, 0, 0, 0);
}

.page:hover {
    color: white;
    background-color: #3764CC;
}

.pagenum {
    color: #3764CC;
    font-weight: bold;
}
</style>
