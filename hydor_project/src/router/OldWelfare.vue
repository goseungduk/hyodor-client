<template>
    <div>
        <div class="example text-center mt-1" style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);padding: 10px;margin-bottom: 30px;">
            지역설정
            <b-form-select v-model="selected" :options="main_options" class="form-control mt-2 mb-2">
            </b-form-select>&nbsp;
            <b-form-select v-model="sub_selected" :options="sub_options3" class="form-control mt-2 mb-2">
            </b-form-select>&nbsp;
            <b-button squared type="submit" class="btn mt-2 mb-2" @click="k2()">확인</b-button>
            <div class="d-flex justify-content-center">
            <input type="text" v-model="search" placeholder="찾고싶은 복지서비스를 검색하세요!" style="width:50%;" class="form-control mt-2 mb-2"/>
            </div>
        </div>
        <br />
        <!-- <vue-fuse :keys="['svcPpo']" :list="list" :defaultAll="false"></vue-fuse> -->
        <div v-for="(i, $index) in filteredList" :key="$index">
            <b-card :title="i.svcNm['_text'].replace(/<!HS>|<!HE>/g,'')" :sub-title="i.svcPpo['_text'].replace(/<!HS>|<!HE>/g,'')" style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);padding: 10px;margin-bottom: 30px;">
                <b-text>
                    <b-button id="show-btn" @click="showModal(i.svcId['_text'])">상세정보</b-button>
                </b-text>
            </b-card>
        </div>
        <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler"></infinite-loading>
        <div>
            <b-modal ref="my-modal" id="bv-modal-example" hide-footer>
                <template slot="modal-title">
                <span style="font-size:30px;font-weight:bold;">{{svcInfo.svcNm}}</span>
                </template>
                <div class="d-block text-left">
                <h5 style="font-weight:bold">대상</h5>
                <h6>{{svcInfo.slctnStdr}}</h6>
                <h5 style="font-weight:bold">제출서류</h5>
                <h6>{{svcInfo.posesPapers}}</h6>
                <h5 style="font-weight:bold">신청방법</h5>
                <h6>{{svcInfo.reqstProcss}}</h6>
                <h5 style="font-weight:bold">목적</h5>
                <h6>{{svcInfo.svcPpo}}</h6>
                <h5 style="font-weight:bold">상세설명</h5>
                <h6>{{svcInfo.svcCts}}</h6>
                <h5 style="font-weight:bold">사이트</h5>
                <a :href="svcInfo.refrncSiteUrl">{{svcInfo.refrncSiteUrl}}</a>
                <h5 style="font-weight:bold">전화번호</h5>
                <h6>{{svcInfo.refrncTelNo}}</h6>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
            </b-modal>
        </div>
    </div>
