var url_lst = [
        {center_nm: "동구종합사회복지관", url: "https://forms.gle/YeB8yxLNRUYhsXqU7"},
        {center_nm: "용호종합사회복지관", url: "http://www.yongho.or.kr/support/list.php"},
        {center_nm: "만덕종합사회복지관", url: "https://www.mandeok07.org/%EC%98%81%EC%9C%A0%EC%95%84%EB%8C%80%EC%83%81"},
        {center_nm: "남산종합사회복지관", url: "http://www.welfarens.or.kr/ns_sub2menu5.html"},
        {center_nm: "덕천종합사회복지관", url: "http://www.duc1000.co.kr/page/bussiness/bussiness0204"},
        {center_nm: "부산진구종합사회복지관", url: "http://www.yjingu.or.kr/"},
        {center_nm: "백양종합사회복지관", url: "http://bychild.sc.or.kr/"},
        {center_nm: "남구종합사회복지관", url: "https://namguwelfare.modoo.at/?link=40kgha5x"},
        {center_nm: "감만종합사회복지관", url: "http://www.gamman.or.kr/05_Community/01_impartation.php"},
        {center_nm: "어린이재단종합사회복지관", url: "http://www.childfund-busan.or.kr/support/sub3.php"},
        {center_nm: "당감종합사회복지관", url: "http://www.danggam.or.kr/page.php?idx=0308"},
        {center_nm: "개금종합사회복지관", url: "http://good.bulgukto.or.kr/SW_bbs/gallery/list.php?zipEncode==KhBWbxqN9MCW91vt1drjrMCH9MyMetpSfMvWLME"},
        {center_nm: "동래종합사회복지관", url: "http://www.dncc.or.kr/"},
        {center_nm: "서구종합사회복지관", url: "http://www.pseogu.or.kr/"},
        {center_nm: "연제구 연산종합사회복지관", url: "https://yjys8638360.or.kr/sub3_1"},
        {center_nm: "서구장애인복지관", url: "http://www.seogurc.or.kr/bbs/board.php?bo_table=sub04_01"},
        {center_nm: "두송종합사회복지관", url: "http://www.dusong.or.kr/?fbclid=IwAR1sVPNfKJTy-gIYaeG9l22lNuGy3vBL_WxMvMvaC3kG6rZa6W7giuPBbHE"},
        {center_nm: "몰운대종합사회복지관", url: "http://molun.org/bbs/board.php?bo_table=board07"},
        {center_nm: "부산기독교종합사회복지관", url: "http://www.lovesw.or.kr/theme/basic1/index/business/business_01-1.php"},
        {center_nm: "연제구거제종합사회복지관", url: "http://www.bgjswc.or.kr/gnu/bbs/content.php?co_id=eduprogram_1"},
        {center_nm: "구평종합사회복지관", url: "http://www.gupyung.or.kr/aksa/?MM=02&SM=02#tab_menu3"},
        {center_nm: "사하구종합사회복지관", url: "http://www.sahabokji.or.kr/index.php"},
        {center_nm: "다대종합사회복지관", url: "http://www.dadaeswc.or.kr/sub03/sub01.asp"},
        {center_nm: "사상구종합사회복지관", url: "http://www.swc.or.kr/sub02/sub02_02.php"},
        {center_nm: "반석종합사회복지관", url: "http://www.banseok1995.or.kr/program/sub2.php"},
        {center_nm: "모라종합사회복지관", url: "http://www.moraswc.or.kr/business/sub1.php?zipEncode=30tB15KmLrxyJzIm90wDoftz0f2yMetpWLME"},
        {center_nm: "화정종합사회복지관", url: "http://hwajung.saem.or.kr/biz/pro_02.php"},
        {center_nm: "화명종합사회복지관", url: "http://www.hmswc2233.or.kr/program"},
        {center_nm: "장선종합사회복지관", url: "http://www.jsswc.or.kr/html/index.php?pageNum=003009000"},
        {center_nm: "운봉종합사회복지관", url: "http://www.woon-bong.or.kr/work/work_03_03.htm"},
        {center_nm: "금곡종합사회복지관", url: "http://geumgok.or.kr/02/04.php"},
        {center_nm: "남산정종합사회복지관", url: "http://www.nsjswc.co.kr/bbs/sub2_4"},
        {center_nm: "파랑새종합사회복지관", url: "http://www.sungsil.or.kr/pages/view/321"},
        {center_nm: "동원종합사회복지관", url: "http://www.ymcadw.org/02_work/work_06.asp"},
        {center_nm: "공창종합사회복지관", url: "http://www.gongchang.or.kr/business/sub1_3.php"},
        {center_nm: "부산사직종합사회복지관", url: "http://www.sjcwc.org/program/sub2.php"},
        {center_nm: "남광종합사회복지관", url: "http://www.nk.or.kr/business/business03_1.php"},
        {center_nm: "중구종합사회복지관", url: "http://www.jungbok.or.kr/business/sub3.php"},
        {center_nm: "금정구종합사회복지관", url: "http://fun.bmswc.or.kr/business/business03.php"},
        {center_nm: "강서구종합사회복지관", url: "http://www.gangseosw.or.kr/business/sub2_4.php"},
        {center_nm: "낙동종합사회복지관", url:"http://www.ndswc.or.kr/02/02.php" },
        {center_nm: "기장종합사회복지관", url:"http://www.gijangcmc.or.kr/welfare/03_program/01_program3.asp" },
        {center_nm: "전포종합사회복지관", url: "http://www.jpswc.or.kr/business/sub2_4.php"},
        {center_nm: "반여종합사회복지관", url: "http://www.ebanyeo.com/aksa/?MM=02&&SM=01"},
        {center_nm: "해운대종합사회복지관", url: "http://haeundae.saem.or.kr/biz/biz02_03.php"},
        {center_nm: "영진종합사회복지관", url: "http://yjswc.or.kr/"},
        {center_nm: "반송종합사회복지관", url: "https://bsymca.org/biz_02"},
        {center_nm: "학장종합사회복지관", url: "http://www.hakjang.or.kr/business/sub2_3.php"},
        {center_nm: "홀트수영종합사회복지관", url: "http://www.holtsy.or.kr/"}
]

function get_url(center_nm){
        for(var i=0; i< url_lst.length;i++){
                if(center_nm == "연제구거제종합사회복지관 부설"){
                        return "http://www.bgjswc.or.kr/gnu/bbs/content.php?co_id=eduprogram_1";
                }
                if(center_nm == url_lst[i].center_nm){
                        return url_lst[i].url;
                }
        }
};