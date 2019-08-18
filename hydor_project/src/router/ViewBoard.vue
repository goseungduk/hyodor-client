<template>
    <div>
        <b-card :title="items.title" :sub-title="items.writer.nickname">
            <b-card-text>
                {{items.content}}
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
//state에는 con_no가 있다.
import * as session from "../utils/loginService";
export default {
    props:{
        con_no:Number
    },
    data:function(){
        return {
            items:[] //axios 응답 데이터 다 때려박아!!!
        }
    },
    mounted:function(){
        session.get(session.apiurl+"board/post/"+this.con_no)
        .then((response)=>{
            this.items=response.data;
        })
    }

}
</script>
<style scoped>

</style>