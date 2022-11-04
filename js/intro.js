// 복지관 api를 사용하기 위한 키
const data_key = 'K4Y6eL6gMHYqwyYllrDHSR8Vp8d0I0fLQw1Bq%2BOVauuqFaSLiKVPo4yBKMlrlAQnTkiSyj6xT4rl%2BO4BG0e0wg%3D%3D';
// 소개와 사용법은 페이지 전환이 아닌 태그의 구성만 바꿔서 페이지가 전환된 것 처럼 동작한다.
// 따라서 선택된 탭외의 다른 탭의 요소들은 숨긴다. 
// 각 탭의 요소를 div내에 넣어서 id를 지정하고 이를 통해서 block / none 처리를 수행한다. 

// 메인 화면외의 모든 탭을 숨기는 함수
function hide(){
    document.body.style.backgroundImage = "url('img/back1.png')";
                    
    var p = document.getElementById("fade_block");
    p.style.display = "block";
    fade_reset();

    var m = document.getElementById("main");    
    m.style.display = 'block';

    var i = document.getElementById("introduce");
    i.style.display = "none"

    var h = document.getElementById("manual");
    h.style.display = "none";
    
    var i_i = document.getElementById("menu_item_fix"); //선택된 탭을 알려주는 태그도 숨김 처리 
    i_i.style.display = "none";

}
// 소개 탭외의 모든 탭을 숨기는 함수 
function pagechange1(){
    var p = document.getElementById("fade_block");
    p.style.display = "block";
    fade_reset();

    document.body.style.backgroundImage = "url('img/back2.png')";
    var m = document.getElementById("main");
    m.style.display = 'none';

    var i = document.getElementById("introduce");
    i.style.display = "block"

    var h = document.getElementById("manual");
    h.style.display = "none"

    var i_i = document.getElementById("menu_item_fix");
    i_i.style.display = "block";
    i_i.style.left = "410px";

}
// 상용법 탭외의 모든 탭을 숨기는 함수 
function pagechange2(){
    document.body.style.backgroundImage = "url('img/back3.png')";

    var p = document.getElementById("fade_block");
    p.style.display = "block";
    fade_reset();

    var m = document.getElementById("main");
    m.style.display = 'none';

    var i = document.getElementById("introduce");
    i.style.display = "none"

    var h = document.getElementById("manual");
    h.style.display = "block"
    
    var i_i = document.getElementById("menu_item_fix");
    i_i.style.display = "block";
    i_i.style.left = "610px";
}

// 화면이 전환되는 애니메이션에 사용되는 태그를 none 처리하여 사라지게 하는 함수 
function chg_efct(){
    var p = document.getElementById("fade_block");
    p.style.display = "none";
}
// 탭 전환 애니메이션의 효과가 끝나서 모든 화면을 가리기 전에 해당 태그를 사라지도록 하는 함수
function fade_reset(){
    setTimeout(() => chg_efct(), 990);  //1초동안 애니메이션이 수행되므로 0.99초에 태그를 사라지게 한다. 
}


