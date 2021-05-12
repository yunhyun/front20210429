function idCheck(){
    var exp = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,10}$/;
    var id = document.getElementById('id');
    var idResult = document.getElementById('id-check-result');
    if(id.value.length==0){
        idResult.style.color = 'red';
        idResult.innerHTML = '아이디는 필수 입니다.';
    } else if(!id.value.match(exp)){
        idResult.style.color = 'red';
        idResult.innerHTML = '유효하지 않은 형식입니다.';
    } else {
        idResult.style.color = 'green';
        idResult.innerHTML = '좋아요 Good';
    }  
}
function pwCheck(){
    var exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,16}$/;
    var pw = document.getElementById('pw').value;
    var pwCheck = document.getElementById('pw-check-result');
    if(pw.length==0) {
        pwCheck.style.color= 'red';
        pwCheck.innerHTML = '비밀번호는 필수입니다.';
    } else if(pw.match(exp)){
        pwCheck.style.color= 'green';
        pwCheck.innerHTML = '유효한 비밀번호형식';
    } else{
        pwCheck.style.color= 'red';
        pwCheck.innerHTML = '유효한 비밀번호형식이 아닙니다.';
    }
}

function pwConfirm(){
    var pw = document.getElementById('pw').value;
    var pwConfirm = document.getElementById('pw-confirm').value;
    var confirmResult = document.getElementById('pw-confirm-result');
    if(pw == pwConfirm){
        confirmResult.style.color = 'green';
        confirmResult.innerHTML = '비밀번호 일치';
    } else {
        confirmResult.style.color = 'red';
        confirmResult.innerHTML = '비밀번호 불일치';
    }
}

function nameCheck() {
    var name = document.getElementById('name').value;
    var nameResult = document.getElementById('name-check-result');
    if(name.length==0){
        nameResult.style.color = 'red';
        nameResult.innerHTML = '이름은 필수입니다.';
    } 
}

function phoneCheck(){
    var exp = /^\d{3}-\d{4}-\d{4}$/;
    var phone = document.getElementById('phone').value;
    var result = document.getElementById('phone-check-result');
    if(phone.match(exp)){
        result.style.color = 'green';
        result.innerHTML = '유효한형식';
    } else {
        result.style.color = 'red';
        result.innerHTML = '유효하지 않은 전화번호 형식';
    }
}
function emailSelect(value){
    document.getElementById('domain').value = value;
}

   //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
   function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById("sample4_roadAddress").value = roadAddr;
            document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
            
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("sample4_extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("sample4_extraAddress").value = '';
            }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else if(data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}