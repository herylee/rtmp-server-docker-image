/**
 * Created by minyi on 2015/12/10.
 */

$(document).ready(function () {

    var ServerUrl = "http://172.18.219.201/livestreaming/";
    var userName = "";
    var gameTypeList = new Array();
    //获取用户信息，前提已登录
    $.ajax({
        type: 'POST',
        url: ServerUrl + 'user/me',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (responseData) {
            //alert(responseData.code);
            if (responseData.code == 200) {
                userName = $.parseJSON(responseData.data).nickName;
                $("#LoginReg").addClass("hidden");
                $("#hasLog").removeClass("hidden");
                $("#userName").html(userName + "<b class=\"caret\"></b>");
                $("#inputNickname").val(userName);
                $("a[name='logOutBtn']").click(function(){
                    $.ajax({
                        type: 'GET',
                        url: ServerUrl + "user/logout",
                        crossDomain: true,
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (responseData) {
                            if (responseData.code == 200) {
                                alert("登出成功");
                                location.reload();
                                }
                            }
                    });
                });
            }
        }
    });
    //获取直播游戏类型，前提已登录
    $.ajax({
        type: 'POST',
        url: ServerUrl + "gameType",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (responseData) {
            if (responseData.code == 200) {
                var gameTypeData = eval(responseData.data);
                var gameTypeSelect = document.getElementById("gameType");

                for (var i = 0; i < gameTypeData.length; i++) {
                    gameTypeSelect.options.add(new Option(gameTypeData[i].name, gameTypeData[i].id));
                }
            }
        }
    });


    //获取当前登录用户的直播房间
    $.ajax({
        type: 'POST',
        url: ServerUrl + "live/me",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (responseData) {
            if (responseData.code == 200) {
                if(responseData.data=="null"){
                    $("#myLiveRoom").attr('href', './haveNoLiveRoom.html');
                }
                else{
                    var liveRoomData = $.parseJSON(responseData.data);
                    var roomName = liveRoomData.roomName;
                    var gameTypeData = liveRoomData.gameType;
                    var roomKey = liveRoomData.key;
                    var roomDescription = liveRoomData.roomDescription;
                    var rtmpUrl = liveRoomData.pushUrl;
                    $("#inputRoomName").val(roomName);
                    $("#inputRoomDescription").val(roomDescription);
                    $("#rtmpUrl").val(rtmpUrl);
                    $("#liveKey").val(roomKey);
                    //for (var i = 0; i < gameTypeData.length; i++)
                    //    gameTypeSelect.options.add(new Option(gameTypeData[i].name, gameTypeData[i].id));
                    $("#myLiveRoom").attr('href', './myLive.html?key=' + roomKey);
                    $("#roomDescription").html(roomDescription);
                }
            }
        }
    });

    //获取当前登录用户的录像信息
    $.ajax({
        type: 'POST',
        url: ServerUrl + "record/me",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (responseData) {
            if (responseData.code == 200) {
                if(responseData.data=="null"){
                    $("#myRecordRoom").attr('href', './haveNoRecordRoom.html');
                }
                else{
                    myRecordRoomsData = eval(responseData.data);
                    for(var i=0; i<myRecordRoomsData.length; i++)
                    {
                        var recordRoomsItem = myRecordRoomsData[i];
                        var recordRoomLink = recordRoomsItem.key;
                        var recordPlaylUrl = recordRoomsItem.playUrl;
                        var recordRoomName = recordRoomsItem.roomName;
                        var recordCreatTime = recordRoomsItem.createTime;

                        $("#myRecordList").append(
                            "<div class=\"col-lg-3 col-md-4 col-sm-4 col-xs-6 text-center\">" +
                            "<a href="+"./recorddemo.html?key="+recordRoomLink+"&playUrl="+recordPlaylUrl+"  class=\"thumbnail icon\" style=\"position: relative\">" +
                            "<img src=\""+recordRoomsItem.posterUrl+"\" alt=\"...\"style=\"height:175px\"/  onerror=\"this.src='./images/pic2.jpg'\">" +
                            "<div class=\"icon_play\"></div>" +
                            "<div class=\"caption\">" +
                            "<div class=\"btn-group\">" + recordRoomName + "</div>" +
                            "<div class=\"row small padding-left-20 padding-right-20\">"+
                            "<span class=\"glyphicon glyphicon-time color-GreenSea float-left\"> " + recordCreatTime + "</span>"+
                            "<span class=\"glyphicon glyphicon-eye-open color-nephritis float-left\"> " + recordRoomsItem.watchCount+"</span>"+
                            "</div>"+
                            "</div>" +
                            "</a>" +
                            "</div>");
                    }
                    $("#myRecordRoom").attr('href', './myRecord.html');
                }
            }
        }
    });

    //绑定保存录像按钮点击事件
    $("#saveLive").click(function(){
        $.ajax({
            type: 'GET',
            url: ServerUrl + "live/save",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (responseData) {
                if (responseData.code == 200) {
                    alert("保存录像成功");
                    window.location.assign("./haveNoLiveRoom.html");
                    //location.reload();
                }
            }
        });
    });

    //点击按钮实现复制文本
    $("#copyRtmp").click(function(){
            if(window.clipboardData && window.clipboardData.setData){
                window.clipboardData.setData('text', $("#rtmpUrl").val);

            }else{
                alert("您的浏览器不支持此复制功能，请使用Ctrl+C或鼠标右键。");
                $("#rtmpUrl").select();
            }
    });

    $("#copyKey").click(function(){
        if(window.clipboardData && window.clipboardData.setData){
            window.clipboardData.setData('text', $("#liveKey").val);

        }else{
            alert("您的浏览器不支持此复制功能，请使用Ctrl+C或鼠标右键。");
            $("#liveKey").select();
        }
    });

});

