//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 마커 변수, 옵션, 이미지
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		//전역으로 사용되는 데이터 파싱후 저장되는 객체들: 객체 배열, 마커 배열, 인포 배열, 관심목록 배열 등이 있다.
		var center_lst = [];			// 복지 데이터를 객체화하여 저장할 배열 
		var center_markers = [];		// 복지 marker를 저장할 배열 for 클러스터 
		var info_lst = [];				// 복지 marker의 info를 저장할 배열 
		var parking_lst = [];	 		// 주차장 데이터를 객체화~
		var parking_markers = [];		// 주차장 marker를 ~
		var parknig_info_lst = []; 		// 주차장 marker의 info를~
		var kids_lst =[];				// 키즈카페 데이터를 객체화~
		var kids_markers = [];			// 키즈카페 marker를 객체화~
		var kids_info_lst = []; 		// 키즈카페 marker의 info를~
		var accident_lst = [];			// 사고다발 구역 데이터를 객체화~
		var accident_circles = [];		// 사고다발 구역의 원 그림 객체 배열이 저장될 배열
		var likedlist=[];				//관심목록 저장 배열
		var sorted_lst=[];					// 정렬된 배열(복지관)이 저장될 배열 


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 카카오맵 위치, 옵션, 생성
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		//지도 표시할 div 결정
		var mapContainer = document.getElementById('map'),
		//지도 옵션 설정  
		mapOption = {
			center: new kakao.maps.LatLng(35.13438449851562, 129.1030912980164), // 지도의 중심좌표, default로 부경대 좌표를 설정
			level: 5, // 지도의 확대 레벨
			mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
		}; 
		//지도 생성
		var map = new kakao.maps.Map(mapContainer, mapOption); 
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 일반지도, 위성지도 선택
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ		
		// 지도 모드(일반, 위성)를 선택하게 하는 함수
		function setMapType(maptype) { 
			var roadmapControl = document.getElementById('btnRoadmap');
			var skyviewControl = document.getElementById('btnSkyview'); 
			if (maptype === 'roadmap') {
				map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
				roadmapControl.className = 'normal';
				skyviewControl.className = 'sky';
			} else {
				map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
				skyviewControl.className = 'normal';
				roadmapControl.className = 'sky';
			}
		}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 지도 확대, 축소 
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		//지도의 확대, 축소 버튼에서 사용되는 함수
		//축소: setLevel()을 통해서 현재 level 값을 불러온 후 -1을 적용 후 다시 map에 세팅
		function zoomIn() {
			map.setLevel(map.getLevel() - 1);
		}
		//확대: setLevel()을 통해서 현재 level 값을 불러온 후 +1을 적용 후 다시 map에 세팅
		function zoomOut() {
			map.setLevel(map.getLevel() + 1);
		}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 마커 변수, 옵션, 이미지
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		var imageSrc1 = 'img/center_marker.png', // 마커이미지의 주소입니다    
			imageSize1 = new kakao.maps.Size(70, 70), // 마커이미지의 크기입니다
			imageOption1 = {offset: new kakao.maps.Point(35, 70)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
		var markerImage1 = new kakao.maps.MarkerImage(imageSrc1, imageSize1, imageOption1);
		var imageSrc2 = 'img/parking_marker.png',  
			imageSize2 = new kakao.maps.Size(25, 25), 
			imageOption2 = {offset: new kakao.maps.Point(12.5, 12.5)}; 
		var markerImage2 = new kakao.maps.MarkerImage(imageSrc2, imageSize2, imageOption2);
		var imageSrc3 ='img/kids_marker.png',
			imageSize3=new kakao.maps.Size(25,25),
			imageOption3={offset:new kakao.maps.Point(12.5,12.5)};
		var markerImage3=new kakao.maps.MarkerImage(imageSrc3,imageSize3,imageOption3);
		var imageSrc4 ='img/here.png',
			imageSize4 = new kakao.maps.Size(100,100),
			imageOption4={offset:new kakao.maps.Point(50,100)};
		var markerImage4=new kakao.maps.MarkerImage(imageSrc4,imageSize4,imageOption4);	
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 복지관 클러스터 변수
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		var center_clusterer = new kakao.maps.MarkerClusterer({
			map: map, 
			averageCenter: true, // 마커들의 평균 위치에 클러스터로 표시
			minLevel: 6, // 6lv 이상시 클러스터 
		});
		
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  복지관 API 파싱, 정렬, 인포윈도우 내용, 마커 이벤트, 클러스터 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		//복지관 데이터 파싱
		var xhr = new XMLHttpRequest();
		var url = 'http://apis.data.go.kr/6260000/SocialWelfareCenterProgramService/getProgramInfo'; 
		var queryParams = '?' + encodeURIComponent('serviceKey') + '='+data_key; 
		queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10000'); 
		queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
		queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json'); 
		
		fetch(url+queryParams)
		.then((res) => res.json())
		.then((resJson) => {
			centers = resJson.getProgramInfo.body.items.item;	// 파싱한 데이터에 대하여 item 항목만 가져옴 
			// 반복문을 통하여 JSON을 객체안에 배열로 저장
			for (var i = 0; i < centers.length; i++) {
				var center = {
					cost: centers[i]["cost"],                      //비용
                	target: centers[i]["target"],                  //타겟
                  	lat: centers[i]["lat"],                        //위도
                	lng: centers[i]["lng"],                        //경도
                  	data_day: centers[i]["data_day"],              //날짜
                  	gugun: centers[i]["gugun"],                    //구군
                  	center_nm: centers[i]["center_nm"],            //복지관 이름
                  	addr_road: centers[i]["addr_road"],            //주소
                  	tel: centers[i]["tel"],                        //전화번호
                  	program_nm: centers[i]["program_nm"],          //프로그램 이름
                  	program_detail: centers[i]["program_detail"],  //프로그램 상세 설명 
                	start_date: centers[i]["start_date"],          //프로그램 운영 시작일
                	finish_date: centers[i]["finish_date"],        //프로그램 운영 종료일
                	program_num: i,                                //프로그램번호 : Query로 데이터 받아올 때 쓰기 위함
				}
				// api가 제공하는 좌표 정보에 오류가 존재해서 수작업으로 좌표 수정
				if(centers[i]["center_nm"] == "어린이재단 부산종합사회복지관"){
					center.lng = 129.040611;
				}
				else if(centers[i]["center_nm"] == "남광종합사회복지관"){
					center.lat = 35.29352221861833;
					center.lng = 129.09932435554808;
				}
				if(centers[i]["center_nm"] == "연제구거제종합사회복지관 부설"){
					center.lat = 35.18876829524218;
					center.lng = 129.07060755396068;
				}
				// 운영 중인 프로그램만 추가하기 위하여 운영 종료 일자와 현재 날짜를 비교하여 조건적으로 배여에 추가
				//const finish = new Date(center.finish_date.substring(0,4), center.finish_date.substring(5,7), center.finish_date.substring(8,10));
				//const today = new Date();
				//if(today<finish){
					center_lst.push(center);
				//}
				//-> 데이터 업데이트가 안돼서 날짜 조건 해제
			}

			// 배열에 저장된 json을 이름순으로 정렬해줌 
			sorted_lst = center_lst.sort(function(a,b){                           
				let x = a.center_nm; let y = b.center_nm;
					if(x<y)
					{ return -1; } 
					else
					{ return 0; } 
			}) 	

			var count = 0;			// 마커를 닫기위한 함수의 인자롤 사용하기 위한 index 
			var program_count = 1;	// 해당 복지관이 운영하는 프로그램의 수를 count
			for (var i=0; i<=sorted_lst.length-1; i++) {	// 정렬된 배열을 활용하여 중복된 복지관을 분리하여 복지관 별 마커를 생성
				if(i == sorted_lst.length-1){
					var lat = sorted_lst[i].lat;
					var lng = sorted_lst[i].lng;
					var marker = new kakao.maps.Marker({	// 마커 생성
						position: new kakao.maps.LatLng(lat, lng),
						map: map,
						image: markerImage1,
					});
					var iwContent = '<div class="wrap">' 	// 인포 윈도우에 들어가 내용 작성
+ '<div class="iwinfo">' 
+ '<div class="iwtitle">' 
+ sorted_lst[i].center_nm  // 복지관 이름
+'<img src="img/close.png" width="25", height="25" style="position:absolute; top:3%; right:3%;" onclick=close_info('+count+')>'// 인포 윈도우 닫기 함수 등록(특정 인포를 닫기 위하여 count)
+'</div>' 
+ '<div class="iwbody" style="padding:5px">' 
+ '전화번호 : '+ sorted_lst[i].tel +'<br>운영 프로그램 수 : '+program_count+'<br><hr><div style="line-height:70%"><br></div> ' // 전화 번호 및 운영 프로그램 개수      // 길찾기 % 로드뷰
+'<a id="route" onclick="find_route()" style="padding: 3px;background: darkgrey; color:white ; border-radius: 5px; margin-left:10px;font-size: 15px;font-weight: bold;">길 찾기</a>'
+'<a id="route" onclick="find_road_route()" style="padding: 3px;background: darkgrey; color:white ; border-radius: 5px; margin-left:10px;font-size: 15px;font-weight: bold;">로드 뷰</a>'
+'<span style="visibility: hidden;"> -----------</span>'
+'<span id="route" onclick="exp_srd()" style="padding: 3px;background: blue; color:white ; border-radius: 5px; margin-left:10px; font-size: 15px;font-weight: bold;">주변 탐색</span>'
+'</div>'					// 주변 탐색 함수 -> 가장 가까운 키즈카페/주차장의 장소 및 거리, 현재위치로부터의 거리 
+ '</div>'
+'</div>';  
		
					// 클릭한 마커 복지관 이름 저장 -> 클릭 이벤트에 사용
					var centernm = sorted_lst[i].center_nm;
					// 인포 윈도우 등록
					var infoWindow = new kakao.maps.InfoWindow({
						content: iwContent
					});
					info_lst.push(infoWindow);	 // 인포윈도우 배열에 추가 
					center_markers.push(marker); // 마커 배열에 추가 
												 // --> 제거를 위하여 배열에 추가
					// 마커 이벤트리스너 등록
					kakao.maps.event.addListener(marker, "mouseover", mouseOverListener(map, marker, infoWindow));
					kakao.maps.event.addListener(marker, "mouseout", mouseOutListener(infoWindow));

					// 마커 클릭 이벤트리스너 등록
					kakao.maps.event.addListener(marker, 'click', mouseClick(centernm, map, marker, infoWindow));		
					count++;
					break;		// 마지막 원소의 경우 등록후 나머지 과정이 수행되지 안도록 바로 반복문 탈출
				}
				if(sorted_lst[i].center_nm == sorted_lst[i+1].center_nm){	// 중복인 경우 운영 프로그램 수 증가
					program_count++;
				}
				else{			// 위의 과정 동일하게 반복
					var lat = sorted_lst[i].lat;
					var lng = sorted_lst[i].lng;
					var marker = new kakao.maps.Marker({
						position: new kakao.maps.LatLng(lat, lng),
						map: map,
						image: markerImage1,
					});
					var iwContent = '<div class="wrap">' 
+ '<div class="iwinfo">' 
+ '<div class="iwtitle">' 
+ sorted_lst[i].center_nm  // 복지관 이름
+'<img src="img/close.png" width="25", height="25" style="position:absolute; top:3%; right:3%;" onclick=close_info('+count+')>'// 인포 윈도우 닫기 함수 등록(특정 인포를 닫기 위하여 count)
+'</div>' 
+ '<div class="iwbody" style="padding:5px">' 
+ '전화번호 : '+ sorted_lst[i].tel +'<br>운영 프로그램 수 : '+program_count+'<br><hr><div style="line-height:70%"><br></div> ' // 전화 번호 및 운영 프로그램 개수      // 길찾기 % 로드뷰
+'<a id="route" onclick="find_route()" style="padding: 3px;background: darkgrey; color:white ; border-radius: 5px; margin-left:10px;font-size: 15px;font-weight: bold;">길 찾기</a>'
+'<a id="route" onclick="find_road_route()" style="padding: 3px;background: darkgrey; color:white ; border-radius: 5px; margin-left:10px;font-size: 15px;font-weight: bold;">로드 뷰</a>'
+'<span style="visibility: hidden;"> -----------</span>'
+'<span id="route" onclick="exp_srd()" style="padding: 3px;background: blue; color:white ; border-radius: 5px; margin-left:10px; font-size: 15px;font-weight: bold;">주변 탐색</span>'
+'</div>'					// 주변 탐색 함수 -> 가장 가까운 키즈카페/주차장의 장소 및 거리, 현재위치로부터의 거리 
+ '</div>'
+'</div>';  
		
					// 클릭한 마커 복지관 이름 저장 -> 클릭 이벤트에 사용
					var centernm = sorted_lst[i].center_nm

					var infoWindow = new kakao.maps.InfoWindow({
						content: iwContent
					});
					info_lst.push(infoWindow);
					center_markers.push(marker);

					// 마커 이벤트리스너 등록
					kakao.maps.event.addListener(marker, "mouseover", mouseOverListener(map, marker, infoWindow));
					kakao.maps.event.addListener(marker, "mouseout", mouseOutListener(infoWindow));

					// 마커 클릭 이벤트리스너 등록
					kakao.maps.event.addListener(marker, 'click', mouseClick(centernm, map, marker, infoWindow));
					program_count=1;
					count++;
				}
			}
			center_clusterer.addMarkers(center_markers); //클러스터 등록
		});

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  주차장 API 파싱, 정렬, 인포윈도우 내용, 마커 이벤트 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		// 주차장 데이터 파싱
		var xhr = new XMLHttpRequest();
		var url = 'http://apis.data.go.kr/6260000/BusanPblcPrkngInfoService/getPblcPrkngInfo'; /*URL*/
		var queryParams = '?' + encodeURIComponent('serviceKey') + '='+ data_key; /*Service Key*/
		queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10000'); // 모든 데이터를 가져온다. 
		queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
		queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json'); // json 형태로 가져온다. 

		fetch(url+queryParams)
		.then((res) => res.json())
		.then((resJson) => {
			parkings = resJson.getPblcPrkngInfo.body.items.item;	// 파싱한 데이터에 대하여 item 항목만 가져옴 
			
			// 주소-좌표 변환 객체를 생성합니다
			var geocoder = new kakao.maps.services.Geocoder();

			// 반복문을 통하여 JSON을 객체 형태로 배열에 저장
			for (var i = 0; i < parkings.length; i++) {
				const parking ={
					pkNam: parkings[i]["pkNam"],			//주차장명
					oprDay: parkings[i]["oprDay"],			//운영요일
					pkBascTime: parkings[i]["pkBascTime"],	//주차기본시간
					pkAddTime: parkings[i]["pkAddTime"],	//추가단위시간
					feeAdd: parkings[i]["feeAdd"],			//추가단위요금 -> 무료/유료 판단
					jibunAddr: parkings[i]["jibunAddr"],	//주소		   -> 위치 확인
					lat: 0,									// 해당 api가 제공하는 좌표 정보가 부정확하기 때문에 애초에 모두 0으로 저장한 후, 주소를 통한 검색으로 수정
					lng: 0,
				} 	
				geocoder.addressSearch(parking.jibunAddr, function(result, status) {	// 주소를 통해서 좌표를 얻음
				// 정상적으로 검색이 완료됐으면 
					if (status === kakao.maps.services.Status.OK) {
						var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
						parking.lat = coords.getLat();	// 객체에 좌표 수정
						parking.lng = coords.getLng();
						parking_lst.push(parking); 
						// 결과값으로 받은 위치를 마커로 표시합니다
						var marker = new kakao.maps.Marker({
							position: coords,
							map: map,
							image: markerImage2,//주차장 이미지 추가
						});
						
						// 인포윈도우로 장소에 대한 설명을 표시합니다
						if((parking.feeAdd==0) || (parking.feeAdd == "-")){	// 무료일 경우 -> 무료로만 표기
							var iwContent = '<div class="wrap_s">' + '<div class="iwinfo_s">' + '<div class="iwtitle_s_p">' + parking.pkNam +'</div>' + '<div class="iwbody_s">' +
								'비용: 무료 <br></div>'+ '</div>'+'</div>';
						}
						else{ // 무료가 아닐 경우 요금 표시
							var iwContent ='<div class="wrap_s">' + '<div class="iwinfo_s">' + '<div class="iwtitle_s_p">' + parking.pkNam +'</div>' + '<div class="iwbody_s">' +
							'비용: '+parking.pkBascTime+'분 이후 '+parking.pkAddTime+"분/"+parking.feeAdd+'원<br></div>'+ '</div>'+'</div>';
						}
						// 위의 작성한 내용을 인포윈도우에 등록
						var infoWindow = new kakao.maps.InfoWindow({
									content: iwContent,
						});
						marker.setMap(null);
						parking_markers.push(marker);
						parknig_info_lst.push(infoWindow);
						// 마커 이벤트리스너 등록
						kakao.maps.event.addListener(marker, "mouseover", mouseOverListener(map, marker, infoWindow));
						kakao.maps.event.addListener(marker, "mouseout", mouseOutListener(infoWindow));
					} 
				});
			}
		});

		// 체크 옵션 1: 주차장 표시
		function chk_parking_on_off(){	// 체크 박스를 통하여 마커를 보이게 또는 보이지 않게 설정
			if(document.getElementById("chk_parking").checked==true){
				__parking.className = 'chk_checked'
				for (var i = 0; i < parking_markers.length; i++) {
					parking_markers[i].setMap(map);
				}
			}
			else{
				__parking.className = ''
				for (var i = 0; i < parking_markers.length; i++) {
					parking_markers[i].setMap(null);
				} 
			}
		}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  키즈카페 API 파싱, 정렬, 인포윈도우 내용, 마커 이벤트 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		// 키즈카페 데이터 파싱
		var xhr = new XMLHttpRequest();
		var url = 'http://apis.data.go.kr/6260000/BusanKidsCafeInfoService/getKidsCafeInfo'; /*URL*/
		var queryParams = '?' + encodeURIComponent('serviceKey') + '='+ data_key; /*Service Key*/
		queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10000'); // 모든 데이터를 가져온다. 
		queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
		queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json'); // json 형태로 가져온다. 
			
		fetch(url+queryParams)
		.then((res) => res.json())
		.then((resJson) => {
			kids = resJson.getKidsCafeInfo.body.items.item;	// 변수 kids : 파싱한 데이터에 대하여 item 항목만 가져옴.  
			// 반복문을 통하여 JSON을 객체 형태로 배열에 저장
			for (var i = 0; i < kids.length; i++) {
				const kid ={
					cafe_nm: kids[i]["cafe_nm"],		//키즈카페명
					road_nm: kids[i]["road_nm"],		//도로명주소
					tel_no: kids[i]["tel_no"],			//전화번호
					gugun: kids[i]["gugun"],			//구군
					lat: kids[i]["lat"],				//위도
					lng: kids[i]["lng"],				//경도
				} 	
				kids_lst.push(kid); //push() 메서드는 배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환합니다.
			}
			//마커생성 및 배열 요소별로 인포윈도우 값 지정 및 클러스터 등록	
			for (var i = 0; i < kids.length; i++) {	
				var marker = new kakao.maps.Marker({
					position: new kakao.maps.LatLng(kids_lst[i].lat, kids_lst[i].lng),
					map: map,
					image: markerImage3,//키즈카페 이미지 추가

				});
				marker.setMap(null);
				kids_markers.push(marker); // 마커들을 kids_markers배열에 모음. 
				// 인포윈도우
				var iwContent ='<div class="wrap_s">' + '<div class="iwinfo_s">' + '<div class="iwtitle_s_k">' + kids_lst[i].cafe_nm +'</div>' + '<div class="iwbody_s">' +
					'주소: '+kids_lst[i].road_nm+'<hr>Tel: '+kids_lst[i].tel_no+'<br></div>'+ '</div>'+'</div>';
				var infoWindow = new kakao.maps.InfoWindow({ 
					content: iwContent, }); // ★ content에 길찾기 도착지점설정기능 넣기
				kids_info_lst.push(infoWindow);
				// 마커 이벤트리스너 등록
				kakao.maps.event.addListener(marker, "mouseover", mouseOverListener(map, marker, infoWindow));
				kakao.maps.event.addListener(marker, "mouseout", mouseOutListener(infoWindow));
			}
		});
				
		// 체크 옵션 2: 키즈카페 표시
		function chk_kids_on_off(){ // 체크 박스를 통하여 마커를 보이게 또는 보이지 않게 설정
			if(document.getElementById("chk_kids").checked==true){
				__kids.className = 'chk_checked'
				for (var i = 0; i < kids_markers.length; i++) {
					kids_markers[i].setMap(map); 
				}    
			}
			else{
				__kids.className = ''
				for (var i = 0; i < kids_markers.length; i++) {
					kids_markers[i].setMap(null);
				} 
			}
		}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  사고다발 API 파싱, 정렬, 인포윈도우 내용, 마커 이벤트 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

        var xhr = new XMLHttpRequest();
        var url = 'http://apis.data.go.kr/B552061/frequentzoneOldman/getRestFrequentzoneOldman'; /*URL*/
        var queryParams = '?' + encodeURIComponent('serviceKey') + '='+ data_key;/*Service Key*/
        queryParams += '&' + encodeURIComponent('searchYearCd') + '=' + encodeURIComponent('2020'); /**/
        queryParams += '&' + encodeURIComponent('siDo') + '=' + encodeURIComponent('26'); /**/
        queryParams += '&' + encodeURIComponent('guGun') + '=' + encodeURIComponent(''); /**/
        queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /**/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10000'); /**/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/

        fetch(url+queryParams)
        .then((res) => res.json())
        .then((resJson) => {
                accident = resJson.items.item;
                for (var i = 0; i < accident.length; i++) {
					if (accident[i] != null) {                //사고정보가 없는 경우
						const accs ={
                     		la_crd: accident[i]["la_crd"],               //위도
                     		lo_crd: accident[i]["lo_crd"],               //경도
                     	}    
						accident_lst.push(accs);            //데이터 없는 acc객체배열을 accident_lst에 넣음
                	}
				}	
				for (var i = 0; i < accident_lst.length; i++) {
					var circle = new kakao.maps.Circle({
					map: map, // 원을 표시할 지도 객체
					center : new kakao.maps.LatLng(accident_lst[i].la_crd, accident_lst[i].lo_crd), // 원이 그려질 좌표 
					radius : 50, // 원의 반지름 (단위 : m)
					fillColor: '#FF0000', // 채움 색
					fillOpacity: 0.5, // 채움 불투명도
					strokeWeight: 3, // 선의 두께
					strokeColor: '#FF0000', // 선 색
					strokeOpacity: 0.9, // 선 투명도 
					strokeStyle: 'solid' // 선 스타일
					});	
					circle.setMap(null);
					accident_circles.push(circle);
				}		
		});

		// 체크 옵션 3: 사고다발지역 표시
		function chk_accident_on_off(){
			if(document.getElementById("chk_accident").checked==true){
				__accident.className = 'chk_checked'
				for (var i = 0; i < accident_circles.length; i++) {
					accident_circles[i].setMap(map); 
				}    
			}
			else{
				__accident.className = ''
				for (var i = 0; i < accident_circles.length; i++) {
					accident_circles[i].setMap(null);
				} 
			}
		}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 복지관 마커 클릭 이벤트 - 해당 복지관 프로그램 검색
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function mouseClick(centernm, map, marker, infoWindow) 
		{
			return function(){
				on_off_bool = -1;	// 인포 윈도우 제어 변수 -1로 오버, 아웃 시 수행 x
				center_clk = 1;		// 현재 위치와 연결을 위한 마커가 클릭됬는지 확인을 위한 변수 0: 클릭x, 1: 클릭됨 
				center_pos = marker.getPosition();	//center의 위치=마커의 좌표
				var pos_lng = center_pos.getLng();	// 경위도 추출
				var pos_lat = center_pos.getLat();
				clicked_center = centernm;			// 주변 탐색에 사용하기 위하여 복지관 이름 저장	

				infoWindow.open(map, marker);		// 인포 윈도우 열기
				var res_search = document.getElementById("res_search");	//결과 표시를 위한 결과창 DOM 객체
				var icon = document.getElementById("icon");				//자동으로 검색 결과창 open을 위한 icon id를 사용하는 태그 dom 객체
				var temp = res_search.rows.length;						//기존의 검색 결과 삭제를 위한 길이를 저장하는 변수
				for(var i = 0; i<temp-1; i++){							// 반복문을 통해서 기존의 검색 결과 삭제
					const delRow = res_search.deleteRow(-1); 			// 행을 삭제;
				}
				for (var i = 0; i < centers.length; i++) {				// 반복문을 통해서 검색어를 포함하는 객체의 데이터 추출
					if(centers[i].center_nm==centernm){ 				// 선택된 복지관 이름의 프로그램일 경우
							var url = get_url(centers[i].center_nm);	// 해당 복지관 url 가져옴
							const addRow = res_search.insertRow(); 		// 새로운 행 생성, 6개의 cell(6열)
							const cell_1 = addRow.insertCell(0);
							const cell_2 = addRow.insertCell(1);
							const cell_3 = addRow.insertCell(2);
							const cell_4 = addRow.insertCell(3);
							const cell_5 = addRow.insertCell(4);
							const cell_6 = addRow.insertCell(5);

							cell_1.innerHTML =  "<a href= '"+url+"' target='_blank'>"+centernm+"</a>";// url 등록 
							cell_2.innerText = centers[i].program_nm;		//프로그램 이름
							cell_3.innerText = centers[i].program_detail;	//프로그램 설명
							cell_4.innerText = centers[i].cost;				// 프로그램 비용
							cell_5.innerText = cal_rng(centers[i].lat, centers[i].lng, current_location.lat, current_location.lng)+"km";	// 현재 위치로 부터 거리

							// [관심목록]
							//체크 -> 프로그램 번호로 정보 넘김
							if(likedlist[i]==1)	//이전 체크 기록 유지
							{cell_6.innerHTML = "<input type='checkbox' checked onclick='like_on_off("+i+")'>";}
							else
							{cell_6.innerHTML = "<input type='checkbox' onclick='like_on_off("+i+")'>";}
						}
					}
					// 검색 결과창 닫혀 있으면 연다. 
					if(icon.checked){	
						icon.checked = false;
					}
					search_bar_on_off();	

					// 지도 재설정
					var new_center = new kakao.maps.LatLng(pos_lat-0.001, pos_lng-0.01);
					map.setCenter(new_center);	// 지도의 중심을 선택된 복지관 좌표로 
					map.setLevel(5);			// level 수정	
				}
		}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//인포 윈도우 열기 닫기// 마우스 over, out
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		// 인포윈도우 제어 변수 ->  -1: 클릭, 0: 마우스 오버, 1: 마우스 아웃 인포
		var on_off_bool = 0; 
		//열기 
		function mouseOverListener(map, marker, infoWindow) {
			return function () {
				if(on_off_bool==0){
					center_pos = marker.getPosition();
					on_off_bool = 1;
					infoWindow.open(map, marker);
				}
				
			};
		}
		//닫기
		function mouseOutListener(infoWindow) {
			return function () {
				if(on_off_bool==1){
					on_off_bool = 0;
					infoWindow.close();
				}
			};
		}
		// 복지관 마커의 인포가 닫히면 주변 탐색으로 열리 주차장, 키즈카페 인포도 같이 닫기 위한 변수
		var parking_info_num; 
		var kids_info_num;
		
		// 인포윈도우의 clse 버튼을 누르면 수행되는 함수
		function close_info(count) { 	// count는 해당 마커 클릭 시 저장된 마커의 index 값
			on_off_bool = 0;			// 인포 윈도우 over를 통한 열기 가능
			info_lst[count].close();	// 복지관 마커 인포윈도우 닫기
			parknig_info_lst[parking_info_num].close();	// 주차장 인포 윈도우 닫기
			kids_info_lst[kids_info_num].close();		// 키즈카페 인포 윈도우 닫기
			// 주차장, 키즈카페 마커도 닫기
			chk_parking_on_off();		
			chk_kids_on_off();		
			// 주차장, 키즈카페 주위의 도형 삭제	
			circle_p.setMap(null);	
			circle_k.setMap(null);
			polyline_cpk.setMap(null);
			if(line_bool==1){	// 현재 위치를 잇는 라인도 생성되어져 있으면 삭제
				polyline_ctr.setMap(null);
			}
			exp_srd_bool=0;		// 탐색 제어 변수 초기화
			line_bool=0;		// 라인 생성 제어 변수 초기화
			document.getElementById("rng_box").style.display = "none"; // 거리가 표시되는 태그 사라지게 설정
		}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 주변 탐색 ★★★★
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		// 도형 변수들 -> 삭제를 위해서 외부에 변수 선언
		var circle_p;			// 주차장 원
		var circle_k;			// 키즈카페 원
		var polyline_cpk;		// 주파장, 키즈카페 -> 복지관 연결선 
		var polyline_ctr;		// 현재위치 -> 복지관 연결선
		var exp_srd_bool = 0;	// 주변 탐색 제어 변수
		var min_parking;		// 최소 거리 변수 - 주차장
		var min_cafe;			// 최소 거리 변수 - 키즈카페 
		var clicked_center;		// 선택한(클릭한) 복지관 이름 -> 좌표 충돌 발생하는 복지관의 오류를 직접 제어하기 위한 변수
		// 주변 탐색을 수행하는 함수
		function exp_srd(){		
			var pos_lng = center_pos.getLng();		//현재 선택된 마커(복지관)의 좌표를 가져온다. 
			var pos_lat = center_pos.getLat();

			// 기본 최소 거리 작성
			min_parking = cal_rng(parking_lst[0].lat, parking_lst[0].lng, pos_lat, pos_lng);
			min_cafe = cal_rng(kids_lst[0].lat, kids_lst[0].lng, pos_lat, pos_lng);
			
			var min_parking_idx=0;	//최소 거리를 가지는 주차장과 카페의 index 값을 저장할 변수 
			var min_cafe_idx=0;		// -> 후에 이변수를 통하여 해당 주차장, 키즈카페에 접근
			var temp1;	//임시 저장변수들
			var temp2;
			
			// 최소 거리를 가지는 주차장, 키즈카페 탐색 -> cal_rng() 함수 활용
			for(var i=1; i<parking_lst.length;i++){	
				temp1= cal_rng(parking_lst[i].lat, parking_lst[i].lng, pos_lat, pos_lng);
				if(min_parking > temp1){
					min_parking = temp1;
					min_parking_idx = i;
				}
			}
			for(var j=1; j<kids.length;j++){
				temp2 =  cal_rng(kids_lst[j].lat, kids_lst[j].lng, pos_lat, pos_lng);
				if(min_cafe > temp2){
					min_cafe = temp2;
					min_cafe_idx = j;
				}
			}
			
			// 좌표 충돌이 일어나는 복지관들 직접 수정 -> 원인 아직 찾지 못함.
			if(clicked_center=="어린이재단 부산종합사회복지관"){
				min_cafe_idx = 25;
				min_cafe = cal_rng(kids_lst[25].lat, kids_lst[25].lng, pos_lat, pos_lng);
			}
			else if(clicked_center=="홀트수영종합사회복지관"){
				min_cafe_idx = 6;
				min_cafe = cal_rng(kids_lst[6].lat, kids_lst[6].lng, pos_lat, pos_lng);
			}
			else if(clicked_center=="동래종합사회복지관"){
				min_cafe_idx = 5;
				min_cafe = cal_rng(kids_lst[5].lat, kids_lst[5].lng, pos_lat, pos_lng);
			}

			// 주변 탐색이 가능하면 도형을 통해서 지도에 표시
			if(exp_srd_bool==0){
				circle_p = new kakao.maps.Circle({
					center : new kakao.maps.LatLng(parking_lst[min_parking_idx].lat, parking_lst[min_parking_idx].lng),  // 원의 중심좌표 입니다 
					radius: 100, // 미터 단위의 원의 반지름입니다 
					strokeWeight: 5, // 선의 두께입니다 
					strokeColor: '#692498', // 선의 색깔입니다
					strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
					strokeStyle: 'solid', // 선의 스타일 입니다
					fillColor: '#E0BFE6', // 채우기 색깔입니다
					fillOpacity: 0.5  // 채우기 불투명도 입니다   
				}); 

				circle_k = new kakao.maps.Circle({
					center : new kakao.maps.LatLng(kids_lst[min_cafe_idx].lat, kids_lst[min_cafe_idx].lng),  // 원의 중심좌표 입니다 
					radius: 100, // 미터 단위의 원의 반지름입니다 
					strokeWeight: 5, // 선의 두께입니다 
					strokeColor: '#FFCD4A', // 선의 색깔입니다
					strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
					strokeStyle: 'solid', // 선의 스타일 입니다
					fillColor: '#FEEBB6', // 채우기 색깔입니다
					fillOpacity: 0.5  // 채우기 불투명도 입니다   
				}); 
				var linePath = [
					new kakao.maps.LatLng(parking_lst[min_parking_idx].lat, parking_lst[min_parking_idx].lng),
					new kakao.maps.LatLng(pos_lat, pos_lng),
					new kakao.maps.LatLng(kids_lst[min_cafe_idx].lat, kids_lst[min_cafe_idx].lng),
				];

				// 지도에 표시할 선을 생성합니다
				polyline_cpk = new kakao.maps.Polyline({
					path: linePath, // 선을 구성하는 좌표배열 입니다
					strokeWeight: 5, // 선의 두께 입니다
					strokeColor: '#58CCFF', // 선의 색깔입니다
					strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
					strokeStyle: 'solid' // 선의 스타일입니다
				});
				
				// 작성한 도형들을 지도에 등록
				var exp_srd_res_lst = [];
				exp_srd_res_lst.push(circle_p);
				exp_srd_res_lst.push(circle_k);
				exp_srd_res_lst.push(polyline_cpk);


				exp_srd_res_lst.pop().setMap(map);
				exp_srd_res_lst.pop().setMap(map);
				exp_srd_res_lst.pop().setMap(map);

				for (var k = 0; k < parking_lst.length; k++) {
					if(k==min_cafe_idx){
						kids_markers[k].setMap(map);
						kids_info_lst[k].open(map,kids_markers[k])
						kids_info_num = k;
					}
					if(k==min_parking_idx){
						parking_markers[k].setMap(map);
						parknig_info_lst[k].open(map,parking_markers[k])
						parking_info_num = k;
					}
				}
			}
			exp_srd_bool=1; // 제어 변수의 값을 변경하여 더이상 그리지 못하게 -> 그림이 삭제되면 다시 0으로 설정됨
			draw_line();	// 복지관과 현재 위치 사이의 선을 그리는 함수 호출
			cacl_rng_for_exp(min_parking, min_cafe); // 현재 거리 표시 함수 호출
		}

		var center_clk = 0; // 현재 클릭된 마커 유무 확인 변수, 0: 클릭되지 않음, 1: 클리된 마커 존재 
		var line_bool = 0;	// 이전에 그려진 라인의 유무 확인 변수, 0: 그려지지 않음. 1: 그려진 선 존재
		
		//현재 위치 + 복지관 연결 함수
		function draw_line(){
			if((curlocmarker_bool == center_clk == 1) && line_bool==0){ // 현재 등록된 위치가 존재, 현재 클릭된 마커가 존재, 현재 그려진 선이 존재x -> 그릴 수 있다.
				// 경로를 저장 -> 현재 위치, 클릭 마커 위치 
				var linePath = [
					new kakao.maps.LatLng(return_cur_lat(), return_cur_lng()),
					new kakao.maps.LatLng(center_pos.getLat(), center_pos.getLng())
				];
				// 지도에 표시할 선을 생성합니다
				polyline_ctr = new kakao.maps.Polyline({
					path: linePath, 
					strokeWeight: 7,
					strokeColor: '#FC5230', 
					strokeOpacity: 0.7, 
					strokeStyle: 'solid' 
				});
				// 지도에 생성한 선을 그린다. 
				polyline_ctr.setMap(map); 
				// 지워지기 전 까지 그려지지 않도록 제어변수를 1로 설정
				line_bool = 1;
			}
		}		

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 거리 계산 및 표시 
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		// 거리 계산 및 표시 함수 -> 체크 메뉴 밑에 숨어 있는 태그에 한시적으로 표시된다. // 한시적 -> 주변 탐색을 수행할 때 
		function cacl_rng_for_exp(parking_rng, cafe_rng){
			document.getElementById("rng_box").style.display = "block";
			if(curlocmarker_bool==1){	// 현재 위치가 등록된 경우 -> 클릭한 센터와 가장 가까운 주차장과 키즈 카페 추가적으로 현재 위치와의 거리를 표시 
				//현재위치 거리도 계산
				var temp_lat = return_cur_lat()
				var temp_lng = return_cur_lng()
				var pos_lat = center_pos.getLat();
				var pos_lng = center_pos.getLng();
				var here_rng = cal_rng(temp_lat, temp_lng, pos_lat, pos_lng);
				document.getElementById("cur_rng").innerText = "현재위치: "+ here_rng +"km";
				document.getElementById("prk_rng").innerText = "주차장: "+ parking_rng +"km";
				document.getElementById("kds_rng").innerText = "키즈카페: "+ cafe_rng +"km";

			}
			else{						// 현재 위치가 등록되지 않은 경우 -> 클릭한 센터와 가장 가까운 주차장과 키즈카페 위치와의 거리를 표시
				document.getElementById("prk_rng").innerText = "주차장: "+ parking_rng +"km";
				document.getElementById("kds_rng").innerText = "키즈카페: "+ cafe_rng +"km";
			}
		}

//**********************************************
//*************** 현재 위치 등록 ***************
//**********************************************
		// 현재 위치 변수(객체: 좌표값을 저장)
		var current_location={ //최초위치 부경대 좌표값 변수 -> 이후에 현재 위치 등록 함수를 통해서 값이 변경된다. 
			lat: 35.13438449851562,
			lng: 129.1030912980164,
		}
		// 현재 위치를 최신화 하는 함수: position을 인자로 받음, position는 좌표가 저장된 객체
		function refresh_cur_loc(position){
			current_location.lat = position.y;
			current_location.lng = position.x;
		}
		// 좌표 값을 반환, 경도/위도 분리하여 구성
		function return_cur_lng(){
			return current_location.lng
		}
		function return_cur_lat(){
			return current_location.lat
		}

		// 현재 위치 마커, 기본값으로 kakao map의 마커 형태로 선언, 이후에 수정된다. 
		var curlocmarker = new kakao.maps.Marker({
			position: new kakao.maps.LatLng(35.13438449851562, 129.1030912980164),
			map: map,
			image: markerImage4,//주차장 이미지 추가
		});
		curlocmarker.setMap(null);
		// 현재 위치 마커의 생성을 제어하는 변수(0: 생성 가능, 1: 생성 불가)
		var curlocmarker_bool = 0;

		// 주소를 검색한 후 해당 위치에 현재 위치 마커를 등록하는 함수
		function register_loc() {
				curlocmarker.setMap(null);	// 기존의 마커 삭제
				curlocmarker_bool =1;		// 추가로 생성되지 않도록 변수 값 변경
				new daum.Postcode({			// 다음&카카오에서 제공하는 주소 검색 api 활용
					oncomplete: function(data) {
						var roadAddr = data.roadAddress; // 도로명 주소 변수에 도로명 주소 저장
						var geocoder = new kakao.maps.services.Geocoder(); // 주소를 통해서 좌표를 변경해주는 객체
						geocoder.addressSearch(roadAddr, function(result, status) { //객체의 메소드에 인자로 도로명 주소 전달
							if (status === kakao.maps.services.Status.OK) {
								var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
								var position = {	// 해당 위치의 좌표를 position이라는 객체에 저장
									x: result[0].x,
									y: result[0].y,
								}
								refresh_cur_loc(position);	// 현재 위치를 최신화
								curlocmarker = new kakao.maps.Marker({	// 현재 위치 마커 생성
									position: coords,
									map: map,
									image: markerImage4,
								});
								curlocmarker.setMap(map);	// 지도에 마커 등록
								map.setCenter(coords);		// 지도의 중심 위치를 생성된 마커의 위치로
							} 
						}); 
					}
				}).open();
			}

//**********************************************
//********** 경로 탐색 함수 및 로드뷰 **********
//**********************************************
		var center_pos;				// 경로 탐색 시 사용하는 마커(복지관)의 좌표
		// 경로 탐색 함수 -> 지도 url을 통한 경로 탐색			
		function find_route(){
			var url = "https://map.kakao.com/link/from/현위치,";
			var queryParams = return_cur_lat();
			queryParams += ","+return_cur_lng();
			queryParams += "/to/목적지,";
			queryParams += center_pos.getLat()+','+center_pos.getLng();
			url += queryParams;
			window.open(url, "길찾기 새창", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );  
		}
		// 로드뷰 제공 함수 -> 지도 url에서 선택된 마커(복지관)의 로드뷰를 확인 가능
		function find_road_route(){
			var url = "https://map.kakao.com/link/roadview/";
			var queryParams = center_pos.getLat()+','+center_pos.getLng();
			url += queryParams;
			window.open(url, "길찾기 새창", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );  
		}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//위도 경도를 입력받아 두 좌표의 거리를 계산하는 함수 for 
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		function cal_rng(lat1,lng1,lat2,lng2) { 
			function deg_to_rad(deg) { return deg * (Math.PI/180) }  // 각도를 라디안으로
			var r = 6371; // 지구 평균 둘레 
			var dLat = deg_to_rad(lat2-lat1); // 경도와 위도 차이를 라디안으로 변환
			var dLng = deg_to_rad(lng2-lng1);
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg_to_rad(lat1)) * Math.cos(deg_to_rad(lat2)) * Math.sin(dLng/2) * Math.sin(dLng/2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = r * c; // 최종값을 지구 둘레와 곱하여 km 형태로 변환
			return d.toFixed(1); // 소수점 1자리로 고정
		}


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// [관심목록] 
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//관심목록-배열에 저장하는 함수
		function like_on_off(i){
			if(likedlist[i]==1){
				likedlist[i]=0; // 체크 해제 
			}
			else
				{likedlist[i]=1;}	// 체크 
			}

//[관심목록] 추가 슬라이드 창
		function show_liked(){
			var int_lst = document.getElementById("int_lst");	// 관심 목록 리스트 DOM 객체
			var icon_int = document.getElementById("icon_int");	// 관심 목록 체크 DOM 객체 -> 체크시 목록을 보이게
			var temp = int_lst.rows.length;						// 기존의 검색 결과 삭제를 위하여 길이를 가져옴
			var liked_count=0;									// 관심 목록의 개수를 세기위한 함수 
			for(var i = 0; i<temp-1; i++){						// 이전 결과 삭제
				const delRow = int_lst.deleteRow(-1); 
			}
			for (var i = 0; i <= centers.length; i++) {	
				if(likedlist[i]==1){	// 관심 목록으로 체크된 항목만 가져옴
					liked_count++;		// 개수 증가 
					const addRow = int_lst.insertRow(); 	// 새로운 행 추가
					const cell_1 = addRow.insertCell(0);	// 3개의 cell(3열)
					const cell_2 = addRow.insertCell(1);
					const cell_3 = addRow.insertCell(2);
					
					var url = get_url(centers[i].center_nm);//해당 복지관 url 가져옴
					cell_1.innerHTML = "<a href= '"+url+"' target='_blank'>"+centers[i].center_nm+"</a>";	// url 연결이 가능한 복지관 이름
					cell_2.innerHTML = "<div onclick='move_center("+i+")'>"+centers[i].program_nm+"</div>"; // 해당 복지관 마커로 이동이 가능한 프로그램 이름

					//체크 -> 프로그램 번호로 정보 넘김 // 체크 해제 시 관심 목록에서 빠진다. 
					if(likedlist[i]==1)	//이전 체크 기록 유지
					{cell_3.innerHTML = "<input type='checkbox' checked onclick='like_on_off("+i+")'>";}
					else
					{cell_3.innerHTML = "<input type='checkbox' onclick='like_on_off("+i+")'>";}
					}
				}
				// 관심 목록이 없는 경우 위의 반복문을 탈출 
				if(liked_count==0){
						alert("관심 목록이 없습니다"); 
						icon_int.checked = true;
						chk_liked.checked = false;
						return;
					}	
				inter_bar_on_off();
		}

// 관심 목록 바의 on/off를 제어하는 함수
		function inter_bar_on_off(){
			var icon_int = document.getElementById("icon_int");
			var go_rcdpro = document.getElementById("go_rcdpro");
			if(icon_int.checked){
					icon_int.checked = false;
					go_rcdpro.style.display = "none";
			}
			else{
					icon_int.checked = true;
					go_rcdpro.style.display = "block";
			}
		}
		inter_bar_on_off();	// 닫힌 채로 시작 하기 위하여 한번 호출		
       

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 검색기능 및 검색시 사이드바 열기
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		// 검색 기능 구현
		function search(center_num){
			var search_text = document.getElementById("search_text");	// 검색어를 가져오기 위한 검색창 DOM 객체
			var res_search = document.getElementById("res_search");		// 검색어 결과를 나타내기 위한 결과창 DOM 객체
			var icon = document.getElementById("icon");					// 결과창 제어를 위한 체크박스 DOM 객체
			var temp = res_search.rows.length;							// 기존 결과를 삭제하기 위한 table의 길이를 가져옴
			for(var i = 0; i<temp-1; i++){								// 기존의 검색 결과 삭제
				const delRow = res_search.deleteRow(-1); 
			}
			if(center_num >= 0){											// 인자로 center_num의 값이 0 이상이라는 것은 특정 복지관이 운영하는 프로그램을 호출하는 것
				for (var i = 0; i < centers.length; i++) {				// 해당 복지관애서 운영하는 프로그램만 결과에 출력 
					if(centers[i].center_nm==centers[center_num].center_nm){
						const addRow = res_search.insertRow(); 			// 행 추가 
						var url = get_url(centers[i].center_nm);		// 해당 복지관 url 가져옴
						const cell_1 = addRow.insertCell(0);			// 6개 cell(6열)
						const cell_2 = addRow.insertCell(1);
						const cell_3 = addRow.insertCell(2);
						const cell_4 = addRow.insertCell(3);
						const cell_5 = addRow.insertCell(4);
						const cell_6 = addRow.insertCell(5);
										
						cell_1.innerHTML =  "<a href= '"+url+"' target='_blank'>"+centers[i].center_nm+"</a>";	// 복지관 url
						cell_2.innerHTML = "<div onclick='move_center("+i+")'>"+centers[i].program_nm+"</div>";	// 복지관으로 이동 함수가 부착된 프로그램 이름
						cell_3.innerText = centers[i].program_detail;		// 프로그램 설명 
						cell_4.innerText = centers[i].cost;					// 참가 비용
						cell_5.innerText = cal_rng(centers[i].lat, centers[i].lng, current_location.lat, current_location.lng)+"km";	// 현재 위치로 부터 거리
						// [관심목록]
						//체크 -> 프로그램 번호로 정보 넘김
						if(likedlist[i]==1)	//이전 체크 기록 유지
						{cell_6.innerHTML = "<input type='checkbox' checked onclick='like_on_off("+i+")'>";}
						else
						{cell_6.innerHTML = "<input type='checkbox' onclick='like_on_off("+i+")'>";}
					}
				}
			}
			else{														// 인자의 값이 음수 라는 것은 특정 검색어가 입력 되었다는 것, 복지관별 검색이 아닌 검색어별 검색
				if(search_text.value==""){									// 검색어가 없을 시 호출
					alert("검색어를 입력하세요"); 
					return;
				}
				for (var i = 0; i < centers.length; i++) {				// 검색어를 프로그램 이름, 설명에 포함되는 프로그램만 결과에 추출
					if((centers[i].program_nm.indexOf(search_text.value) != -1)||(centers[i].program_detail.indexOf(search_text.value)!= -1)){
						const addRow = res_search.insertRow(); 			//위와 동일한 방식으로 결과 출력		
						var url = get_url(centers[i].center_nm);
						const cell_1 = addRow.insertCell(0);
						const cell_2 = addRow.insertCell(1);
						const cell_3 = addRow.insertCell(2);
						const cell_4 = addRow.insertCell(3);
						const cell_5 = addRow.insertCell(4);
						const cell_6 = addRow.insertCell(5);
										
						cell_1.innerHTML =  "<a href= '"+url+"' target='_blank'>"+centers[i].center_nm+"</a>";
						cell_2.innerHTML = "<div onclick='move_center("+i+")'>"+centers[i].program_nm+"</div>";
						cell_3.innerText = centers[i].program_detail;
						cell_4.innerText = centers[i].cost;
						cell_5.innerText = cal_rng(centers[i].lat, centers[i].lng, current_location.lat, current_location.lng)+"km";
						// [관심목록]
						//체크 -> 프로그램 번호로 정보 넘김
						if(likedlist[i]==1)	//이전 체크 기록 유지
						{cell_6.innerHTML = "<input type='checkbox' checked onclick='like_on_off("+i+")'>";}
						else
						{cell_6.innerHTML = "<input type='checkbox' onclick='like_on_off("+i+")'>";}
					}
				}
			}	
			// 검색 시에 사이드바 열기 
			if(search_text.value==""){
				icon.checked=true; //검색어 미입력 후 검색시 사이드바 안움직임
			}
			else{
				icon.checked = false;
			}
			search_bar_on_off(); 
		}
		
		// 사이드바의 내용을 일시적으로 숨기고 또는 나타나게 하는 함수
		function search_bar_on_off(){ //함수 : 
			if((document.getElementById("icon").checked==true)){
				document.getElementById("res_search").style.display = "none";
				document.getElementById("search_title").style.display = "none";
				document.getElementById("search_line").style.display="none"; /*아이콘 누르면 밑줄보기에함*/
			}
			else{
				document.getElementById("res_search").style.display = "";
				document.getElementById("search_title").style.display = "";
				document.getElementById("search_line").style.display="";
			}
		}
		search_bar_on_off(); //함수 항상 실행되게 함.

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 데이터 테이블 정렬(거리, 비용)
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		function sort_lst(num){	//num의 값은 3 또는 4 // 3: 비용 기준 정렬 4: 거리 기준 정렬 
			var res_search = document.getElementById("res_search");	// table DOM 객체 -> 검색 결과
			var rows // 행개수를 저장
			var switching =true;	// 반복문을 통해서 수행되는 정렬을 제어하는 변수 
			var i, x, y;			// 교환을 위한 변수
			var shouldSwitch;		// 교환을 제어하는 변수
			var switchcount = 0;	// 교환 일어난 횟수
			var dir = "asc";		// 정렬 기준, default는 오름차순

			while(switching){
				switching = false;	// 정렬이 완변하게 수행되면 반복 x 
				rows = res_search.getElementsByTagName("tr"); // 행의 수를 가져오기 위한 DOM 객체
				for(i=1; i<rows.length-1; i++){
					shouldSwitch = false;
					x = rows[i].getElementsByTagName("td")[num];
					y = rows[i+1].getElementsByTagName("td")[num];
					if(num==4){		// 거리 기준 정렬 
						if(dir=="asc"){
							if(parseInt(x.innerHTML) > parseInt(y.innerHTML)){
								shouldSwitch = true;
								break;
								}
							} 
						else if(dir=="desc"){
							if(parseInt(x.innerHTML) < parseInt(y.innerHTML)){
								shouldSwitch = true;
								break;
							}
						}
					}
					else{			// 비용 기준 정렬
						if(dir=="asc"){
							if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
								shouldSwitch = true;
								break;
								}
							} 
						else if(dir=="desc"){
							if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){
								shouldSwitch = true;
								break;
							}
						}
					}
				}
				if(shouldSwitch){	// 교환 제어 변수에 의해서 교환 수행
					rows[i].parentNode.insertBefore(rows[i+1], rows[i]);	// 실질적인 교환
					switching = true;										// 다음 교환 수행하도록 반복
					switchcount++;											// 교환 횟수 증가
				}else{
					if(switchcount == 0 && dir == "asc"){	// 오름차순 -> 내림차순 
						dir = "desc";
						switching =true;
					}
				}
			}
		}



