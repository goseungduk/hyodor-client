<template>
    <div>
        <b-card title="제목" sub-title="닉네임">
            <b-card-text>
                "내용"
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
//state에는 con_no가 있다.
export default {
    props:{
        con_no:Number
    },
    data:function(){
        return {
            items:[] //axios 응답 데이터 다 때려박아!!!
        }
    }

}
</script>
<style scoped>

</style>