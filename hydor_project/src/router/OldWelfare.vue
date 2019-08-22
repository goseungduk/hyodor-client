<template>
    <div>
        <div class="example text-center mt-1">
            지역설정
            <b-form-select v-model="selected" :options="main_options" class="form-control mt-2 mb-2">
            </b-form-select>&nbsp;
            <b-form-select v-model="sub_selected" :options="sub_options" class="form-control mt-2 mb-2">
            </b-form-select>&nbsp;
            <b-button squared type="submit" class="btn mt-2 mb-2" @click="k2()">확인</b-button>
        </div>
        <br />
        <!-- <vue-fuse :keys="['svcPpo']" :list="list" :defaultAll="false"></vue-fuse> -->
        <div class="d-flex justify-content-center">
            <input type="text" v-model="search" placeholder="찾고싶은 복지서비스를 검색하세요!" style="width:40%;"/>
        </div>
        <div v-for="(i, $index) in filteredList" :key="$index">
            <!-- {{$index}} -->
            <!-- <p>{{list.length}}</p> -->
            <!-- <p>{{i}}</p> -->
            <!-- <p>{{i.jrsdDptAllNm['_text'].replace(/<!HS>|<!HE>/g,'')}}</p>
            <p>{{i.svcNm['_text'].replace(/<!HS>|<!HE>/g,'')}}</p>
            <p>{{i.svcPpo['_text'].replace(/<!HS>|<!HE>/g,'')}}</p>
            <p>{{i.svcInfoUrl['_text'].replace(/<!HS>|<!HE>/g,'')}}</p> -->
            <b-card :title="i.svcNm['_text'].replace(/<!HS>|<!HE>/g,'')" :sub-title="i.svcPpo['_text'].replace(/<!HS>|<!HE>/g,'')">
                <b-text>
                    <b-button id="show-btn" @click="showModal(i.svcId['_text'])">상세정보</b-button>
                </b-text>
            </b-card>
        </div>
        <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler"></infinite-loading>
        <div>
            <b-modal ref="my-modal" id="bv-modal-example" hide-footer>
                <template slot="modal-title">
                {{svcInfo.svcNm}}
                </template>
                <div class="d-block text-left">
                <h5>대상</h5>
                <h6>{{svcInfo.slctnStdr}}</h6>
                <h5>제출서류</h5>
                <h6>{{svcInfo.posesPapers}}</h6>
                <h5>신청방법</h5>
                <h6>{{svcInfo.reqstProcss}}</h6>
                <h5>목적</h5>
                <h6>{{svcInfo.svcPpo}}</h6>
                <h5>상세설명</h5>
                <h6>{{svcInfo.svcCts}}</h6>
                <h5>사이트</h5>
                <h6>{{svcInfo.refrncSiteUrl}}</h6>
                <h5>전화번호</h5>
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
                return item.svcNm['_text'].includes(this.search)  
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
            sub_selected:  { cd: 3220000, name: '강남구' },
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
        }
    },
    methods:{
        showModal(str){
            this.svcInfo=[];
            
            axios({
                method:'GET',
                url:'http://hyodor.azurewebsites.net/apicache/svc',
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
                url:"http://hyodor.azurewebsites.net/apicache/svc/list",
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
            this.infiniteHandler(this.state);
            // this.$refs.InfiniteLoading.stateChanger.reset(); 
            // axios({
            //     method:"GET",
            //     url:"http://hyodor.azurewebsites.net/apicache/svc/list",
            //     // url:'/api/svc/list',
            //     params:{
            //         // serviceKey:"b/kLuFCQo3nDRkavEnQWNrh1uv7hZiZmgfbPPPyOok/D1ltGhcQl3wI0/0Tr4M8glqdIK/rWDYHvgHZMFLUOsQ==",
            //         serviceKey:"m1rkdVnBIV0wQnxptLQOUDW8W32Bc9Sp9uLMd8fKQDpLSjxrXgGt00KgJRcH4QvJvPNzemSuIYHcILyGdIDFVw==",
            //         format:"xml",
            //         srhQuery:"노인",
            //         jrsdOrgCd:this.sub_selected.cd,//각 구의 지역코드,
            //         pageIndex:1,
            //         pageSize:10
            //     }
            // })
            // .then((response)=>{
            //     var result=x2j.xml2js(response.data,{compact:true});
            //     // console.log(result.result.svcList.svc['0']);
            //     // console.log(result.result);
            //     console.log(result.result.svcList.svc);
            //     console.log("길이 "+result.result.svcList.svc.length);
            //     this.list=this.list.concat(result.result.svcList.svc);
            //     this.state.loaded();
            //     /*
            //     (2) [{…}, {…}, __ob__: Observer]
            //         0: {__ob__: Observer} => svc가 있음
            //         1: {__ob__: Observer}
            //         this.lists.length 로 길이 파악가능
            //     */
            //     // for(var key in this.lists){
            //     //     console.log("key: "+key+"/ value: "+this.lists[key]);
            //     // }
            // })
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
    border: 2px solid #AEDCFD ;
    width: 700px;
    margin: 0 auto;
}
.btn{
  background-color: #99C9EC;
  color : white;
  border: 2px solid #EDF2F9 ;

}


</style>