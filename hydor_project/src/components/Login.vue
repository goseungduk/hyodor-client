<template>
<div id="container">
    <div id="example">
        <img src="../assets/logo.png" width="100" height="100">
        지금 효도르를 시작해보세요!
    </div>
    <div>
        <p><input type="text" name="id" placeholder="아이디" v-model="acc.id"></p>
        <p><input type="text" name="pw" placeholder="비밀번호" v-model="acc.pw"></p>
        <!-- <router-link to="/home" class="btn btn-info menu">로그인하기</router-link> -->
        <button class="btn btn-info menu" @click="inLogin()"> 로그인 하기</button>
    </div>
</div>
</template>
<script>
import Constant from '../Constant';
//import {mapActions} from 'vuex';
import {mapState} from 'vuex';
import axios from 'axios';
export default{
    name:'login',
    data:function(){
        return {
            acc:{} // 비어있는 객체
        }
    },
    created:function(){
        this.acc={...this.account};
        // 양방향 데이터 바인딩을 방지하는 구문
        // reference : https://github.com/stepanowon/vuejs_book_2nd
        // contactsapp_strict of chap.11
    },
    computed:{
        ...mapState['account']
    },
    methods:{
        inLogin(){
            if(this.acc.id==null||this.acc.pw==null){
                alert('모두 입력해주세요!');
                return 0;
            }else if(this.acc.id==""||this.acc.pw==""){
                alert('모두 입력해주세요!');
                return 0;
            }
            this.$store.dispatch(Constant.LOGIN_GO,{account:this.acc})
            .then(()=>{ 
                //dispatch의 then구문을 이어받음.
                this.$router.push({name:'home'})
                alert('로그인 성공');
            })
            .catch((e)=>alert('로그인 실패'))
    
        }
    }
}
</script>
<style>
#example{margin:10px auto; max-width:820px; min-width:820px;
padding:0px; position:relative; font:13px "verdana";}
#container {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>