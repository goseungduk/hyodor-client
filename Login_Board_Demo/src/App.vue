  <template>
    <div>
      <div class="page-header addnew">
        <h1 class="text-center"> 자유 게시판 </h1>
      </div>
      <component :is="currentView" :boardlist="boardlist"></component>
      <!-- <boardList :boardlist="boardlist"></boardList> -->
      <!-- components에 등록해둔 BoardList 컴포넌트 -->
      <!-- v-bind:boardlist props에 boardlist 배열을 전달한다 -->
      <!--<loginForm mode="add"></loginForm>-->
    </div>
  </template>
  <script>
  //import axios from 'axios';
  import BoardList from './components/BoardList';
  import AddLogin from './components/AddLogin';
  import Constant from './Constant';
  import {mapState} from 'vuex';
  //import LoginForm from './components/LoginForm';
  // import eventBus from './EventBus.js'; //이벤트버스
  export default{
    name:'app',
    components:{
        BoardList,
        AddLogin
    },
    data : function(){
      return {
        //currentView:null,
        post://contactsapp에서의 App.vue.contact와 같다
        {
          title:'', //제목
          vote_up:0, //좋아요
          vote_down:0, //싫어요
          visited:0 //조회수
        },
        boardlist:{
          posts:[] //포스트들을 모아둘 배열
        }
      }
    },
    // mounted:function(){
    //   this.fetchContacts();
    //   eventBus.$on("loginonForm",()=>{
    //     this.currentView='addLogin';
    //   });
    //   eventBus.$on("cancel",()=>{
    //             this.currentView=null;
    //         });
    //   eventBus.$on("goLogin",(acc)=>{
    //     this.currentView=null;
    //     this.goLoginn(acc);
    //   })
    //   //처음 게시판시작 시에 게시글들을 json으로 받아옴.
    // },
    // methods:{
    //   fetchContacts:function()
    //   {
    //     axios.get('http://203.229.206.16:12345/api/v1/board/1',{
    //     })
    //     .then((response)=>{
    //       this.boardlist=response.data;
    //     })
    //     .catch((e)=>{
    //       console.log('fetch error!',e);
    //       this.boardlist.posts=[];
    //     })
    //   },
    //   goLoginn:function(acc){
    //     axios.post('http://203.229.206.16:12345/api/v1/login',
    //       {
    //         username:acc.id,
    //         password:acc.pw
    //       }
    //     )
    //     .then((response)=>{
    //         console.log("로그인성공!");
    //         alert(response.data.access_token);
    //     })
    //     .catch((e)=>{
    //       alert('로그인 실패!');
    //       console.log("로그인 실패!",e);
    //     })
    //   }
    // }
      computed:mapState(['currentView']),
      beforeCreate:function(){
        this.$store.dispatch(Constant.CHECK_TOKEN);
        //console.log(localStorage.refresh_token);
      }
    }
</script>
<style scoped>
    #container {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    
</style>
