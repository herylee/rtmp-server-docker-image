/**
 * Created by minyi on 2015/12/11.
 * 检验所提交的表单：登录、注册、修改用户信息、修改房间信息
 */

var ServerUrl = "http://172.18.219.201/livestreaming/";
var hasLiveRoom = true;
var myLiveBtn = 'live/update';
$(document).ready(function () {
    //判断是否已经有直播间
    $.ajax({
        type: 'POST',
        url: ServerUrl + "live/me",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (responseData) {
            if (responseData.code == 200) {
                if (responseData.data == "null") {
                    hasLiveRoom = false;
                    myLiveBtn = 'live/register';
                    $("#myLiveRoomBtn").val("创建直播房间");
                }

            }
        }
    });
});


//登录表单检验
$("#formLogin").validate({
    rules: {
        email: {
            required: true,
            email: true
        },

        password: {
            required: true
        }
    },
    messages: {
        email: {
            required: "Please provide a email",
            email: "Please enter a valid email address"
        },
        password: {
            required: "Please provide a password"
        }
    },
    submitHandler: function () {
        ajaxSubmitLoginForm();
    }
});

//登录表单提交
var logForm = $("#formLogin");
function ajaxSubmitLoginForm() {
    $.ajax({
        type: 'POST',
        data: logForm.serialize(),
        url: ServerUrl + 'user/login',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.code == 200) {
                alert("登陆成功");
                location.reload();
            }
            else {
                alert(data.message + "登录失败");
            }
        },
        error: function (xhr) {
            alert("error");
        }
    });
    return false;
};

//注册表单检验
$("#formRegister").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        nickName: {
            required: true,
            minlength: 5
        },

        password: {
            required: true,
            minlength: 3
        },

        confirm_password: {
            required: true,
            minlength: 3,
            equalTo: "#registerPassword"
        }
    },
    messages: {
        email: {
            required: "Please provide a email",
            email: "Please enter a valid email address"
        },
        nickName: {
            required: "Please provide a nickName",
            minlength: "Your nickName must consist of at least 5 characters"
        },
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 3 characters long"
        },
        confirm_password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 3 characters long",
            equalTo: "Please enter the same password as above"
        }
    },
    submitHandler: function () {

        ajaxSubmitRegisterForm();
    }
});


//注册表单提交
var regForm = $("#formRegister");

function ajaxSubmitRegisterForm() {
    $.ajax({
        type: 'POST',
        data: regForm.serialize(),
        url: ServerUrl + 'user/register',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.code == 200) {
                alert("注册成功,请登录");
                $('#registerModal').modal('hide');
            }
            else {
                alert(data.message + "注册失败");
                //$('#registerModal').modal('hide');
            }
        },
        error: function (xhr) {
            alert("error");
        }
    });
    return false;
};

//修改用户信息表单检验
$("#userModify").validate({
    rules: {
        nickName: {
            required: true,
            minlength: 5
        },

        password: {
            required: true,
            minlength: 3
        },

        confirm_password: {
            required: true,
            minlength: 3,
            equalTo: "#modifyPassword"
        }
    },
    messages: {
        nickName: {
            required: "Please provide a nickName",
            minlength: "Your nickName must consist of at least 5 characters"
        },
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 3 characters long"
        },
        confirm_password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 3 characters long",
            equalTo: "Please enter the same password as above"
        }
    },
    submitHandler: function () {

        ajaxSubmitModifyForm();
    }
});

//修改用户信息表单提交
var modifyForm = $("#userModify");

function ajaxSubmitModifyForm() {
    $.ajax({
        type: 'POST',
        data: modifyForm.serialize(),
        url: ServerUrl + 'user/update',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.code == 200) {
                alert("个人信息修改成功");
                location.reload();
            }
            else {
                alert(data.message + "个人信息修改失败");
                //$('#registerModal').modal('hide');
            }
        },
        error: function (xhr) {
            alert("error");
        }
    });
    return false;
};


//直播房间信息表单检验
$("#liveRoomModify").validate({
    rules: {
        roomName: {
            required: true
        },
        gameTypeSelect: {
            min: 1
        },
        roomDescription: {
            required: true
        }

    },
    messages: {
        roomName: {
            required: "Please provide a roomName"
        },
        gameTypeSelect: {
            min: "Please select a gameType "
        },
        roomDescription: {
            required: "Please provide a roomDescription"
        }
    },
    submitHandler: function () {
        ajaxSubmitRoomForm();
    }
});

//创建直播房间
var roomForm = $("#liveRoomModify");
function ajaxSubmitRoomForm() {
    //alert("submmit");
    $.ajax({
        type: 'POST',
        data: roomForm.serialize(),
        url: ServerUrl + myLiveBtn,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (responseData) {
            if (responseData.code == 200) {
                if(hasLiveRoom){
                    alert("直播房间信息更新成功");
                    location.reload();
                }
                else{
                    alert("直播房间创建成功");
                    var myliveRoomData = $.parseJSON(responseData.data);
                    var rtmpUrl = myliveRoomData.pushUrl;
                    var liveKey = myliveRoomData.key;
                    $("#rtmpUrl").val(rtmpUrl);
                    $("#liveKey").val(liveKey);
                    $("#myLiveRoomBtn").val("更新房间信息");
                    $("#myLiveRoom").attr('href', './myLive.html?key=' + liveKey);
                }
            }
            else {
                if(hasLiveRoom){
                    alert(responseData.message + "直播房间信息更新失败");
                }
                else {
                    alert(responseData.message + "创建直播房间失败");
                }
            }
        },
        error: function (xhr) {
            alert("error");
        }
    });
    return false;
};

