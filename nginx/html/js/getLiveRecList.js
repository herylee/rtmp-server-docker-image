/**
 * Created by minyi on 2015/12/10.
 * 获取所有的直播列表和录像列表，无需登录
 */
var ServerUrl = "http://172.18.219.201/livestreaming/";

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//获取所有直播房间信息
$.ajax({
    type:'GET',
    url:ServerUrl+"live/rooms",
    success:function(responseData){
        if(responseData.code==200){
            var liveRoomsData = eval(responseData.data);
            for(var i=0; i<liveRoomsData.length; i++)
            {
                var liveRoomItem = liveRoomsData[i];
                var liveRoomLink = liveRoomItem.key;
                var liveRoomServelUrl = liveRoomItem.pushUrl;
                $("#livingList").append(
                    "<div class=\"col-lg-3 col-md-4 col-sm-4 col-xs-6 text-center\">" +
                    "<a href="+"./livedemo.html?key="+liveRoomLink+"&pushUrl="+liveRoomServelUrl+"  class=\"thumbnail icon\" style=\"position: relative\">" +
                    "<img src=\""+liveRoomItem.posterUrl+"\" alt=\"...\"style=\"height:175px\"/ onerror=\"this.src='./images/pic2.jpg'\">" +
                    "<div class=\"icon_play\"></div>" +
                    "<div class=\"caption\">" +
                    "<div class=\"btn-group\">" + liveRoomItem.roomName + "</div>" +
                    "<div class=\"row small padding-left-20 padding-right-20\">"+
                    "<span class=\"glyphicon glyphicon-user float-left color-GreenSea\"> " + liveRoomItem.nickName + "</span>"+
                    "<span class=\"glyphicon glyphicon-eye-open float-right color-nephritis\"> " + liveRoomItem.watchCount+"</span>"+
                    "</div>"+
                    "</div>" +
                    "</a>" +
                    "</div>");
            }

        }
    }
});


//获取所有录像信息
$.ajax({
    type:'GET',
    url:ServerUrl+"record/rooms",
    success:function(responseData){
        if(responseData.code==200){
            var recordRoomsData = eval(responseData.data);
            for(var i=0; i<recordRoomsData.length; i++)
            {
                var recordRoomsItem = recordRoomsData[i];
                var recordRoomLink = recordRoomsItem.key;
                var recordPlaylUrl = recordRoomsItem.playUrl;
                var recordRoomName = recordRoomsItem.roomName;
                var recordCreatTime = recordRoomsItem.createTime;

                 $("#recommedList").append(
                    "<div class=\"col-lg-3 col-md-4 col-sm-4 col-xs-6 text-center\">" +
                    "<a href="+"./recorddemo.html?key="+recordRoomLink+"&playUrl="+recordPlaylUrl+"  class=\"thumbnail icon\" style=\"position: relative\">" +
                    "<img src=\""+recordRoomsItem.posterUrl+"\" alt=\"...\"style=\"height:175px\"/  onerror=\"this.src='./images/pic2.jpg'\">" +
                    "<div class=\"icon_play\"></div>" +
                    "<div class=\"caption\">" +
                    "<div class=\"btn-group\">" + recordRoomName + "</div>" +
                    "<div class=\"row small padding-left-20 padding-right-20\">"+
                    "<span class=\"glyphicon glyphicon-time color-GreenSea float-left padding-bottom-15\"> " + recordCreatTime + "</span>"+
                    "<span class=\"glyphicon glyphicon-user float-left color-GreenSea\"> " + recordRoomsItem.nickName + "</span>"+
                    "<span class=\"glyphicon glyphicon-eye-open float-right color-nephritis\"> " + recordRoomsItem.watchCount+"</span>"+
                    "</div>"+
                    "</div>" +
                    "</a>" +
                    "</div>");
            }

        }
    }
});

