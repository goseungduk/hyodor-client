<template>
    <div>
    <div id="example">
        <p>
        <button class="btn btn-primary" @click="login()">
            로그인
        </button>
        </p>
    <!-- Bootstrap css -->
    <table id="list" class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>제목</th><th>작성자</th><th>좋아요</th><th>싫어요</th><th>조회수</th>
            </tr>
        </thead>
        <tbody id="posts">
            <tr v-for="post in boardlist.posts" :key="post.title">
                <td>{{post.title}}</td>
                <td>{{post.writer.nickname}}</td>
                <td>{{post.vote_up}}</td>
                <td>{{post.vote_down}}</td>
                <td>{{post.visited}}</td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
</template>
<script type="text/javascript">
//import axios from 'axios';
import eventBus from '../EventBus.js';
export default{
    name:'boardList', //컴포넌트 이름
    props:['boardlist'],
    // App.vue에서 인자를 이쪽으로 전달해줄것임.
    // methods:{
    //     fetchContacts:function(){
    //         eventBus.$emit("fetchContacts");
    //     }
    // }
    methods:{
        login:function(){
            eventBus.$emit("loginonForm");
        }
    }
}
</script>
<style scoped>
.addnew{margin:10px auto; max-width:820px; min-width:820px;
padding:40px 0px 0px 0px; text-align:left;}
#example{margin:10px auto; max-width:820px;min-width:820px;
padding:0px;position:relative; font:13px "verdana";}
#example .long{width:100%;}
#example .short{width:50%;}
#example input,textarea,select{box-sizing:border-box;border:1px solid #BEBEBE;
padding:7px;margin:0px; outline:none;}
#list{width:800px;font:13px "verdana";}
#list thead tr{color:yellow; background-color:purple;}
#list th:nth-child(5n+1), #list td:nth-child(5n+1){width:200px;}
#list th:nth-child(5n+2),#list td:nth-child(5n+2){width:150px;}
#list th:nth-child(5n+3),#list td:nth-child(5n+3){width:250px;}
#list th:nth-child(5n+4),#list td:nth-child(5n+4){width:60px;}
#list th:nth-child(5n),#list td:nth-child(5n){width:150px;}
#list th{padding:10px 5px 10px 5px;}
#list td,#list th{text-align:center;vertical-align:middle;}
img.thumbnail{width:48px;height:48px;margin-top:auto;
margin-bottom:auto;display:block;cursor:pointer;}
</style>
