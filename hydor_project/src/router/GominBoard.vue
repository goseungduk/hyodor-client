<template>
<div>
    <div id="example">
        <b-table striped hover 
        :fields="fields" 
        :items="items"
        :per-page="perPage"
        @row-clicked="logging"
        :current-page="currentPage"></b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
        ></b-pagination>
    </div>
</div>
</template>
<script>
import Constant from '../Constant';
import {mapState} from 'vuex';
export default{
    name:'freeboard',
    props:['no'],
    data:function(){
        return {
            perPage: 7,
            currentPage: 1,
            fields:[{
                    key:'id',
                    label:'번호'
                },
                {
                    key:'title',
                    label:'제목',
                    colType: 'a href'
                },
                {
                    key:"writer.nickname",
                    label:'작성자'
                },
                {
                    key:'vote_up',
                    label:'추천'
                }
            ],
            items:this.$store.state.post.posts
        }
    },
    methods:{
        logging(record){
            console.log(record);
        }
    },
    computed:{
        ...mapState(['post']),
        rows() {
            return this.items.length
        }
    },
    mounted:function(){
        console.log(this.no);
        this.$store.dispatch(Constant.FETCH_POSTS,{no:3});
        //일반 정수값을 no에 전달해주면 바로바로 게시글 로드가 되는데
        //props의 no를 가져다 전달해주면 늦음
        //>??
        console.log("mounted");
        
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