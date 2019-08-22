<template>
  <div>
    <h-nav current-page="serviceinfo"></h-nav>
    <div>
       <b-nav class="menubar_set mt-5 justify-content-center ">
      
        <b-nav-item class="menu_set mb-2 " :to="{name:'oldplace',params:{no:1}}" :class="[isSelected(1) ? 'active':'non_active']" >건강검진기관</b-nav-item>
        <b-nav-item class="menu_set mb-2 " :to="{name:'oldwelfare',params:{no:2}}" :class="[isSelected(2) ? 'active':'non_active']" >노인지원정책</b-nav-item>
      </b-nav>
    </div>
    <b-container>
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
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
      bid:1,
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
    },
    b() {
      infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      var temp=this.sub_selected.name+" 건강검진";
      ps.keywordSearch(temp, placesSearchCB);
      
    },
    isSelected(boardId) {
      // console.log("bid: "+boardId);
      console.log(this.$route.params.no);
      //부모가 자식의 인자를 $route 객체의 params로 다룰 수 있다.
      if (boardId == this.$route.params.no||(this.$route.params.no==undefined&&boardId+1==2)) {
        return true;
      }
      return false;
    }
  
  },
  mounted(){
    this.bid=1;
  }
  
};
let infowindow = null; // 지도 좌표의 상세정보를 표시해주기 위한 객체
let markers=[];

function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        removeMarker();
        for (var i=0; i<data.length; i++) {
            var placePosition = new kakao.maps.LatLng(data[i].y, data[i].x),
            marker=addMarker(placePosition,i);   
            bounds.extend(placePosition);
            (function(marker, title) {
              kakao.maps.event.addListener(marker, 'mouseover', function() {
                  displayInfowindow(marker, title);
              });

              kakao.maps.event.addListener(marker, 'mouseout', function() {
                  infowindow.close();
              });
            })(marker,data[i].place_name);
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        
        map.setBounds(bounds);
    } 
}
function addMarker(position, idx, title) {
    var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}


// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    
    // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });
    

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}

</script>
<style scoped>
.header {
  margin-top: 0.1em;
}
.menubar_set{  
list-style-type:none; 

padding-right: 20px;
padding-left: 15px;
margin-left: auto;
margin-right: auto;
}
.menu_set{float: left;}
.menu_set a{
  display: block; color: #5153c2; 
  text-align:center;
 text-decoration:none;
 
 }
.menu_set :hover{ 
color:#5153c2; 
font-weight:bold;

border-bottom:4px solid #5153c2;
}
.active{ 
color:#5153c2; 
font-weight:bold;

border-bottom: 2px solid #5153c2;
}
.non_active{
  display: block; color: navy; text-align:center;
 text-decoration:none;
}
@media (min-width: 768px) {
  .menubar_set {
    width: 760px;
    
  }
  .menu_set a{
    font-size: 15px;
  }
  
}

@media (min-width: 992px) {
  .menubar_set {
    width: 850px;
    
  }
  .menu_set a{
    font-size: 15px;
  }
}

@media (min-width: 1200px) {
  .menubar_set {
    width: 900px;
    
  }
  .menu_set a{
    font-size: 18px;
  }
}
</style>