</template>
<script>
import x2j from "xml-js";
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';
export default {
    components:{
        InfiniteLoading
    },
    computed: {
        filteredList() {
            return this.list.filter(item => {
                var temp={};
                return item.svcNm['_text'].includes(this.search) || item.svcPpo['_text'].includes(this.search);
            })
        }
    },
    data:function(){
        return {
            state:null,
            total:'',
            svcInfo:{
                posesPapers:'',
                rcvOrgNm:'',
                refrncSiteUrl:'',
                refrncTelNo:'',
                reqstProcss:'',
                slctnStdr:'',
                svcCts:'',
                svcPpo:'',
                svcNm:''
            },
            search:'',
            pageNo:1,
            lists:[],
            list:[],
            selected: null,
            main_options: [
                { value: null, text: '서울특별시' },
                // { value: { cd: 6110000, name: '서울특별시' }, text: '서울특별시' },
                // { value: "인천광역시", text: '인천광역시(disabled)', disabled: true }
            ],
            sub_selected:  { cd: 3000000, name: '종로구' },
            sub_options: [
                { value: null, text: '시,군,구' },
                { value: { cd: 3220000, name: '강남구' }, text: '강남구' },
                { value: { cd: 3240000, name: '강동구' }, text: '강동구' },
                { value: { cd: 3080000, name: '강북구' }, text: '강북구' },
                { value: { cd: 3150000, name: '강서구' }, text: '강서구' },
                { value: { cd: 3200000, name: '관악구' }, text: '관악구' },
                { value: { cd: 3040000, name: '광진구' }, text: '광진구' },
                { value: { cd: 3160000, name: '구로구' }, text: '구로구' },
                { value: { cd: 3170000, name: '금천구' }, text: '금천구' },
                { value: { cd: 3100000, name: '노원구' }, text: '노원구' },
                { value: { cd: 3090000, name: '도봉구' }, text: '도봉구' },
                { value: { cd: 3050000, name: '동대문구' }, text: '동대문구' },
                // {value:{cd:,name:''},text:''},
            ],
            sub_options2:[],
            sub_options3:[]
        }
    },
    mounted(){
            axios({
                method:'GET',
                url:'https://hyodor.azurewebsites.net/apicache/org/code',
                params:{
                    serviceKey:"m1rkdVnBIV0wQnxptLQOUDW8W32Bc9Sp9uLMd8fKQDpLSjxrXgGt00KgJRcH4QvJvPNzemSuIYHcILyGdIDFVw==",
                    upOrgCd:6110000,
                    orgClsCd:'BA0303',
                    pageIndex:1,
                    pageSize:25
                }
            })
            .then((response)=>{
                var li=[];
                var result=x2j.xml2js(response.data,{compact:true});
                var res=result.result;
                // console.log(res.orgs.org);
                li=res.orgs.org;
                // console.log(li);
                // console.log(li[1]);
                for(var i=0;i<25;i++){
                    this.sub_options2[i]=li[i];
                }
                console.log(this.sub_options2)
                for(var i=0;i<25;i++){
                    // this.sub_options3[i].value.cd=this.sub_options2[i].orgCode['_text'];
                    // this.sub_options3[i].value.name=this.sub_options2[i].orgName['_text'];
                    // this.sub_options3[i].text=this.sub_options2[i].orgName['_text'];
                    this.sub_options3.push({value:{cd:this.sub_options2[i].orgCode['_text'],name:this.sub_options2[i].orgName['_text']},text:this.sub_options2[i].orgName['_text']});
                }
                console.log(this.sub_options3);
            })
            
        },
    methods:{
        
        showModal(str){
            this.svcInfo=[];
            
            axios({
                method:'GET',
                url:'https://hyodor.azurewebsites.net/apicache/svc',
                params:{
                    serviceKey:"m1rkdVnBIV0wQnxptLQOUDW8W32Bc9Sp9uLMd8fKQDpLSjxrXgGt00KgJRcH4QvJvPNzemSuIYHcILyGdIDFVw==",
                    format:"xml",
                    svcId:str
                }
            })
            .then((response)=>{
                
                var result=x2j.xml2js(response.data,{compact:true});
                var res=result.result;
                this.svcInfo={posesPapers:res.svc.posesPapers['_text'],
                            rcvOrgNm:res.svc.rcvOrgNm['_text'],
                            refrncSiteUrl:res.svc.refrncSiteUrl['_text'],
                            refrncTelNo:res.svc.refrncTelNo['_text'],
                            reqstProcss:res.svc.reqstProcss['_text'],
                            slctnStdr:res.svc.slctnStdr['_text'],
                            svcCts:res.svc.svcCts['_text'],
                            svcPpo:res.svc.svcPpo['_text'],
                            svcNm:res.svc.svcNm['_text']
                };
                this.$refs['my-modal'].show();
                console.log(this.svcInfo);
                // console.log(result.result);
                // console.log(result.result.posesPapers['_text']); //준비물
                // console.log(result.result.rcvOrgNm['_text']); // 제출 장소 , 신청장소
                // console.log(result.result.refrncSiteUrl['_text']); // 사이트 url
                // console.log(result.result.refrncTelNo['_text']); // 전화번호
                // console.log(result.result.reqstProcss['_text']); // 신청방법
                // console.log(result.result.slctnStdr['_text']); //대상
                // console.log(result.result.svcCts['_text']); //서비스 상세내용
                // console.log(result.result.svcPpo['_text']); // 서비스 목적
                // console.log(result.result.svcNm['_text']); // 서비스 이름
            })
        },
        infiniteHandler($state) {
            this.state=$state;
            console.log(this.sub_selected.cd);
            axios({
                method:"GET",
                url:"https://hyodor.azurewebsites.net/apicache/svc/list",
                // url:'api/svc/list',
                params:{
                    // serviceKey:"b/kLuFCQo3nDRkavEnQWNrh1uv7hZiZmgfbPPPyOok/D1ltGhcQl3wI0/0Tr4M8glqdIK/rWDYHvgHZMFLUOsQ==",
                    serviceKey:"m1rkdVnBIV0wQnxptLQOUDW8W32Bc9Sp9uLMd8fKQDpLSjxrXgGt00KgJRcH4QvJvPNzemSuIYHcILyGdIDFVw==",
                    format:"xml",
                    srhQuery:"노인",
                    jrsdOrgCd:this.sub_selected.cd,//각 구의 지역코드,
                    pageIndex:this.pageNo,
                    pageSize:10
                }
            })
            .then((response)=>{
                var result=x2j.xml2js(response.data,{compact:true});
                // console.log(result.result.svcList.svc['0']);
                // console.log(result.result);
                console.log(Number(result.result.pageSize['_text']));
                if(result.result.svcList.svc.length){
                    this.pageNo+=1;
                    this.list=this.list.concat(result.result.svcList.svc);
                    $state.loaded();
                    if(result.result.svcList.svc.length<10){
                        $state.complete();
                    }
                }else{
                    $state.complete();
                }
            })
        },
        k2(){
            this.pageNo=1;
            this.list=[];
            this.state.reset();
            // this.infiniteHandler(this.state);
            // this.$refs.InfiniteLoading.stateChanger.reset(); 
            axios({
                method:"GET",
                url:"https://hyodor.azurewebsites.net/apicache/svc/list",
                // url:'/api/svc/list',
                params:{
                    // serviceKey:"b/kLuFCQo3nDRkavEnQWNrh1uv7hZiZmgfbPPPyOok/D1ltGhcQl3wI0/0Tr4M8glqdIK/rWDYHvgHZMFLUOsQ==",
                    serviceKey:"m1rkdVnBIV0wQnxptLQOUDW8W32Bc9Sp9uLMd8fKQDpLSjxrXgGt00KgJRcH4QvJvPNzemSuIYHcILyGdIDFVw==",
                    format:"xml",
                    srhQuery:"노인",
                    jrsdOrgCd:this.sub_selected.cd,//각 구의 지역코드,
                    pageIndex:1,
                    pageSize:10
                }
            })
            .then((response)=>{
                var result=x2j.xml2js(response.data,{compact:true});
                // console.log(result.result.svcList.svc['0']);
                // console.log(result.result);
                console.log(result.result.svcList.svc);
                console.log("길이 "+result.result.svcList.svc.length);
                this.list=this.list.concat(result.result.svcList.svc);
                /*
                (2) [{…}, {…}, __ob__: Observer]
                    0: {__ob__: Observer} => svc가 있음
                    1: {__ob__: Observer}
                    this.lists.length 로 길이 파악가능
                */
                // for(var key in this.lists){
                //     console.log("key: "+key+"/ value: "+this.lists[key]);
                // }
            })
        },
    }
}
</script>
<style scoped>
.header {
    margin-top: 0.1em;
}

