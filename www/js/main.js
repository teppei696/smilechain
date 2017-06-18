// This is a JavaScript file
    var media = null;
    var timer = null;
    var sakuraIoTimer = null;
    var flg = true;
    var userid = "3";
    var getId = "";
    function onLoad() {
        console.log("===== onLoad start =====");
        document.addEventListener("deviceready", initialize, false);
        var select = localStorage.getItem('select');
        if (select) {
            $("#face").attr('src', "img/album_0" + select + ".png");
            var src = 'media/' + select + '.wav';
            media = new Media (getPath() + src , onSuccess, onError);
            media.play();
        } 
    }
    function initialize() {
        if (timer == null) {
            timer = setInterval(function() {
                if (flg) {
                    setImg();
                }
            }, 1000);
        }
    }
    function playAudio(id) {
        var src = 'media/' + id + '.wav';
        media = new Media (getPath() + src , onSuccess, onError);
        media.play();
        flg = false;
    }
    function pauseAudio() {
        if (media) {
            media.pause();
        }
    }
    function stopAudio() {
        if (media) {
            media.stop();
        }
    }
    function onSuccess() {
        finish();
        flg = true;
    }
    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
    function setAudioPosition(position) {}
    function getPath() {
        var str = location.pathname;
        var i = str.lastIndexOf('/');
        return str.substring(0,i+1);
    }
    function getData() {
        var str = "";
        if (userid == "2") {
            // laught_flg = 1 and id != 2 and flg2 = 0
            str = 'https://oas7b.cybozu.com/k/v1/records.json?app=12&query=laught_flg%20%3D%201%20and%20id%20%21%3D%20' + userid + '%20and%20flg' + userid + '%20%3D%200';
        } else if (userid == "3") {
            // laught_flg = 1 and id != 3 and flg3 = 0 and flg2 = 1';
            str = 'https://oas7b.cybozu.com/k/v1/records.json?app=12&query=laught_flg%20%3D%201%20and%20id%20%21%3D%20' + userid + '%20and%20flg' + userid + '%20%3D%200%20and%20flg2%20%3D%201';
        } else if (userid == "4") {
            // laught_flg = 1 and id != 4 and flg4 = 0 and flg3 = 1';
            str = 'https://oas7b.cybozu.com/k/v1/records.json?app=12&query=laught_flg%20%3D%201%20and%20id%20%21%3D%20' + userid + '%20and%20flg' + userid + '%20%3D%200%20and%20flg3%20%3D%201';
        } else if (userid == "5") {
            // laught_flg = 1 and id != 5 and flg5 = 0 and flg4 = 1';
            str = 'https://oas7b.cybozu.com/k/v1/records.json?app=12&query=laught_flg%20%3D%201%20and%20id%20%21%3D%20' + userid + '%20and%20flg' + userid + '%20%3D%200%20and%20flg4%20%3D%201';
        }
        //console.log(str);
        $.ajax({
            type: 'GET',
            url: str,
            headers: {
                'X-Cybozu-API-Token': 'dedSSDSju1xGDWxczZACZHQ4AbmjlrKLMFfWEeYz'
            },
            dataType: 'json',
            success: function(json) {
                setUserData(json);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("===== ajax失敗 get =====");
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus : " + textStatus);
                console.log("errorThrown : " + errorThrown.message);
            }
        });
    }
    function setUserData(json) {
        var len = json.records.length;
        for(var i=0; i < len; i++){
            getId = json.records[i].id.value;
            updateData(json.records[i].id.value, json.records[i].name.value);
        }
    }
    function updateData(id, name) {
        $.ajax({
            type: 'PUT',
            url: 'https://oas7b.cybozu.com/k/v1/record.json?app=12',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Cybozu-API-Token': 'dedSSDSju1xGDWxczZACZHQ4AbmjlrKLMFfWEeYz',
                'Content-Type': 'application/json'
            },
            data:
                '{"app": "12","id": "' + id + '","record": {"laught_flg": {"value": "1"}}}',
            dataType: 'json',
            success: function(json) {
                $("#face").attr('src', "img/" + id + ".jpg");
                $("#name").text(name);
                $("#logo").attr('src', "");
                playAudio(id);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("===== ajax失敗 put =====");
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus : " + textStatus);
                console.log("errorThrown : " + errorThrown);
            }
        });
    };
    function finish() {
        $.ajax({
            type: 'PUT',
            url: 'https://oas7b.cybozu.com/k/v1/record.json?app=12',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Cybozu-API-Token': 'dedSSDSju1xGDWxczZACZHQ4AbmjlrKLMFfWEeYz',
                'Content-Type': 'application/json'
            },
            data:
                '{"app": "12","id": "' + getId + '","record": {"flg' + userid + '": {"value": "1"}}}',
            dataType: 'json',
            success: function(json) {
                $("#face").attr('src', "img/anime.gif");
                $("#name").text("");
                $("#logo").attr('src', "img/logo.png");
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("===== ajax失敗 put =====");
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus : " + textStatus);
                console.log("errorThrown : " + errorThrown);
            }
        });
        getId = "";
    };
    function selfLaught(){
        var str = "";
        if (userid == "2") {
            str = '{"app": "12","id": "' + userid + '","record": {"laught_flg": {"value": "1"}, "flg1": {"value": "0"}, "flg2": {"value": "1"}, "flg3": {"value": "0"}, "flg4": {"value": "0"}, "flg5": {"value": "0"}}}';
        } else if (userid == "3") {
            str = '{"app": "12","id": "' + userid + '","record": {"laught_flg": {"value": "1"}, "flg1": {"value": "0"}, "flg2": {"value": "0"}, "flg3": {"value": "1"}, "flg4": {"value": "0"}, "flg5": {"value": "0"}}}';
        } else if (userid == "4") {
            str = '{"app": "12","id": "' + userid + '","record": {"laught_flg": {"value": "1"}, "flg1": {"value": "0"}, "flg2": {"value": "0"}, "flg3": {"value": "0"}, "flg4": {"value": "1"}, "flg5": {"value": "0"}}}';
        } else if (userid == "5") {
            str = '{"app": "12","id": "' + userid + '","record": {"laught_flg": {"value": "1"}, "flg1": {"value": "0"}, "flg2": {"value": "0"}, "flg3": {"value": "0"}, "flg4": {"value": "0"}, "flg5": {"value": "1"}}}';
        }
        $.ajax({
            type: 'PUT',
            url: 'https://oas7b.cybozu.com/k/v1/record.json?app=12',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Cybozu-API-Token': 'dedSSDSju1xGDWxczZACZHQ4AbmjlrKLMFfWEeYz',
                'Content-Type': 'application/json'
            },
            data:
                str,
            dataType: 'json',
            success: function(json) {
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("===== ajax失敗 put =====");
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus : " + textStatus);
                console.log("errorThrown : " + errorThrown);
            }
        });
        sakuraIoOn();
    };
    function sakuraIoOn(){
        console.log("===sakura.io on===");
        $.ajax({
            type: 'POST',
            url: 'https://api.sakura.io/incoming/v1/e3f3b6c1-3048-470c-91f6-ccc340d8bb5f',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data:
                '{"type":"channels","module":"usSUWRVQSITt","payload":{"channels":[{"channel":0,"type":"i","value":1}]}}',
            dataType: 'json',
            success: function(json) {
                console.log("===sakura.io on success===");
                timer = setTimeout(function() {
                    sakuraIoOff();
                }, 1000);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("===== ajax失敗 put =====");
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus : " + textStatus);
                console.log("errorThrown : " + errorThrown);
            }
        });
    };
    function sakuraIoOff(){
        console.log("===sakura.io off===");
        $.ajax({
            type: 'POST',
            url: 'https://api.sakura.io/incoming/v1/e3f3b6c1-3048-470c-91f6-ccc340d8bb5f',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data:
                '{"type":"channels","module":"usSUWRVQSITt","payload":{"channels":[{"channel":0,"type":"i","value":0}]}}',
            dataType: 'json',
            success: function(json) {
                console.log("===sakura.io off success===");
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("===== ajax失敗 put =====");
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus : " + textStatus);
                console.log("errorThrown : " + errorThrown);
            }
        });
    };
    function setImg() {
        getData();
    }
    function settingDialog() {
        userid = window.prompt("input user id", userid);
    }