//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// GET 방식으로 form의 input 데이터 전달 받기 ★★★★
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		var get_bool =0; // 데이터 받기 제어 변수, 0: 받을 데이터 x, 1: 받을 데이터 존재

		// url을 검사하여 전달 받은 form의 input 값들을 객체로 변환
		function get_query(){ 
			var url = document.location.href; 
			var qs = url.substring(url.indexOf('?') + 1).split('&'); 
			for(var i = 0, result = {}; i < qs.length; i++){ 
				qs[i] = qs[i].split('='); 
				result[qs[i][0]] = decodeURIComponent(qs[i][1]); 
			} 
			if(result.program_num >=0){	// form의 input 데이터가 존재하면 
				get_bool=1;				// 제어 변수를 1로 설정
			}
			return result; 				// 객체를 반환
		}
		var res = get_query(); // 전달 받은 값을 객체의 형태로 res 변수에 저장

		// url  검사 후 실행, get으로 받은 경우만 실행
		if(get_bool==1){
			document.getElementById("search_text").value = res.program_nm.replace(/\+/g,' ');
			// 데이터 파싱보다 늦을 수 있기에 1초 대기 후 함수 수행
			setTimeout(() => search(res.program_num),1000);	
			setTimeout(() => move_center(res.program_num), 1000);
		}
		
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 특정 복지관 으로 이동 ★★★★
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		// 복지관의 index가 인자로 전달 받으면 해당 복지관으로 지도 중심을 이동
		function move_center(num){
			if(get_bool==1){	// 프로그램 추천으로 오는 데이터는 정렬된 객체를 기준으로 넘어오기 때문에 sorted_lst로 위치 정보 전달
				var coords = new kakao.maps.LatLng(sorted_lst[num].lat, sorted_lst[num].lng);// 좌표 조정
			}
			else{				// 페이지 내부에서 사용되는 복지관 이동은 파싱된 데이터를 객체로 저장한 배열을 사용
				var coords = new kakao.maps.LatLng(centers[num].lat, centers[num].lng);	// 좌표 조정
			}
			map.setCenter(coords);	// 해당좌표로 이동
			map.setLevel(3);		// 시점 조정
		}
		
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 키보드 리스너 등록 -> esc 누를 시 검색 결과창 닫기
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		// esc키 검색창 닫기 구현
		(function(){
			document.addEventListener('keydown', function(e){
				const keyCode = e.keyCode;
				if(keyCode == 27){ 	
					document.getElementById("icon").checked=true;
					search_bar_on_off();
				} 
			})
		})();

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 지도 초기화 함수  -> 현재 위치, 지도 중심/시점, 검색창 
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		function map_clear(){
			var new_center = new kakao.maps.LatLng( 35.13438449851562, 129.1030912980164); // 부경대 좌표로 설정
			map.setCenter(new_center);	// 부경대로 이동
			map.setLevel(5);			// 시점 재설정
			if(curlocmarker_bool==1){	// 현재 위치가 생성되어져 있다면 -> 삭제
				curlocmarker.setMap(null);
				curlocmarker_bool =0;
			}
			// 검색 결과창이 열려 있으면 닫음
			document.getElementById("icon").checked=true;	
			search_bar_on_off();
		}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 무료 검색 필터  // 체크 옵션 4: 무료 강의 필터
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		// 무료 검색 필터 함수 
		function show_free(){
			var search_text = document.getElementById("search_text");	// 결과를 다시 출력하기 위하여 결과창과 검색창의 DOM 객체를 가져온다. 
			var res_search = document.getElementById("res_search");
			var icon = document.getElementById("icon");
			var temp = res_search.rows.length;
			for(var i = 0; i<temp-1; i++){								// 이전의 결과 삭제 
				const delRow = res_search.deleteRow(-1); 
			}
			if(document.getElementById("chk_free").checked==true){		// 무료강의 체크시 -> 무료 강의만 
				for (var i = 0; i < centers.length; i++) {			
					if((centers[i].program_nm.indexOf(search_text.value) != -1)||(centers[i].program_detail.indexOf(search_text.value)!= -1)){
						// 파싱한 데이터에서 무료 강의의 키워드는 다음 3가지 유형 : '-', "무료", ""
						if((centers[i].cost == "-")||(centers[i].cost == "0")||(centers[i].cost == "무료") ||(centers[i].cost == "")){
							// 무료 강의라면 기존 방식과 동일하게 결과 출력
							const addRow = res_search.insertRow(); 
							var url = get_url(centers[i].center_nm);
							const cell_1 = addRow.insertCell(0);
							const cell_2 = addRow.insertCell(1);
							const cell_3 = addRow.insertCell(2);
							const cell_4 = addRow.insertCell(3);
							const cell_5 = addRow.insertCell(4);
							const cell_6 = addRow.insertCell(5);
											
							cell_1.innerHTML = "<a href= '"+url+"' target='_blank'>"+centers[i].center_nm+"</a>";
							cell_2.innerHTML = "<div onclick='move_center("+i+")'>"+centers[i].program_nm+"</div>";
							cell_3.innerText = centers[i].program_detail;
							cell_4.innerText = centers[i].cost;
							cell_5.innerText = cal_rng(centers[i].lat, centers[i].lng, current_location.lat, current_location.lng)+"km";
							
							if(likedlist[i]==1)	
							{cell_6.innerHTML = "<input type='checkbox' checked onclick='like_on_off("+i+")'>";}
							else
							{cell_6.innerHTML = "<input type='checkbox' onclick='like_on_off("+i+")'>";}
						}
					}
				}
				// 결과창이 닫혀 있으면 연다. 
				if(search_text.value==""){icon.checked=true;}
				else{icon.checked = false;}
				search_bar_on_off();
			}
			// 무료강의 체크 해제 시 -> 해당 검색 키워드의 결과값 다시 원래대로 출력
			if(document.getElementById("chk_free").checked==false){search(-1);}
		}