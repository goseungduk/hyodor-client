<template>
  <div>
    <h-nav current-page="serviceinfo"></h-nav>
    <div>
      <!-- <b-nav> -->
      <b-nav class="menubar_set mt-5">
        <b-nav-item class="menu_set mb-2" @click="a();">시설</b-nav-item>
        <b-nav-item class="menu_set mb-2" >노인지원정책</b-nav-item>
      </b-nav>
      <div class="example">
        지역설정
        <b-form-select v-model="selected" :options="options" class="form-control">
        </b-form-select>&nbsp;
        <b-form-select v-model="sub_selected" :options="sub_options" class="form-control">
        </b-form-select>&nbsp;
        <b-button type="submit" variant="primary" @click="b()">확인</b-button>
      </div>
      <br />
      <div id="map" style="position:relative;margin:auto;width:500px;height:400px;"></div>
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
import axios from "axios";
import x2j from "xml2js";
import x22j from "xml-js";

export default {
  components: {
    "h-nav": NavbarVue
  },
  data() {
    return {
      selected: null,
      options:[
        {value:null,text:'시,도'},
        {value:{cd:6110000,name:'서울특별시'},text:'서울특별시'},
        {value:"인천광역시",text:'인천광역시(disabled)', disabled:true}
      ],
      sub_selected: null,
      sub_options:[
        {value:null,text:'시,군,구'},
        {value:{cd:3220000,name:'강남구'},text:'강남구'},
        {value:{cd:3240000,name:'강동구'},text:'강동구'},
        {value:{cd:3080000,name:'강북구'},text:'강북구'},
        {value:{cd:3150000,name:'강서구'},text:'강서구'},
        {value:{cd:3200000,name:'관악구'},text:'관악구'},
        {value:{cd:3040000,name:'광진구'},text:'광진구'},
        {value:{cd:3160000,name:'구로구'},text:'구로구'},
        {value:{cd:3170000,name:'금천구'},text:'금천구'},
        {value:{cd:3100000,name:'노원구'},text:'노원구'},
        {value:{cd:3090000,name:'도봉구'},text:'도봉구'},
        {value:{cd:3050000,name:'동대문구'},text:'동대문구'},
        // {value:{cd:,name:''},text:''},
      ],
      gulist: []
    };
  },
  methods: {
    a() {
      var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
      map.setCenter(moveLatLon);
      console.log(this.sub_selected.name+" "+this.sub_selected.cd);
    },
    b() {
      infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      var temp=this.sub_selected.name+" 건강검진";
      console.log(temp);
      ps.keywordSearch(temp, placesSearchCB);
    }
  },
  //   mounted: function() {
  //     var parseString = x2j.parseString;
  //     axios({
  //       method: "GET",
  //       url: "/api/org/code",
  //       params: {
  //         upOrgCd: 6110000,
  //         orgClsCd: "BA0303",
  //         format: "xml",
  //         serviceKey:
  //           "EzpVCm+y8ApwlDIaSCc+zV/XiHxgmrx8LE4EHCWpiRIjIkoeFTsarW7ypISPwiMsPGIXWC7FPpy2VdNCCa+UQg=="
  //       }
  //     })
  //       .then(response => {
  //         var result = x22j.xml2js(response.data, { compact: true, spaces: 4 });
  //         // this.gulist=result;
  //         // console.log(typeof(result));
  //         // console.log(this.gulist.result.totalCount._text);
  //         // console.log(this.gulist.elements['0'].elements['3'].elements['0'].text);
  //         for (
  //           var i = 1;
  //           i <= Number(result.result.totalCount._text) / 10 + 1;
  //           i++
  //         ) {
  //           axios({
  //             method: "GET",
  //             url: "/api/org/code",
  //             params: {
  //               pageIndex: i,
  //               upOrgCd: 6110000,
  //               orgClsCd: "BA0303",
  //               format: "xml",
  //               serviceKey:
  //                 "EzpVCm+y8ApwlDIaSCc+zV/XiHxgmrx8LE4EHCWpiRIjIkoeFTsarW7ypISPwiMsPGIXWC7FPpy2VdNCCa+UQg=="
  //             }
  //           }).then(response => {
  //             var result2 = x22j.xml2js(response.data, {
  //               compact: true,
  //               spaces: 4
  //             });
  //           });
  //         }
  //         //*********************************************************
  //         // parseString(response.data,(e,result)=>{
  //         //     for(var i=1;i<=(result.result.totalCount/10)+1;i++){
  //         //         axios({method:'GET',
  //         //         url:'/api/org/code',
  //         //         params:{
  //         //             pageIndex:i,upOrgCd:6110000,orgClsCd:'BA0303',format:"xml",serviceKey:"EzpVCm+y8ApwlDIaSCc+zV/XiHxgmrx8LE4EHCWpiRIjIkoeFTsarW7ypISPwiMsPGIXWC7FPpy2VdNCCa+UQg=="
  //         //         }
  //         //         })
  //         //         .then((response)=>{
  //         //             parseString(response.data,(e,result)=>{
  //         //                 console.log(result.result);
  //         //                 console.log(typeof(result.result.orgs['0']['org']))
  //         //                 this.gulist.push(result.result.orgs['0']['org']);

  //         //             })
  //         //         })
  //         //     }
  //         //     console.log(this.gulist);
  //         // });
  //         // console.log(this.gulist);
  //       })
  //       .catch(e => {
  //         console.log("오류");
  //       });
  //   }
};
let infowindow = null; // 지도 좌표의 상세정보를 표시해주기 위한 객체
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    var bounds = new kakao.maps.LatLngBounds();

    for (var i = 0; i < data.length; i++) {
      displayMarker(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x)
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", () => {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    console.log("인포윈도1 :" + infowindow);
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
    );
    infowindow.open(map, marker);
  });
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
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
}
</style>