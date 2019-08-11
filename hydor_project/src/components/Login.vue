<template>
<div id="container">
    <div id="example">
        <img src="../assets/logo.png" width="100" height="100">
        지금 효도르를 시작해보세요!
    </div>
    <div>
        <table align="center" width="300">
        <tr height="50">
        <b-form-input  name="id" placeholder="아이디" v-model="acc.id"></b-form-input>
        </tr>
        <tr height="50">
        <b-form-input name="pw" placeholder="비밀번호" v-model="acc.pw"></b-form-input>
        </tr>        
        <!-- <router-link to="/home" class="btn btn-info menu">로그인하기</router-link> -->
        <b-button block variant="outline-primary" @click="inLogin()"> 로그인</b-button>
        </table>
        <br>
        <span class="size">효도르에 처음이신가요? </span><span class="color">회원가입 하기</span>
    </div>
</div>
</template>
<script>
import Constant from '../Constant';
//import {mapActions} from 'vuex';
import {mapState} from 'vuex';
//import axios from 'axios';
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
                //dispatch의 then구문을 이어받음.s
                this.$router.push({name:'home'})
                alert('로그인 성공');
                //alert('d');
            })
            .catch((e)=>alert('로그인 실패'))
    
        }
    }
}
</script>
<style scoped>
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
.size{
    font-size: 10pt;
}
.color{
     font-size: 10pt;
    color: #009ACD;
    font-weight: bold;
}
</style>