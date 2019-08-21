<template>
    <div>
        <!-- 여기는 width 조절을 잘 맞춰야합니다 -->
        <!--  화이팅 -->
        <h-nav current-page="mypage"></h-nav>
   <!---     <b-container class="mt-3">
            <b-row>
                <h2 >My Page</h2>
            </b-row>
            <b-row  class="mt-4">
                <b-tabs vertical class="mytabs">
                    <b-tab  title="홈"   >
                        <b-container >
                            <b-row class="mt-3">
                                <b-col  >
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

        </b-container >--->
        <b-container class="mt-4">
          <b-row class="mb-5 ml-1">
                <h2 >My Page</h2>
            </b-row>
        <b-row >
          <b-col md="4">
        <div class="btn-group-vertical" >
          <b-button class="btn" v-for="(tab,index) in tabs" 
                v-bind:class="{active: currentTab===index}" 
                v-on:click="currentTab = index">{{tab}}</b-button>
          </div>
          </b-col>
          <b-col style="background-color:#FCFCFC;">
                <div >
                  <div v-show="currentTab == 0" >
                 
                   <b-row  class="mt-3"  >
                    <b-col  md="2" class="colboard">아이디</b-col>
                    <b-col > {{user_id}} </b-col>
                  </b-row>
                  <b-row class="mt-3"  >
                <b-col md="2" class="colboard"  >닉네임 </b-col>
                    <b-col >{{user_nickname}} </b-col>
                  </b-row>
                   <b-row class="mt-3" >
                   <b-col md="2" class="colboard" > 이메일</b-col>
                  <b-col>(이메일 return해줘요) </b-col>
                  </b-row>
                    </div>
                  <div v-show="currentTab==1">
                    </div>
                  <div v-show="currentTab == 2">
                    <b-row  class="mt-3">
                            <b-col  md="3"  class="colboard" >
                               현재비밀번호
                            </b-col>
                            <b-col cols="7">
                                <b-form-input v-model="pwnow" placeholder="현재비밀번호를 입력해주세요"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col   md="3"  class="colboard" >
                               새 비밀번호
                            </b-col>
                            <b-col cols="7">
                                <b-form-input v-model="pwwill1" placeholder="새 비밀번호를 입력해주세요"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col   md="3"  class="colboard" >
                               새 비밀번호 다시입력
                            </b-col>
                            <b-col cols="7">
                                <b-form-input v-model="pwwill2" placeholder="새 비밀번호를 다시 입력해주세요"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                          </b-col>
                          <b-col>
                            <button class="change mt-2 ml-5">비밀번호 변경</button>
                          </b-col>
                        </b-row>
                        
                  </div>
                  <div v-show="currentTab == 3">
                  </div>
                  <div v-show="currentTab == 4">
                    <b-row>
                      <b-col class="mb-3" style="color:#DA0202; font-size:20px; font-weight:bold;">※주의※</b-col>
                      </b-row> 
                      <b-row>
                       <b-col style=" font-size:15px; font-weight:bold;" >회원탈퇴하시면 ip 차단당하시고 다시 가입못합니다.</b-col>
                       </b-row>
                  
                        <b-row>
                          <b-col></b-col>
                            <b-col><button class="delete" @click="signdel()">회원탈퇴</button></b-col>
                        </b-row>
                  </div>
                  
                </div>
          </b-col>
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
.btn{
  padding:10px 20px 10px 10px;
  background-color:#FCFCFC;
  border: none;
  color: black;
 
}
.btn:hover {
  font-weight:bold;
  color:#2B75AD;
  background-color:#EDF6F7;
  
}
.btn.btn.active.focus,
.btn.btn.active:focus,
.btn.btn.active:hover,
.btn.btn:active.focus,
.btn.btn:active:focus,
.btn.btn:active:hover
.btn.btn.focus,
.btn.btn:focus,
.btn.btn.active,
.btn.btn:active 
{
  font-weight:bold;
  color:#2B75AD;
  background-color:#EDF6F7 ;

}
.change{
  border: 1.4px solid #58B4FB;
  color: #2B75AD;
  background-color: rgba(0,0,0,0);
  font-weight:bold;
  border-radius: 4px;
}
.change:hover{
  color:white;
  background-color: #58B4FB;
}
.colboard{
  font-weight:bold; 
  color:gray; 
 
}
.delete{
  border: 1px solid red;
  color : red;
  background-color: rgba(0,0,0,0);
  float:right;
  border-radius: 4px;
  padding: 3px 5px 3px 5px;
}
.delete:hover{
  background-color: #DA0202;
  border: 1px solid #DA0202;
  color: white;
  
}

</style>