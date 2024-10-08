import * as common from "./common.js"

$(document).ready(function () {
    $('#alarm_btn').click(function () {
        let param = $('#test_form').serializeArray();
        let alarmType = $('#alarmType').val();
        let projectSeq = $('#projectSeq').val();
        let taskSeq = $('#taskSeq').val();
        let companyCd = $('#companyCd').val();
        let replySeq = $('#replySeq').val();
        let userId = $('#userId').val();
        let createUserId = $('#createUserId').val();

        if (!createUserId) {
            common.msg_show("createUserId는 알람을 생성하는 유저 아이디임으로 필수 입력 값 입니다.", 38, "E");
            return;
        }

        if (alarmType === 'A' && !companyCd) {
            common.msg_show("알람타입 'A'는 회사 승인 요청 알람으로 회사 코드는 필수 입력 값 입니다.", 38, "E");
            return;
        }

        if (alarmType === 'B') {
            if (!userId) {
                common.msg_show("userId는 알람을 받는 유저 아이디임으로 필수 입력 값 입니다.", 40, "E");
                return;
            }

            if (!projectSeq) {
                common.msg_show("알람 타입 'B'는 프로젝트 초대 알람으로 프로젝트 시퀀스는 필수 입력 값 입니다.", 36, "E");
                return;
            }
        }

        if (alarmType === 'C') {
            if (!userId) {
                common.msg_show("userId는 알람을 받는 유저 아이디임으로 필수 입력 값 입니다.", 40, "E");
                return;
            }

            if (!projectSeq) {
                common.msg_show("알람 타입 'C'는 업무 할당 알람으로 프로젝트 시퀀스는 필수 입력 값 입니다.", 37, "E");
                return;
            }

            if (!taskSeq) {
                common.msg_show("알람 타입 'C'는 업무 할당 알람으로 업무 시퀀스는 필수 입력 값 입니다.", 38, "E");
                return;
            }
        }

        if (alarmType === 'D') {
            if (!projectSeq) {
                common.msg_show("알람 타입 'D'는 댓글 알람으로 프로젝트 시퀀스는 필수 입력 값 입니다.", 38, "E");
                return;
            }

            if (!taskSeq) {
                common.msg_show("알람 타입 'D'는 댓글 알람으로 업무 시퀀스는 필수 입력 값 입니다.", 39, "E");
                return;
            }
        }

        if (alarmType === 'E') {
            if (!projectSeq) {
                common.msg_show("알람 타입 'E'는 대댓글 알람으로 프로젝트 시퀀스는 필수 입력 값 입니다.", 38, "E");
                return;
            }

            if (!taskSeq) {
                common.msg_show("알람 타입 'E'는 대댓글 알람으로 업무 시퀀스는 필수 입력 값 입니다.", 39, "E");
                return;
            }

            if (!replySeq) {
                common.msg_show("알람 타입 'E'는 대댓글 알람으로 댓글 시퀀스는 필수 입력 값 입니다.", 39, "E");
                return;
            }
        }

        $.ajax({
            url: "/alarm_test",
            data: param,
            type: 'post',
            dataType: "text",
            success: function (result) {
                alert(result);
            },
            error: function (request, status, error) {
                console.log(error);
            }
        })

    })

    $('#getAlarm_btn').click(function () {
        let userId = $('#userId').val();
        
        if (!userId) {
            common.msg_show("userId는 알람 조회시 필수 입력 값 입니다.", 43, "E");
            return;
        }

        $.ajax({
            url: "/getAlarm_test",
            data: {
                    "userId" : userId
                },
            type: 'post',
            dataType: "json",
            success: function (result) {
                let output = "";
                for(let i in result){
                    output += `
                                <div class="alarm_div">
                                    <div>알람 시퀀스 : ${result[i].alarmSeq}</div>
                                    <div>알람 내용 : ${result[i].alarmContents}</div>
                                    <div>알람 타입 : ${result[i].alarmType}</div>  
                                    <div>생성일 : ${result[i].regDate}</div>  
                                    <div>프로젝트 시퀀스 : ${result[i].projectSeq}</div>  
                                    <div>업무 시퀀스 : ${result[i].taskSeq}</div>
                                </div>  
                            `;
                }
                $('#alarm_container').html(output);
            },
            error: function (request, status, error) {
                console.log(error);
            }
        })
    })


    $('#msg_E_btn').click(function () {
        common.msg_show("오류 메시지 공통 기능입니다.<br>12345", 43, "E");
    })

    $('#msg_W_btn').click(function () {
        common.msg_show("경고 메시지 공통 기능입니다. 12345", 43, "W");
    })

    $('#msg_btn').click(function () {
        common.msg_show("일반 메시지 공통 기능입니다. 12345", 43);
    })
})