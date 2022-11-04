var center_lst = [];    // 파싱한 복지관 데이터를 객체로 저장하는 배열 
            const lst = document.getElementById("center_lst");  // 테이블의 dom 객체 

            // 복지관 데이터 파싱 
            var xhr = new XMLHttpRequest();
            var url = 'http://apis.data.go.kr/6260000/SocialWelfareCenterProgramService/getProgramInfo'; /*URL*/
            var queryParams = '?' + encodeURIComponent('serviceKey') + '='+data_key; /*Service Key*/
            queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10000'); /**/
            queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
            queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json'); /**/
            fetch(url+queryParams)
            .then(res => res.json())
            .then(resJson => {
                // 파싱한 데이터 중 item 항목만 가져온다. 
                var centers = resJson.getProgramInfo.body.items.item;
                // 반복문을 통해서 복지관 이름과 전화번호만 객체에 저장 
                for (var i = 0; i < centers.length; i++) {
                    var center ={
                        center_nm: centers[i]["center_nm"],
                        tel: centers[i]["tel"],
                    }
                    center_lst.push(center); //배열에 객체 저장 
                }
                // 정렬한 객체 배열을 저장할 변수 선언 후 복지관 이름순으로 정렬 
                let sorted_lst;
                sorted_lst = center_lst.sort(function(a,b){
                    let x = a.center_nm;    // 이름간의 비교 
                    let y = b.center_nm;
                    if(x<y){
                        return -1;
                    }
                    else{
                        return 0; 
                    }
                })
                
                // 정렬한 배열을 반복문을 통해서 복지관별 프로그램 수를 count하여 table에 추가 
                var count = 0;          // 등록된 복지관 수를 count하기 위한 변수
                var program_count = 1;  // 프로그램 수를 count하기 위한 변수
                for (var i=0; i<=sorted_lst.length-1; i++) {
                    if(i == sorted_lst.length-1){               // 마지막 배열의 원소의 경우 실행되는 구간-> 저장하고 반복문 탈출 
                        const addRow = lst.insertRow();         // 새로운 행을 생성

                        const cell_1 = addRow.insertCell(0);    // 새로운 행에 3개의 cell을 삽입 -> 3열 
                        const cell_2 = addRow.insertCell(1);
                        const cell_3 = addRow.insertCell(2);

                        //3가지 cell에 대하여 복지관 데이터 저장
                        cell_1.innerText = sorted_lst[i].center_nm; // 복지관 이름
                        cell_2.innerText = program_count;           // 운영 프로그램 수 
                        cell_3.innerText = sorted_lst[i].tel;       // 복지관 전화번호 
        
                        count++;                                    // 복지관 수 증가
                        break;
                    }
                    if(sorted_lst[i].center_nm == sorted_lst[i+1].center_nm){
                        program_count++;                        // 이 다음 배열의 원소와 이름이 동일한 경우 -> 프로그램의 수 증가
                    }
                    else{
                        const addRow = lst.insertRow();         // 위와 동일하게 수행 

                        const cell_1 = addRow.insertCell(0);
                        const cell_2 = addRow.insertCell(1);
                        const cell_3 = addRow.insertCell(2);

                        cell_1.innerText = sorted_lst[i].center_nm;
                        cell_2.innerText = program_count+" ";
                        cell_3.innerText = sorted_lst[i].tel;

                        program_count=1;                        // 프로그램 수 초기화 
                        count++;                                // 복지관 수 증가
                    }
                }
            // 등록된 복지관의 수 html 태그에 전달 
            var lst_title = document.getElementById("lst_title");
            lst_title.innerText = "등록된 복지관(" + count+")";
            })
            
            // 초기 탭 전환 효과 후 해당 태그를 지우기 위하여 함수 호출
            fade_reset();