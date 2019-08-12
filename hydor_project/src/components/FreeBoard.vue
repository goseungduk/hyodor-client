<template>
<div>
    <div id="example">
    <table id="list" class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>번호</th><th>제목</th><th>추천수</th>
            </tr>
        </thead>
        <tbody id="posts">
            <tr v-for="post in post"
        </tbody>
    </table>
</div>
</div>
</template>
<script>
import Constant from '../Constant';
import {mapState} from 'vuex';
export default{
    name:'freeboard',
    computed:{
        ...mapState(['post'])
    },
    mounted:function(){
        this.$store.dispatch(Constant.FETCH_POSTS,{no:1});
    }
}
</script>
<style scoped>
.addnew{margin:1px auto; max-width:820px; min-width:820px;
padding:14px 0px 0px 0px; text-align:left;}
#example{margin:1px auto; max-width:820px;min-width:820px;
padding:40px;position: absolute; font:13px "verdana";}
#example .long{width:100%;}
#example .short{width:50%;}
#example input,textarea,select{box-sizing:border-box;border:1px solid #BEBEBE;
padding:7px;margin:0px; outline:none;}
#list{width:1000px;font:13px "verdana";}
#list thead tr{color:black; background-color:gray;}
#list th:nth-child(5n+1), #list td:nth-child(5n+1){width:50px;}
/* 글번호 */
#list th:nth-child(5n+2),#list td:nth-child(5n+2){width:300px;}
/* 제목 */
#list th:nth-child(5n+3),#list td:nth-child(5n+3){width:50px;}
/* 추천수 */
#list th:nth-child(5n+4),#list td:nth-child(5n+4){width:60px;}
#list th:nth-child(5n),#list td:nth-child(5n){width:150px;}
#list th{padding:10px 5px 10px 5px;}
#list td,#list th{text-align:center;vertical-align:middle;}
img.thumbnail{width:48px;height:48px;margin-top:auto;
margin-bottom:auto;display:block;cursor:pointer;}
</style>