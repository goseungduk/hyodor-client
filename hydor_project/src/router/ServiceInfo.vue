<template>
<div>
    <h-nav current-page="serviceinfo"></h-nav>
    <div>
      <!-- <b-nav> -->
      <b-nav class="menubar_set mt-5" >
        <b-nav-item class="menu_set mb-2">시설</b-nav-item>
        <b-nav-item class="menu_set mb-2">노인지원정책</b-nav-item>
    </b-nav>
        <div class="example">
            지역설정 <b-form-select v-model="selected" class="form-control">
                <option :value="null">시,도</option>
                <option value="6110000">서울특별시</option>
                <option value="인천광역시" disabled>인천광역시 (disabled)</option>
            </b-form-select>&nbsp;
            <b-form-select v-model="sub_selected" class="form-control">
                <option :value="null">군,구</option>
                <option value="3220000">강남구</option>
                <option value="3240000">강동구</option>
                <option value="3080000">강북구</option>
                <option value="3150000">강서구</option>
                <option value="3200000">관악구</option>
                <option value="3040000">광진구</option>
                <option value="3160000">구로구</option>
                <option value="3170000">금천구</option>
                <option value="3100000">노원구</option>
                <option value="3090000">도봉구</option>
                <option value="3050000">동대문구</option>
            </b-form-select>&nbsp;
            <b-button type="submit" variant="primary" @click="a()">확인</b-button>
      </div>
    </div>
    <b-container>
      <!-- <FreeBoard v-bind:no="no"></FreeBoard> -->
      <!-- <component :is="currentView" :no="no" :con_no="con_no"></component> -->
      <router-view></router-view>
    </b-container>
</div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import axios from 'axios';
import x2j from 'xml2js';
import x22j from 'xml-js';
export default {
    components:{
        "h-nav": NavbarVue
    },
    data() {
      return {
        selected: null,
        sub_selected:null,
        gulist:[]
      }
    },
    methods:{
        a(){
            alert();
        }
    },
    mounted:function(){
        var parseString = x2j.parseString;
        axios({method:'GET',
            url:'/api/org/code',
            params:{upOrgCd:6110000,orgClsCd:'BA0303',format:"xml",serviceKey:"EzpVCm+y8ApwlDIaSCc+zV/XiHxgmrx8LE4EHCWpiRIjIkoeFTsarW7ypISPwiMsPGIXWC7FPpy2VdNCCa+UQg=="}
        })
        .then((response)=>{
            var result=x22j.xml2js(response.data,{compact:true,spaces:4});
            // this.gulist=result;
            // console.log(typeof(result));
            // console.log(this.gulist.result.totalCount._text);
            // console.log(this.gulist.elements['0'].elements['3'].elements['0'].text);
            for(var i=1;i<=(Number(result.result.totalCount._text)/10)+1;i++){
                axios({method:'GET',
                        url:'/api/org/code',
                        params:{
                            pageIndex:i,upOrgCd:6110000,orgClsCd:'BA0303',format:"xml",serviceKey:"EzpVCm+y8ApwlDIaSCc+zV/XiHxgmrx8LE4EHCWpiRIjIkoeFTsarW7ypISPwiMsPGIXWC7FPpy2VdNCCa+UQg=="
                        }
                })
                .then((response)=>{
                    var result2=x22j.xml2js(response.data,{compact:true,spaces:4});
                    
                })
            }
            //*********************************************************
            // parseString(response.data,(e,result)=>{
            //     for(var i=1;i<=(result.result.totalCount/10)+1;i++){
            //         axios({method:'GET',
            //         url:'/api/org/code',
            //         params:{
            //             pageIndex:i,upOrgCd:6110000,orgClsCd:'BA0303',format:"xml",serviceKey:"EzpVCm+y8ApwlDIaSCc+zV/XiHxgmrx8LE4EHCWpiRIjIkoeFTsarW7ypISPwiMsPGIXWC7FPpy2VdNCCa+UQg=="
            //         }
            //         })
            //         .then((response)=>{
            //             parseString(response.data,(e,result)=>{
            //                 console.log(result.result);
            //                 console.log(typeof(result.result.orgs['0']['org']))
            //                 this.gulist.push(result.result.orgs['0']['org']);
                            
            //             })
            //         })
            //     }
            //     console.log(this.gulist);
            // });
            // console.log(this.gulist);
        })
        .catch((e)=>{
            console.log("오류");
        })
        
    }
}
</script>
<style scoped>
.header {
  margin-top: 0.1em;
}
.menubar_set{ width: 700px; list-style-type:none; border-bottom:thin solid black; margin: 0 auto;
}
.menu_set{float:left;}  
.menu_set a{display: block; color: navy; text-align:center;
 text-decoration:none;}
.menu_set a:hover{ background-color: #bbdefb; color:navy; font-weight:bold;}
.active{ background-color: #bbdefb; color:navy; font-weight:bold;
padding:4px 8px;
}
.non_active{
  display: block; color: navy; text-align:center;
 text-decoration:none;
}
.form-control{
    width:200px;
}
.example{
    display: table; margin-left: auto; margin-right: auto;
    margin-top:1%;
}
</style>