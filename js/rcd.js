var center_lst = [];                                            // 복지관 프로그램 객체를 저장하는 배열 
            var data = [];                                                  // word cloud에 사용하기 위한 타겟 키워드를 저장하는 배열 
            var target_lst = [];                                            // target에 대한 정보를 저장하는 배열 
            var target_index_lst = [];                                      // target의 빈도수를 저장하는 배열 

            // 복지관 데이터 파싱...
            var xhr = new XMLHttpRequest();
            var url = 'http://apis.data.go.kr/6260000/SocialWelfareCenterProgramService/getProgramInfo'; /*URL*/
            var queryParams = '?' + encodeURIComponent('serviceKey') + '='+data_key; /*Service Key*/
            queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10000'); //  모든 프로그램의 데이터를 가져온다. 
            queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
            queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json'); // json 형태로 파싱한다. 
            fetch(url+queryParams)
            .then(res => res.json())
            .then(resJson => {
                var centers = resJson.getProgramInfo.body.items.item;  //json의 item 항목만 가져온다. 
                for (var i = 0; i < centers.length; i++) {  //json 형태롤 저장된 정보를 객체로 변환하여 배열에 저장한다. 
                    var center ={
                        addr_road: centers[i]["addr_road"],
                        center_nm: centers[i]["center_nm"],
                        cost: centers[i]["cost"],
                        data_day: centers[i]["data_day"],
                        finish_date: centers[i]["finish_date"],
                        gugun: centers[i]["gugun"],
                        lat: centers[i]["lat"],
                        lng: centers[i]["lng"],
                        program_detail: centers[i]["program_detail"],
                        program_nm: centers[i]["program_nm"],
                        start_date: centers[i]["start_date"],
                        target: centers[i]["target"],
                        tel: centers[i]["tel"],
                    }
                    center_lst.push(center);
                }
                // 반복문을 통해서 target에 대한 정보를 추출한다. 
                for(var i=0;i<center_lst.length;i++){
                        if(target_lst.indexOf(center_lst[i].target) == -1){
                            target_lst.push(center_lst[i].target);
                            target_index_lst.push(1);
                        }
                        else{
                            target_index_lst[target_lst.indexOf(center_lst[i].target)]++;
                        }
                }
                // 추출한 target의 정보를 기반으로 word cloud를 만든다. 
                anychart.onDocumentReady(function () { 
                    for(var i=0;i<target_lst.length;i++){
                        const rd = Math.floor(Math.random() * 3);
                        data.push({ 
                            "x": target_lst[i],             // 해당 target 키워드의 빈도수
                            "value": target_index_lst[i],   // 해당 target 키워드
                            category: "noun",               // 한글에 대한 글꼴은 지원하지 않아서 기본 글꼴이 적용
                        });       
                    }
                    // word cloud에 대한 설정 
                    var chart = anychart.tagCloud(data);    
                    var customColorScale = anychart.scales.linearColor();
                        customColorScale.colors(["#1A3D66", "#00ccff"]);
                    chart.colorScale(customColorScale);
                    chart.colorRange().enabled(true);
                    chart.colorRange().length("90%");
                    chart.angles([0]);                 
                    chart.mode("sprial");
                    chart.container("container"); 
                    chart.draw(); 
                    chart.listen("pointClick", function(e){ // 해당 target 클릭 시 table에 프로그램을 나타내는 함수 실행
                        serch_program(e.point.get("x"));    // target을 인자로 전달
                    });    
                });
            })
            
            //target을 인자로 전달받아서 해당 target을 상대로 운영하는 프로그램들을 table에 출력하는 함수
            function serch_program(target){
                var program_lst = document.getElementById("program_lst");   // table을 dom 객체로 
				var temp = program_lst.rows.length;
                for(var i = 0; i < temp; i++){                              // 이전의 내용이 존재하면 삭제
					const delRow = program_lst.deleteRow(-1); 
				}
                for(var i=0; i<center_lst.length;i++){                      // 2가지 열을 가진다. 복지관 이름, 프로그램 이름
                    if(center_lst[i].target == target){
                            const addRow = program_lst.insertRow();         // 열을 추가한다. 
                            const cell_1 = addRow.insertCell(0);
                            const cell_2 = addRow.insertCell(1);
                            
                            cell_1.innerText = center_lst[i].center_nm;     // 첫번째 열은 복지관 이름 
                            cell_2.innerHTML = "<div onclick='throw_program("+i+")'>"+center_lst[i].program_nm+"</div>"; // 두번째 열은 프로그램 이름 
                    }
                }
            }
            
            //8.7초후 chg_efct()함수가 수행되도록 하는 함수를 문서가 불러오면 실행되도록 하여
            //애니메이션이 정상적으로 수행되도록 한다. 
            fade_reset(); 

            //porgram_map으로 선택한 프로그램의 정보(index값)를 form을 통하여 get 형식으로 program_map으로 보낸다.
            function throw_program(program_num){
                var newForm = document.createElement('form'); // set attribute (form) 
                newForm.name = 'newForm'; 
                newForm.method = 'get';                       // get 방식 사용
                newForm.action = './program_map.html'; 
                newForm.target = '_blank';

                // 2가지 정보를 보낸다. 
                var input1 = document.createElement('input'); 
                input1.setAttribute("type", "hidden"); 
                input1.setAttribute("name", "program_nm");                        // 변수의 이름: program_nm
                input1.setAttribute("value", center_lst[program_num].program_nm); // 1) 프로그램 이름

                var input2 = document.createElement('input'); 
                input2.setAttribute("type", "hidden"); 
                input2.setAttribute("name", "program_num");                        // 변수의 이름: program_num
                input2.setAttribute("value", program_num);                         // 1) 프로그램 index 정보

                //form에 정보를 저장
                newForm.appendChild(input1);        
                newForm.appendChild(input2); 
                // body에 추가한다. 
                document.body.appendChild(newForm); 
                newForm.submit();       // 작성한 폼을 submit
            }