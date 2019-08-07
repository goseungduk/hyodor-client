<template>
 <div>
        <div class="form">
            <h3 class="heading" @keyup.esc="cancelEvent()"> :: 로그인 ::</h3>
            <!-- <div v-if="mode=='update'" class="form-group">
                <label>일련번호</label>
                <input type="text" name="name" class="long" disabled v-model="contact.no" />
            </div> -->
            <div class="form-group">
                <label>아이디</label>
                <input type="text" name="id" class="long" v-model="acc.id"
                    ref="name" placeholder="아이디를 입력하세요" />
            </div>
            <div class="form-group">
                <label>비밀번호</label>
                <input type="password" name="pw" class="long" v-model="acc.pw" placeholder="비밀번호를 입력하세요" />
            </div>
            <!-- <div class="form-group">
                <label>주소</label>
                <input type="text" name="address" class="long" v-model="contact.address" placeholder="주소를 입력하세요" />
            </div> -->
            <div class="form-group">
                <div>&nbsp;</div>
                <input type="button" class="btn btn-primary"
                value="로그인" @click="submitEvent()" />
                <!-- <input type="button" class="btn btn-primary"
                value="취소" @click="cancelEvent()"/> -->
            </div>
        </div>
    </div>
</template>
<script>
//import axios from 'axios';
//import eventBus from '../EventBus.js';
import Constant from '../Constant';
export default{
    name:'loginForm',
    data:function(){
        // mode: //무슨 모드로 띄우는지
        // {
        //     type:String,
        //     default:'add'
        // },
        return {
            acc:{
                //빈 객체를 만들어주자.
                // type:Object,
                // default:function(){
                // return {
                    
                    // }
            }
        }
    },
    created:function(){
        this.acc={...this.account};
    },
    mounted:function(){
        this.$refs.name.focus()
    },
    computed: {
            btnText: function() {
                if (this.mode != 'update') return '로그인';
                else return '수정';
            } // 모드가 update가 아니면 로그인 모드
            // headingText:function(){
            //     if(this.mode !='update')return '새 연락처 추가';
            //     else return '연락처 변경';
            // }
    },
    methods:{
        submitEvent:function(){
                // if(this.mode=="update"){
                //     eventBus.$emit("updateSubmit",this.contact)
                // }else{
                    //eventBus.$emit("goLogin",this.acc);
            this.$store.dispatch(Constant.LOGIN_GO,{account:this.acc});
                // store/actions.js/LOGIN_GO로 가즈아
        },
        cancelEvent:function(){
                    // eventBus.$emit("cancel");
            this.$store.dispatch(Constant.CANCEL_FORM);
        }
    }
}
</script>
<style scoped>
.modal{display:block;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;
overflow:auto;background-color:rgb(0,0,0);
background-color:rgba(0,0,0,0.4);}
.form {background-color:white;margin:100px auto;max-width:400px;min-width:200px;font:13px "verdana";padding:10px 10px 10px 10px;}
.form div {padding:0; display:block;margin: 10px 0 0 0;}
.form label{text-align:left;margin:0 0 3px 0; padding:0px; display:block; font-weight:bold;}
.form input, textarea,select { box-sizing: border-box;border:1px solid #BEBEBE; padding:7px; margin:0px; outline:none;}
.form .long {width:100%;}
.form .button{background:#2b798d; padding:8px 15px 8px 15px; border:none; color:#fff;}
.form .button:hover{background:#4691a4;}
.form .heading{background:#33a17f; font-weight:300; text-align:left; padding:20px; color:#fff;
margin:5px 0 30px 0; padding:10px; min-width:200px; max-width:400px;}
</style>