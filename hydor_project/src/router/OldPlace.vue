<template>
    <div>
        <div class="example text-center mt-1" style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);padding: 10px;margin-bottom: 30px;">
            지역설정
            <b-form-select v-model="selected" :options="main_options" class="form-control mt-2 mb-2">
            </b-form-select>&nbsp;
            <b-form-select v-model="sub_selected" :options="sub_options3" class="form-control mt-2 mb-2">
            </b-form-select>&nbsp;
            <b-button squared type="submit" class="btn mt-2 mb-2" @click="b()">확인</b-button>
        </div>
        <br />
        <div class='map_wrap' style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);padding: 10px;margin-bottom: 30px;">
          <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
            <div id="menu_wrap" class="bg_white">
              <div class="option">
              </div>
              <hr>
              <ul id="placesList"></ul>
              <div id="pagination"></div>
          </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import NavbarVue from "../components/Navbar.vue";
import axios from 'axios';
import x2j from "xml-js";
export default {
    data() {
        return {
            sub_options2:[],
            sub_options3:[],
            selected: null,
            main_options: [
                { value: null, text: '서울특별시' },
                // { value: { cd: 6110000, name: '서울특별시' }, text: '서울특별시' },
                // { value: "인천광역시", text: '인천광역시(disabled)', disabled: true }
            ],
            sub_selected: null,
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
    methods: {
        b() {
          infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
          var temp = this.sub_selected.name + " 건강검진";
          ps.keywordSearch(temp, placesSearchCB);
        }
    },
    mounted() {
        container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        map = new kakao.maps.Map(container, options);
        ps = new kakao.maps.services.Places();
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
                li=res.orgs.org;
                for(var i=0;i<25;i++){
                    this.sub_options2[i]=li[i];
                }
                this.sub_options3.push({value:null,text:"시,군,구"});
                for(var i=0;i<25;i++){
                    this.sub_options3.push({value:{cd:this.sub_options2[i].orgCode['_text'],name:this.sub_options2[i].orgName['_text']},text:this.sub_options2[i].orgName['_text']});
                }
            })
    },
    
};
let infowindow = null; // 지도 좌표의 상세정보를 표시해주기 위한 객체
let markers = [];
let container='';
let options='';
let ps='';
let map='';
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        var listEl = document.getElementById('placesList'), 
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(), 
        bounds = new kakao.maps.LatLngBounds(), 
        listStr = '';
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        removeAllChildNods(listEl);
        removeMarker();
        for (var i = 0; i < data.length; i++) {
            var placePosition = new kakao.maps.LatLng(data[i].y, data[i].x),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, data[i]); // 검색 결과 항목 Element를 생성합니다
            // displayMarker(data[i]);
            bounds.extend(placePosition);
            // console.log(data[i]);
            (function(marker, title) {
                kakao.maps.event.addListener(marker, "mouseover", function() {
                    displayInfowindow(marker, title);
                });

                kakao.maps.event.addListener(marker, "mouseout", function() {
                    infowindow.close();
                });
                itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
                };

                itemEl.onmouseout =  function () {
                    infowindow.close();
                };
            })(marker, data[i].place_name);
            fragment.appendChild(itemEl);
        }
        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }

}
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h6><a href="'+places.place_url+'">' + places.place_name + '</a></h6>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}
function addMarker(position, idx, title) {
    var imageSrc =
        "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
}

function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

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
    // // console.log(Object.keys(marker).length);
    // for(var key in marker){
    //   markers.push(marker[key]);
    //   // console.log(typeof(key.setMap));
    // }

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
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