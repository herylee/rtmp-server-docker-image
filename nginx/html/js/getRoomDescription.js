/**
 * Created by minyi on 2015/12/11.
 */
//通过key获取对应的直播房间信息
var ServerUrl = "http://172.18.219.201/livestreaming/";
var liveRoomKey;
var recordRoomKey;
$.ajax({
    type:'GET',
    url:ServerUrl+"live/room?key="+liveRoomKey,
    success:function(responseData){
        if(responseData.code==200){
            var liveRoomsData = $.parseJSON(responseData.data);
            var liveRoomName = liveRoomsData.roomName;
            var liveRoomDescription = liveRoomsData.roomDescription;
            var liveRoomWatchCount = liveRoomsData.watchCount;
            var liveRoomUserNickName = liveRoomsData.nickName;
            var liveRoomGameTypeName = liveRoomsData.gameTypeName;
            $("#liveRoomName").html(liveRoomName);
            $("#liveRoomGameTypeName").html(liveRoomGameTypeName);
            $("#liveRoomDescription").html(liveRoomDescription);
            $("#liveRoomWatchCount").html(liveRoomWatchCount);
            $("#liveRoomUserNickName").html(liveRoomUserNickName);
        }
    }
});

//通过key获取对应的录像房间信息
$.ajax({
    type:'GET',
    url:ServerUrl+"record/room?key="+recordRoomKey,
    success:function(responseData){
        if(responseData.code==200){
            var recordRoomsData = $.parseJSON(responseData.data);
            var recordRoomName = recordRoomsData.roomName;
            var recordRoomDescription = recordRoomsData.roomDescription;
            var recordRoomWatchCount = recordRoomsData.watchCount;
            var recordRoomUserNickName = recordRoomsData.nickName;
            var recordRoomGameTypeName = recordRoomsData.gameTypeName;
            $("#recordRoomName").html(recordRoomName);
            $("#recordRoomGameTypeName").html(recordRoomGameTypeName);
            $("#recordRoomDescription").html(recordRoomDescription);
            $("#recordRoomWatchCount").html(recordRoomWatchCount);
            $("#recordRoomUserNickName").html(recordRoomUserNickName);
        }
    }
});
