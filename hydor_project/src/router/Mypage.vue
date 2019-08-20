<template>
    <div>
        <!-- 여기는 width 조절을 잘 맞춰야합니다 -->
        <!--  화이팅 -->
        <h-nav current-page="mypage"></h-nav>
        <b-container class="mt-3">
            <b-row>
                <h2>My Page</h2>
            </b-row>
            <b-row class="mt-3">
                <b-tabs vertical pills>
                    <b-tab title="홈" class="mt-3">
                        <b-container>
                            <b-row class="mt-3">
                                <b-col >
                                   아이디
                                </b-col>
                                <b-col >
                                    {{user_id}}
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col >
                                    닉네임
                                </b-col>
                                <b-col >
                                    {{user_nickname}}
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col >
                                    이메일
                                </b-col>
                                <b-col>
                                    (이메일 return해줘요)
                                </b-col>
                            </b-row>
                            <b-row>
                                
                            </b-row>
                        </b-container>
                    </b-tab>
                    <b-tab title="개인정보 변경">

                    </b-tab>
                    <b-tab title="비밀번호 변경">
                        <b-row  class="mt-3">
                            <b-col  cols="5">
                               현재비밀번호
                            </b-col>
                            <b-col cols="7">
                                <b-form-input v-model="pwnow" placeholder="현재비밀번호를 입력해주세요"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col  cols="5">
                               새 비밀번호
                            </b-col>
                            <b-col cols="7">
                                <b-form-input v-model="pwwill1" placeholder="새 비밀번호를 입력해주세요"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col  cols="6">
                               새 비밀번호 다시입력
                            </b-col>
                            <b-col cols="6">
                                <b-form-input v-model="pwwill2" placeholder="새 비밀번호를 다시 입력해주세요"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-button>비밀번호 변경</b-button>
                        </b-row>
                    </b-tab>
                    <b-tab title="부모님정보 추가 및 변경">

                    </b-tab>
                    <b-tab title="회원탈퇴">
                        <b-row>
                            ※주의※ 회원탈퇴하시면 ip 차단당하시고 다시 가입못합니다.
                        </b-row>
                        <b-row>
                            <b-button @click="signdel()">회원탈퇴</b-button>
                        </b-row>
                    </b-tab>
                </b-tabs>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import * as session from '../utils/loginService';
export default {
    data:function(){
        return {
            user_id:'',
            user_nickname:'',
            pwnow:'',
            pwwill1:'',
            pwwill2:''
        }
    },
    components:{
        'h-nav':NavbarVue
    },
    mounted:function(){
        console.log(session.getRefreshToken());
        if(session.getRefreshToken()==null){
            alert('로그인 해주세요!');
            location.href="/login";
        }else{
            this.user_id=session.getUsername();
            this.user_nickname=session.getNickname();
        }
    },
    methods:{
        signdel(){
            alert('탈퇴될 예정');
        }
    }
}
</script>
<style scoped>

</style>