.menubar_set {
    width: 700px;
    list-style-type: none;
    border-bottom: thin solid black;
    margin: 0 auto;
}

.menu_set {
    float: left;
}

.menu_set a {
    display: block;
    color: navy;
    text-align: center;
    text-decoration: none;
}

.menu_set a:hover {
    background-color: #bbdefb;
    color: navy;
    font-weight: bold;
}

.active {
    background-color: #bbdefb;
    color: navy;
    font-weight: bold;
    padding: 4px 8px;
}

.non_active {
    display: block;
    color: navy;
    text-align: center;
    text-decoration: none;
}

.form-control {
    width: 200px;
}

.example {
    display: table;
    border: 2px solid #5f90df ;
   
    margin: 0 auto;
}
.btn{
  background-color: #5f90df;
  color : white;
  border: 2px solid #EDF2F9 ;

}
.map_wrap, .map_wrap * {margin:auto;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
.map_wrap a, .map_wrap a:hover, .map_wrap a:active{color:#000;text-decoration: none;}
.map_wrap {position:relative;width:1200px;height:600px;}
#menu_wrap {position:absolute;top:0;left:0;bottom:0;width:230px;margin:10px 0 30px 10px;padding:5px;overflow-y:auto;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px;}
.bg_white {background:#fff;}
#menu_wrap hr {display: block; height: 1px;border: 0; border-top: 2px solid #5F5F5F;margin:3px 0;}
#menu_wrap .option{text-align: center;}
#menu_wrap .option p {margin:10px 0;}  
#menu_wrap .option button {margin-left:5px;}
#placesList li {list-style: none;}
#placesList .item {position:relative;border-bottom:1px solid #888;overflow: hidden;cursor: pointer;min-height: 65px;}
#placesList .item span {display: block;margin-top:4px;}
#placesList .item h5, #placesList .item .info {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
#placesList .item .info{padding:10px 0 10px 55px;}
#placesList .info .gray {color:#8a8a8a;}
#placesList .info .jibun {padding-left:26px;background:url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;}
#placesList .info .tel {color:#009900;}
#placesList .item .markerbg {float:left;position:absolute;width:36px; height:37px;margin:10px 0 0 10px;background:url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;}
#placesList .item .marker_1 {background-position: 0 -10px;}
#placesList .item .marker_2 {background-position: 0 -56px;}
#placesList .item .marker_3 {background-position: 0 -102px}
#placesList .item .marker_4 {background-position: 0 -148px;}
#placesList .item .marker_5 {background-position: 0 -194px;}
#placesList .item .marker_6 {background-position: 0 -240px;}
#placesList .item .marker_7 {background-position: 0 -286px;}
#placesList .item .marker_8 {background-position: 0 -332px;}
#placesList .item .marker_9 {background-position: 0 -378px;}
#placesList .item .marker_10 {background-position: 0 -423px;}
#placesList .item .marker_11 {background-position: 0 -470px;}
#placesList .item .marker_12 {background-position: 0 -516px;}
#placesList .item .marker_13 {background-position: 0 -562px;}
#placesList .item .marker_14 {background-position: 0 -608px;}
#placesList .item .marker_15 {background-position: 0 -654px;}
#pagination {margin:10px auto;text-align: center;}
#pagination a {display:inline-block;margin-right:10px;}
#pagination .on {font-weight: bold; cursor: default;color:#777;}
@media (min-width: 720px) and (max-width: 990px) {
  .map_wrap{
      width: 500px;
  }
  .example{
      width: 500px;
  
  }
}
@media (min-width: 990px) {
    .map_wrap{
      width: 700px;
  }
  .example{
      width: 700px;
  
  }
}

@media (min-width: 1200px) {
   .map_wrap{
      width: 900px;
  }
  .example{
      width: 700px;
  
  }
}
</style>